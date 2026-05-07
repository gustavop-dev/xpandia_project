import random
from datetime import timedelta

from django.core.management.base import BaseCommand
from django.utils import timezone
from faker import Faker

from blog.models import BlogPost


CATEGORIES = ['ai-quality', 'localization', 'case-study', 'industry', 'operations']

EN_HEADINGS = [
    'Why this matters', 'How we measure quality', 'A short example',
    'Common pitfalls', 'What to do next', 'Field notes',
]
ES_HEADINGS = [
    'Por qué importa', 'Cómo medimos calidad', 'Un ejemplo corto',
    'Errores frecuentes', 'Qué hacer a continuación', 'Notas de campo',
]


def _build_sections(fake: Faker, lang: str) -> list[dict]:
    headings = EN_HEADINGS if lang == 'en' else ES_HEADINGS
    sections: list[dict] = [
        {'type': 'heading', 'level': 2, 'text': random.choice(headings)},
        {'type': 'paragraph', 'text': fake.paragraph(nb_sentences=4)},
        {'type': 'list', 'items': [fake.sentence(nb_words=6) for _ in range(3)]},
        {'type': 'paragraph', 'text': fake.paragraph(nb_sentences=3)},
        {
            'type': 'callout',
            'variant': random.choice(['tip', 'info', 'note']),
            'title': 'Key takeaway' if lang == 'en' else 'Idea clave',
            'text': fake.sentence(nb_words=14),
        },
    ]
    return sections


class Command(BaseCommand):
    help = 'Create realistic fake BlogPost records (idempotent: skips existing slugs).'

    def add_arguments(self, parser):
        parser.add_argument('number_of_posts', type=int, nargs='?', default=8)
        parser.add_argument(
            '--draft-ratio', type=float, default=0.2,
            help='Fraction of posts left as drafts (default: 0.2).',
        )

    def handle(self, *args, **options):
        count = options['number_of_posts']
        draft_ratio = max(0.0, min(1.0, options['draft_ratio']))
        fake_en = Faker('en_US')
        fake_es = Faker('es_ES')

        created = 0
        skipped = 0
        now = timezone.now()

        for i in range(count):
            title_en = fake_en.unique.sentence(nb_words=6).rstrip('.')
            title_es = fake_es.unique.sentence(nb_words=6).rstrip('.')
            slug_seed = title_en.lower().replace(' ', '-')[:60]

            if BlogPost.objects.filter(slug=slug_seed).exists():
                skipped += 1
                continue

            is_draft = random.random() < draft_ratio
            published_at = None if is_draft else now - timedelta(days=random.randint(0, 60))

            post = BlogPost.objects.create(
                title_en=title_en,
                title_es=title_es,
                excerpt_en=fake_en.sentence(nb_words=18),
                excerpt_es=fake_es.sentence(nb_words=18),
                content_json_en={
                    'intro': fake_en.paragraph(nb_sentences=2),
                    'sections': _build_sections(fake_en, 'en'),
                    'conclusion': fake_en.paragraph(nb_sentences=2),
                },
                content_json_es={
                    'intro': fake_es.paragraph(nb_sentences=2),
                    'sections': _build_sections(fake_es, 'es'),
                    'conclusion': fake_es.paragraph(nb_sentences=2),
                },
                category=CATEGORIES[i % len(CATEGORIES)],
                author='xpandia-team',
                is_published=not is_draft,
                published_at=published_at,
            )
            created += 1
            status = 'draft' if is_draft else 'published'
            self.stdout.write(self.style.SUCCESS(f'  · {post.slug} ({status})'))

        self.stdout.write(self.style.SUCCESS(
            f'{created} BlogPost record(s) created, {skipped} skipped (slug already existed).'
        ))
