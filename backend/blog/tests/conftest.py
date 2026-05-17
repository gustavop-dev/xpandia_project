import pytest
from django.core.files.uploadedfile import SimpleUploadedFile

from blog.models import BlogPost


_MIN_PNG = (
    b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01'
    b'\x08\x06\x00\x00\x00\x1f\x15\xc4\x89\x00\x00\x00\rIDATx\x9cc\xf8\xff'
    b'\xff?\x00\x05\xfe\x02\xfe\xa3z\xa6\xb5\x00\x00\x00\x00IEND\xaeB`\x82'
)


@pytest.fixture
def blog_post(db):
    return BlogPost.objects.create(
        title_en='First Post',
        title_es='Primer Post',
        excerpt_en='An English excerpt.',
        excerpt_es='Un resumen en español.',
        content_json_en={'sections': [{'type': 'paragraph', 'text': 'Hello.'}]},
        content_json_es={'sections': [{'type': 'paragraph', 'text': 'Hola.'}]},
        category='ai-quality',
        author='xpandia-team',
        is_published=True,
    )


@pytest.fixture
def blog_draft(db):
    return BlogPost.objects.create(
        title_en='Draft Post',
        title_es='Post Borrador',
        excerpt_en='Draft excerpt.',
        excerpt_es='Resumen borrador.',
        is_published=False,
    )


@pytest.fixture
def blog_post_with_cover(db):
    cover = SimpleUploadedFile('cover.png', _MIN_PNG, content_type='image/png')
    return BlogPost.objects.create(
        title_en='Post With Cover',
        title_es='Post Con Portada',
        excerpt_en='With cover.',
        excerpt_es='Con portada.',
        cover_image=cover,
        is_published=True,
    )
