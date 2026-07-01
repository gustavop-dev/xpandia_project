import json

import pytest
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import RequestFactory
from django.urls import reverse

from base_feature_app.admin import admin_site
from blog.admin import BlogPostAdmin, BlogPostAdminForm
from blog.models import BlogPost


def _full_post_json(**overrides):
    data = {
        'category': 'localization',
        'author': 'xpandia-team',
        'cover_image_url': 'https://cdn.example.com/cover.jpg',
        'en': {
            'title': 'Hello World',
            'excerpt': 'An English excerpt.',
            'content': {'intro': 'EN intro', 'sections': [], 'conclusion': 'EN end'},
        },
        'es': {
            'title': 'Hola Mundo',
            'excerpt': 'Un resumen en español.',
            'content': {'intro': 'ES intro', 'sections': [], 'conclusion': 'ES fin'},
        },
    }
    data.update(overrides)
    return data


@pytest.mark.django_db
def test_blog_post_appears_under_content_section_in_admin_site(admin_user):
    request = RequestFactory().get('/admin/')
    request.user = admin_user
    app_list = admin_site.get_app_list(request)
    content_section = next((s for s in app_list if s['app_label'] == 'content'), None)
    assert content_section is not None
    object_names = {m['object_name'] for m in content_section['models']}
    assert 'BlogPost' in object_names


def test_admin_exposes_json_fields_and_publish_checkbox():
    admin = BlogPostAdmin(BlogPost, admin_site)
    fieldsets = admin.get_fieldsets(RequestFactory().get('/admin/'))
    assert [name for name, _ in fieldsets] == ['Post JSON', 'Publishing']
    assert fieldsets[0][1]['fields'] == ('post_json', 'post_json_file')
    assert fieldsets[1][1]['fields'] == ('is_published',)


def test_admin_guide_includes_ai_prompt_with_unsplash_and_youtube():
    admin = BlogPostAdmin(BlogPost, admin_site)
    fieldsets = admin.get_fieldsets(RequestFactory().get('/admin/'))
    guide = str(fieldsets[0][1]['description'])
    assert 'Prompt para la IA' in guide
    assert 'Unsplash' in guide
    assert 'YouTube' in guide
    assert 'Descargar plantilla JSON' in guide


@pytest.mark.django_db
def test_form_creates_post_from_full_json():
    form = BlogPostAdminForm(data={'post_json': json.dumps(_full_post_json())})
    assert form.is_valid(), form.errors
    post = form.save()
    assert post.title_en == 'Hello World'
    assert post.title_es == 'Hola Mundo'
    assert post.excerpt_es == 'Un resumen en español.'
    assert post.content_json_en['intro'] == 'EN intro'
    assert post.category == 'localization'


@pytest.mark.django_db
def test_form_autogenerates_slug_from_english_title_when_absent():
    form = BlogPostAdminForm(data={'post_json': json.dumps(_full_post_json())})
    assert form.is_valid(), form.errors
    post = form.save()
    assert post.slug == 'hello-world'


@pytest.mark.django_db
def test_form_publishes_when_checkbox_checked():
    form = BlogPostAdminForm(data={'post_json': json.dumps(_full_post_json()), 'is_published': True})
    assert form.is_valid(), form.errors
    post = form.save()
    assert post.is_published is True
    assert post.published_at is not None


@pytest.mark.django_db
def test_form_keeps_draft_when_checkbox_unchecked():
    form = BlogPostAdminForm(data={'post_json': json.dumps(_full_post_json())})
    assert form.is_valid(), form.errors
    post = form.save()
    assert post.is_published is False
    assert post.published_at is None


@pytest.mark.django_db
def test_form_stores_cover_image_url_from_json():
    form = BlogPostAdminForm(data={'post_json': json.dumps(_full_post_json())})
    assert form.is_valid(), form.errors
    post = form.save()
    assert post.cover_image_url == 'https://cdn.example.com/cover.jpg'


@pytest.mark.django_db
def test_form_reads_json_from_uploaded_file():
    upload = SimpleUploadedFile(
        'post.json', json.dumps(_full_post_json()).encode('utf-8'), content_type='application/json',
    )
    form = BlogPostAdminForm(data={'post_json': ''}, files={'post_json_file': upload})
    assert form.is_valid(), form.errors
    post = form.save()
    assert post.title_en == 'Hello World'


def test_form_rejects_malformed_json():
    form = BlogPostAdminForm(data={'post_json': '{ not valid'})
    assert not form.is_valid()
    assert any('Invalid JSON' in msg for msg in form.errors['__all__'])


def test_form_rejects_empty_input():
    form = BlogPostAdminForm(data={'post_json': ''})
    assert not form.is_valid()
    assert any('Provide the post JSON' in msg for msg in form.errors['__all__'])


def test_form_requires_spanish_title():
    payload = _full_post_json()
    payload['es']['title'] = ''
    form = BlogPostAdminForm(data={'post_json': json.dumps(payload)})
    assert not form.is_valid()
    assert '"es.title" is required.' in form.errors['__all__']


def test_form_rejects_unknown_category():
    form = BlogPostAdminForm(data={'post_json': json.dumps(_full_post_json(category='nope'))})
    assert not form.is_valid()
    assert any('"category" must be one of' in msg for msg in form.errors['__all__'])


@pytest.mark.django_db
def test_form_prefills_json_when_editing_existing_post(blog_post):
    form = BlogPostAdminForm(instance=blog_post)
    prefilled = json.loads(form.fields['post_json'].initial)
    assert prefilled['en']['title'] == 'First Post'
    assert prefilled['es']['title'] == 'Primer Post'


@pytest.mark.django_db
def test_form_prefills_publish_checkbox_from_existing_post(blog_post):
    form = BlogPostAdminForm(instance=blog_post)
    assert form.fields['is_published'].initial is True


def test_download_template_registers_a_named_admin_url():
    assert reverse(f'{admin_site.name}:blog_blogpost_download_template') == (
        '/admin/blog/blogpost/download-template/'
    )


def test_download_template_returns_json_attachment(admin_user):
    admin = BlogPostAdmin(BlogPost, admin_site)
    request = RequestFactory().get('/admin/blog/blogpost/download-template/')
    request.user = admin_user
    response = admin.download_template(request)
    assert response.status_code == 200
    assert 'attachment' in response['Content-Disposition']


def test_download_template_payload_has_both_languages(admin_user):
    admin = BlogPostAdmin(BlogPost, admin_site)
    request = RequestFactory().get('/admin/blog/blogpost/download-template/')
    request.user = admin_user
    body = json.loads(admin.download_template(request).content)
    assert 'en' in body
    assert 'es' in body
