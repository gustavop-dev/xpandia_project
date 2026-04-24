import importlib

import pytest


@pytest.mark.django_db
def test_url_modules_import_and_have_patterns():
    """Verifies each URL sub-module imports successfully and registers the expected named patterns."""
    package_urls = importlib.import_module('base_feature_app.urls')
    assert hasattr(package_urls, 'urlpatterns')

    auth_urls = importlib.import_module('base_feature_app.urls.auth')
    user_urls = importlib.import_module('base_feature_app.urls.user')

    assert any(pattern.name == 'sign_up' for pattern in auth_urls.urlpatterns)
    assert any(pattern.name == 'user-list' for pattern in user_urls.urlpatterns)
