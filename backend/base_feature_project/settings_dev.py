"""
Development settings for base_feature_project.

Usage: DJANGO_SETTINGS_MODULE=base_feature_project.settings_dev

Note: The default DJANGO_SETTINGS_MODULE in manage.py points to
base_feature_project.settings (base). Use this file explicitly
when you want development-specific overrides (DEBUG=True, console email).
"""

from decouple import config

from .settings import *  # noqa: F401,F403

DEBUG = True

ALLOWED_HOSTS = ['localhost', '127.0.0.1', '*']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Use real SMTP when credentials are configured (e.g. to verify the contact
# form locally); otherwise fall back to the console backend so a dev without
# email credentials still works and never sends real mail by accident.
# An explicit DJANGO_EMAIL_BACKEND always wins, which is how the E2E suite
# opts out of real delivery on a machine that does have credentials — see
# the webServer env in frontend/playwright.config.ts.
EMAIL_BACKEND = config('DJANGO_EMAIL_BACKEND', default='') or (
    'django.core.mail.backends.smtp.EmailBackend'
    if EMAIL_HOST_USER and EMAIL_HOST_PASSWORD
    else 'django.core.mail.backends.console.EmailBackend'
)
