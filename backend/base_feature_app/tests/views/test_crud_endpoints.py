import pytest
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status


@pytest.fixture
def staff_user(db):
    User = get_user_model()
    user = User.objects.create_user(email='staff@example.com', password='pass1234')
    user.is_staff = True
    user.save(update_fields=['is_staff'])
    return user


@pytest.mark.django_db
def test_users_list_requires_staff(api_client):
    url = reverse('user-list')
    response = api_client.get(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN


@pytest.mark.django_db
def test_users_list_success_for_staff(api_client, staff_user):
    api_client.force_authenticate(user=staff_user)
    url = reverse('user-list')
    response = api_client.get(url)
    assert response.status_code == status.HTTP_200_OK


@pytest.mark.django_db
def test_users_create_authenticated_non_staff_returns_403(api_client, existing_user):
    api_client.force_authenticate(user=existing_user)

    response = api_client.post(
        reverse('user-list'),
        {'email': 'new@example.com', 'password': 'pass1234', 'role': 'customer'},
        format='json',
    )

    assert response.status_code == status.HTTP_403_FORBIDDEN
