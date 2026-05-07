import pytest
from django.urls import reverse
from rest_framework import status


def _url(slug):
    return reverse('blog-detail', kwargs={'slug': slug})


@pytest.mark.django_db
def test_detail_returns_published_post(api_client, blog_post):
    response = api_client.get(_url(blog_post.slug))
    assert response.status_code == status.HTTP_200_OK
    assert response.data['slug'] == blog_post.slug
    assert response.data['title'] == 'First Post'
    assert 'content_json' in response.data


@pytest.mark.django_db
def test_detail_returns_404_for_unpublished_post(api_client, blog_draft):
    response = api_client.get(_url(blog_draft.slug))
    assert response.status_code == status.HTTP_404_NOT_FOUND


@pytest.mark.django_db
def test_detail_returns_404_for_unknown_slug(api_client):
    response = api_client.get(_url('does-not-exist'))
    assert response.status_code == status.HTTP_404_NOT_FOUND


@pytest.mark.django_db
def test_detail_returns_spanish_content_when_lang_es(api_client, blog_post):
    response = api_client.get(f'{_url(blog_post.slug)}?lang=es')
    assert response.data['title'] == 'Primer Post'
    assert response.data['content_json']['sections'][0]['text'] == 'Hola.'
