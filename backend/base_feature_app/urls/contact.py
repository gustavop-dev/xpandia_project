from django.urls import path
from base_feature_app.views import contact

urlpatterns = [
    path('contact/', contact.contact_form, name='contact-form'),
]
