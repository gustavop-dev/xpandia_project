from django.core.management.base import BaseCommand
from django.utils import timezone

from blog.models import BlogPost


CATEGORIES = ['ai-quality', 'localization', 'case-study', 'industry', 'operations']

PUBLISHED_COUNT = 12
DRAFT_SLUG = 'e2e-draft-1'


def _content(text: str) -> dict:
    return {'sections': [{'type': 'paragraph', 'text': text}]}


class Command(BaseCommand):
    help = 'Seeds 12 published BlogPost rows + 1 draft for Playwright E2E tests. Idempotent.'

    def add_arguments(self, parser):
        parser.add_argument(
            '--reset',
            action='store_true',
            default=True,
            help='Delete existing e2e-* posts before seeding (default: True).',
        )

    def handle(self, *args, **options):
        if options['reset']:
            deleted, _ = BlogPost.objects.filter(slug__startswith='e2e-').delete()
            self.stdout.write(f'Deleted {deleted} existing e2e-* post(s).')

        now = timezone.now()
        for i in range(1, PUBLISHED_COUNT + 1):
            slug = f'e2e-post-{i:02d}'
            BlogPost.objects.create(
                slug=slug,
                title_en=f'E2E Post {i:02d}',
                title_es=f'Post E2E {i:02d}',
                excerpt_en=f'English excerpt for post {i:02d}.',
                excerpt_es=f'Resumen en español del post {i:02d}.',
                content_json_en=_content(f'English body for post {i:02d}.'),
                content_json_es=_content(f'Cuerpo en español del post {i:02d}.'),
                category=CATEGORIES[(i - 1) % len(CATEGORIES)],
                author='xpandia-team',
                is_published=True,
                published_at=now,
            )

        BlogPost.objects.create(
            slug=DRAFT_SLUG,
            title_en='E2E Draft',
            title_es='Borrador E2E',
            excerpt_en='Draft body.',
            excerpt_es='Borrador.',
            is_published=False,
        )

        self.stdout.write(self.style.SUCCESS(
            f'Seeded {PUBLISHED_COUNT} published + 1 draft.'
        ))
