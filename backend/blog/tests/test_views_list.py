import pytest
from django.urls import reverse
from rest_framework import status

from blog.models import BlogPost


URL = reverse('blog-list')


@pytest.mark.django_db
def test_list_returns_only_published_posts(api_client, blog_post, blog_draft):
    response = api_client.get(URL)
    assert response.status_code == status.HTTP_200_OK
    slugs = {item['slug'] for item in response.data['results']}
    assert blog_post.slug in slugs
    assert blog_draft.slug not in slugs


@pytest.mark.django_db
def test_list_default_page_size_is_9(api_client):
    for i in range(12):
        BlogPost.objects.create(
            title_en=f'Post {i:02d}', title_es=f'Post {i:02d}',
            excerpt_en='', excerpt_es='', is_published=True,
        )
    response = api_client.get(URL)
    assert response.data['page_size'] == 9
    assert len(response.data['results']) == 9
    assert response.data['count'] == 12
    assert response.data['total_pages'] == 2


@pytest.mark.django_db
def test_list_respects_page_query_param(api_client):
    for i in range(12):
        BlogPost.objects.create(
            title_en=f'Post {i:02d}', title_es=f'Post {i:02d}',
            excerpt_en='', excerpt_es='', is_published=True,
        )
    response = api_client.get(f'{URL}?page=2')
    assert response.data['page'] == 2
    assert len(response.data['results']) == 3


@pytest.mark.django_db
def test_list_clamps_page_size_max_50(api_client):
    response = api_client.get(f'{URL}?page_size=999')
    assert response.data['page_size'] == 50


@pytest.mark.django_db
def test_list_handles_invalid_page_param_gracefully(api_client, blog_post):
    response = api_client.get(f'{URL}?page=abc&page_size=xyz')
    assert response.status_code == status.HTTP_200_OK
    assert response.data['page'] == 1
    assert response.data['page_size'] == 9


@pytest.mark.django_db
def test_list_returns_spanish_fields_when_lang_es(api_client, blog_post):
    response = api_client.get(f'{URL}?lang=es')
    assert response.data['results'][0]['title'] == 'Primer Post'


@pytest.mark.django_db
def test_list_pagination_metadata_shape(api_client, blog_post):
    response = api_client.get(URL)
    assert set(response.data.keys()) == {'results', 'count', 'page', 'page_size', 'total_pages'}
