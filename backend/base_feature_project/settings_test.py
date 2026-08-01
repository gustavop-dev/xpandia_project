"""
Test settings for base_feature_project.

Usage: DJANGO_SETTINGS_MODULE=base_feature_project.settings_test (set in pytest.ini)

The base settings read the database from the ambient .env, so on any machine
that has a deployed .env — every VPS clone — pytest would point at the project's
MySQL database and try to CREATE a test_* database the app user has no
privileges for. Tests must not depend on where they run, so pin them to an
in-memory SQLite database here.
"""

from .settings import *  # noqa: F401,F403

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': ':memory:',
    }
}

# Never reach a real SMTP server from a test run.
EMAIL_BACKEND = 'django.core.mail.backends.locmem.EmailBackend'
