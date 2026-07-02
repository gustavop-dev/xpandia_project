from unittest.mock import patch

import pytest
from django.urls import reverse
from rest_framework import status

VALID_PAYLOAD = {
    'name': 'Ana García',
    'email': 'ana@example.com',
    'role': 'Product Manager',
    'company': 'Acme Corp',
    'website': 'https://acme.com',
    'message': 'We need Spanish QA for our product.',
    'service': 'language-assurance',
    'size': 'latam',
    'variant': 'urgent',
    'urgency': 'product-review',
}

URL = 'contact-form'


@pytest.mark.django_db
@patch('base_feature_app.views.contact.EmailService.send_contact_confirmation', return_value=True)
@patch('base_feature_app.views.contact.EmailService.send_contact_notification', return_value=True)
def test_contact_form_returns_201_on_valid_payload(mock_notify, mock_confirm, api_client):
    response = api_client.post(reverse(URL), VALID_PAYLOAD, format='json')

    assert response.status_code == status.HTTP_201_CREATED
    assert response.json()['detail'] == 'Request received.'


@pytest.mark.django_db
@patch('base_feature_app.views.contact.EmailService.send_contact_confirmation', return_value=True)
@patch('base_feature_app.views.contact.EmailService.send_contact_notification', return_value=True)
def test_contact_form_accepts_phone_and_language(mock_notify, mock_confirm, api_client):
    payload = {**VALID_PAYLOAD, 'phone': '+57 300 123 4567', 'language': 'es'}
    response = api_client.post(reverse(URL), payload, format='json')

    assert response.status_code == status.HTTP_201_CREATED


@pytest.mark.django_db
def test_contact_form_returns_400_when_required_fields_missing(api_client):
    response = api_client.post(reverse(URL), {}, format='json')

    assert response.status_code == status.HTTP_400_BAD_REQUEST


@pytest.mark.django_db
def test_contact_form_returns_400_for_invalid_email(api_client):
    payload = {**VALID_PAYLOAD, 'email': 'not-an-email'}
    response = api_client.post(reverse(URL), payload, format='json')

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert 'email' in response.json()


@pytest.mark.django_db
@patch('base_feature_app.views.contact.EmailService.send_contact_notification', return_value=False)
def test_contact_form_returns_503_when_notification_fails(mock_notify, api_client):
    response = api_client.post(reverse(URL), VALID_PAYLOAD, format='json')

    assert response.status_code == status.HTTP_503_SERVICE_UNAVAILABLE


@pytest.mark.django_db
@patch('base_feature_app.views.contact.EmailService.send_contact_confirmation', return_value=False)
@patch('base_feature_app.views.contact.EmailService.send_contact_notification', return_value=True)
def test_contact_form_returns_201_even_when_confirmation_fails(mock_notify, mock_confirm, api_client):
    response = api_client.post(reverse(URL), VALID_PAYLOAD, format='json')

    assert response.status_code == status.HTTP_201_CREATED


@pytest.mark.django_db
@patch('base_feature_app.views.contact.EmailService.send_contact_confirmation', return_value=True)
@patch('base_feature_app.views.contact.EmailService.send_contact_notification', return_value=True)
def test_contact_form_calls_both_email_services(mock_notify, mock_confirm, api_client):
    response = api_client.post(reverse(URL), VALID_PAYLOAD, format='json')

    assert response.status_code == status.HTTP_201_CREATED
    mock_notify.assert_called_once()
    mock_confirm.assert_called_once()
