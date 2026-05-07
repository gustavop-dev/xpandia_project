import pytest
from rest_framework.request import Request
from rest_framework.test import APIRequestFactory

from blog.serializers import BlogPostDetailSerializer, BlogPostListSerializer


def _ctx(lang=None):
    rf = APIRequestFactory()
    url = '/api/blog/' if lang is None else f'/api/blog/?lang={lang}'
    return {'request': Request(rf.get(url))}


@pytest.mark.django_db
def test_list_serializer_returns_english_when_lang_en(blog_post):
    data = BlogPostListSerializer(blog_post, context=_ctx('en')).data
    assert data['title'] == 'First Post'
    assert data['excerpt'] == 'An English excerpt.'


@pytest.mark.django_db
def test_list_serializer_returns_spanish_when_lang_es(blog_post):
    data = BlogPostListSerializer(blog_post, context=_ctx('es')).data
    assert data['title'] == 'Primer Post'
    assert data['excerpt'] == 'Un resumen en español.'


@pytest.mark.django_db
def test_list_serializer_falls_back_to_english_for_unknown_lang(blog_post):
    data = BlogPostListSerializer(blog_post, context=_ctx('fr')).data
    assert data['title'] == 'First Post'


@pytest.mark.django_db
def test_cover_image_url_empty_string_when_no_image(blog_post):
    data = BlogPostListSerializer(blog_post, context=_ctx('en')).data
    assert data['cover_image_url'] == ''


@pytest.mark.django_db
def test_detail_serializer_includes_content_json_for_requested_lang(blog_post):
    data = BlogPostDetailSerializer(blog_post, context=_ctx('es')).data
    assert data['content_json'] == {'sections': [{'type': 'paragraph', 'text': 'Hola.'}]}
