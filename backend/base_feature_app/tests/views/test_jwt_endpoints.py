import pytest
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status


@pytest.mark.django_db
def test_token_obtain_pair_with_email_success(api_client):
    User = get_user_model()
    User.objects.create_user(email='token@example.com', password='pass1234')

    url = reverse('token_obtain_pair')
    response = api_client.post(url, {'email': 'token@example.com', 'password': 'pass1234'}, format='json')
    assert response.status_code == status.HTTP_200_OK
    assert 'access' in response.json()
    assert 'refresh' in response.json()


@pytest.mark.django_db
def test_token_obtain_pair_invalid_credentials_returns_401(api_client):
    User = get_user_model()
    User.objects.create_user(email='token2@example.com', password='pass1234')

    url = reverse('token_obtain_pair')
    response = api_client.post(url, {'email': 'token2@example.com', 'password': 'wrongpassword'}, format='json')

    assert response.status_code == status.HTTP_401_UNAUTHORIZED


@pytest.mark.django_db
def test_token_obtain_pair_missing_email_returns_400(api_client):
    url = reverse('token_obtain_pair')
    response = api_client.post(url, {'password': 'pass1234'}, format='json')

    assert response.status_code == status.HTTP_400_BAD_REQUEST


@pytest.mark.django_db
def test_token_obtain_pair_missing_password_returns_400(api_client):
    url = reverse('token_obtain_pair')
    response = api_client.post(url, {'email': 'token3@example.com'}, format='json')

    assert response.status_code == status.HTTP_400_BAD_REQUEST
