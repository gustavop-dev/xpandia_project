import pytest
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status


@pytest.fixture
def target_user(db):
    User = get_user_model()
    return User.objects.create_user(email='target@example.com', password='pass1234')


@pytest.mark.django_db
def test_user_detail_unauthenticated_returns_403(api_client, target_user):
    response = api_client.get(reverse('user-detail', kwargs={'user_id': target_user.id}))

    assert response.status_code == status.HTTP_403_FORBIDDEN


@pytest.mark.django_db
def test_user_detail_authenticated_non_staff_get_returns_200(api_client, existing_user, target_user):
    api_client.force_authenticate(user=existing_user)

    response = api_client.get(reverse('user-detail', kwargs={'user_id': target_user.id}))

    assert response.status_code == status.HTTP_200_OK


@pytest.mark.django_db
def test_user_detail_authenticated_non_staff_put_returns_403(api_client, existing_user, target_user):
    api_client.force_authenticate(user=existing_user)

    response = api_client.put(
        reverse('user-detail', kwargs={'user_id': target_user.id}),
        {'email': 'new@example.com', 'password': 'pass1234'},
        format='json',
    )

    assert response.status_code == status.HTTP_403_FORBIDDEN


@pytest.mark.django_db
def test_user_detail_authenticated_non_staff_patch_returns_403(api_client, existing_user, target_user):
    api_client.force_authenticate(user=existing_user)

    response = api_client.patch(
        reverse('user-detail', kwargs={'user_id': target_user.id}),
        {'first_name': 'Updated'},
        format='json',
    )

    assert response.status_code == status.HTTP_403_FORBIDDEN


@pytest.mark.django_db
def test_user_detail_authenticated_non_staff_delete_returns_403(api_client, existing_user, target_user):
    api_client.force_authenticate(user=existing_user)

    response = api_client.delete(reverse('user-detail', kwargs={'user_id': target_user.id}))

    assert response.status_code == status.HTTP_403_FORBIDDEN
