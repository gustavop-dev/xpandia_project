import pytest
from django.test import RequestFactory

from base_feature_app.admin import admin_site
from blog.admin import BlogPostAdmin
from blog.models import BlogPost


@pytest.mark.django_db
def test_blog_post_appears_under_content_section_in_admin_site(admin_user):
    request = RequestFactory().get('/admin/')
    request.user = admin_user
    app_list = admin_site.get_app_list(request)
    content_section = next((s for s in app_list if s['app_label'] == 'content'), None)
    assert content_section is not None
    object_names = {m['object_name'] for m in content_section['models']}
    assert 'BlogPost' in object_names


def test_blog_post_admin_has_expected_fieldsets():
    admin = BlogPostAdmin(BlogPost, admin_site)
    fieldset_names = {name for name, _ in admin.fieldsets}
    assert {'English', 'Español', 'Metadata', 'Publishing', 'Timestamps'} <= fieldset_names


def test_blog_post_admin_prepopulated_fields_includes_slug():
    admin = BlogPostAdmin(BlogPost, admin_site)
    assert admin.prepopulated_fields == {'slug': ('title_en',)}
