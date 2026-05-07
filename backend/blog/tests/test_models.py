from datetime import timedelta

import pytest
from django.utils import timezone

from blog.models import BlogPost


@pytest.mark.django_db
def test_slug_auto_generated_from_title_en_when_blank():
    post = BlogPost.objects.create(
        title_en='Hello World',
        title_es='Hola Mundo',
        excerpt_en='', excerpt_es='',
    )
    assert post.slug == 'hello-world'


@pytest.mark.django_db
def test_slug_collision_appends_counter():
    BlogPost.objects.create(title_en='Same Title', title_es='Mismo', excerpt_en='', excerpt_es='')
    second = BlogPost.objects.create(title_en='Same Title', title_es='Mismo', excerpt_en='', excerpt_es='')
    assert second.slug == 'same-title-1'


@pytest.mark.django_db
def test_published_at_auto_set_when_first_published():
    post = BlogPost.objects.create(
        title_en='P', title_es='P', excerpt_en='', excerpt_es='', is_published=False,
    )
    assert post.published_at is None
    post.is_published = True
    post.save()
    assert post.published_at is not None


@pytest.mark.django_db
def test_published_at_not_overwritten_on_resave():
    fixed = timezone.now() - timedelta(days=10)
    post = BlogPost.objects.create(
        title_en='P', title_es='P', excerpt_en='', excerpt_es='',
        is_published=True, published_at=fixed,
    )
    post.title_en = 'Updated'
    post.save()
    post.refresh_from_db()
    assert post.published_at == fixed


@pytest.mark.django_db
def test_ordering_published_desc_then_created_desc():
    now = timezone.now()
    older = BlogPost.objects.create(
        title_en='Older', title_es='Old', excerpt_en='', excerpt_es='',
        is_published=True, published_at=now - timedelta(days=2),
    )
    newer = BlogPost.objects.create(
        title_en='Newer', title_es='New', excerpt_en='', excerpt_es='',
        is_published=True, published_at=now - timedelta(days=1),
    )
    posts = list(BlogPost.objects.all())
    assert posts[0] == newer
    assert posts[1] == older


@pytest.mark.django_db
def test_str_returns_title_en_or_falls_back_to_title_es():
    with_en = BlogPost(title_en='English', title_es='Spanish', excerpt_en='', excerpt_es='')
    assert str(with_en) == 'English'
    only_es = BlogPost(title_en='', title_es='Solo ES', excerpt_en='', excerpt_es='')
    assert str(only_es) == 'Solo ES'
