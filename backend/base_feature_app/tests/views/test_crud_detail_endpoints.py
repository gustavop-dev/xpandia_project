import pytest
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status


@pytest.fixture
def staff_user(db):
    User = get_user_model()
    user = User.objects.create_user(email='staff2@example.com', password='pass1234')
    user.is_staff = True
    user.save(update_fields=['is_staff'])
    return user


@pytest.mark.django_db
def test_user_crud_list_and_create(api_client, staff_user):
    """Verifies staff users can list existing users and create a new user via the user-list endpoint."""
    api_client.force_authenticate(user=staff_user)

    response = api_client.get(reverse('user-list'))
    assert response.status_code == status.HTTP_200_OK

    response = api_client.post(
        reverse('user-list'),
        {'email': 'newuser@example.com', 'password': 'pass1234', 'role': 'customer'},
        format='json',
    )

    assert response.status_code == status.HTTP_201_CREATED


@pytest.mark.django_db
def test_user_crud_create_invalid(api_client, staff_user):
    api_client.force_authenticate(user=staff_user)

    response = api_client.post(reverse('user-list'), {}, format='json')

    assert response.status_code == status.HTTP_400_BAD_REQUEST


@pytest.mark.django_db
def test_user_detail_get_update_delete(api_client, staff_user):
    """Verifies staff users can retrieve, partially update, and delete a user via the user-detail endpoint."""
    User = get_user_model()
    target = User.objects.create_user(email='target@example.com', password='pass1234')
    api_client.force_authenticate(user=staff_user)

    response = api_client.get(reverse('user-detail', kwargs={'user_id': target.id}))
    assert response.status_code == status.HTTP_200_OK

    response = api_client.patch(
        reverse('user-detail', kwargs={'user_id': target.id}),
        {'first_name': 'Updated'},
        format='json',
    )
    assert response.status_code == status.HTTP_200_OK

    response = api_client.delete(reverse('user-detail', kwargs={'user_id': target.id}))
    assert response.status_code == status.HTTP_204_NO_CONTENT


@pytest.mark.django_db
def test_user_detail_not_found(api_client, staff_user):
    api_client.force_authenticate(user=staff_user)

    response = api_client.get(reverse('user-detail', kwargs={'user_id': 999}))

    assert response.status_code == status.HTTP_404_NOT_FOUND


@pytest.mark.django_db
def test_user_detail_update_invalid(api_client, staff_user):
    User = get_user_model()
    target = User.objects.create_user(email='invalid@example.com', password='pass1234')
    api_client.force_authenticate(user=staff_user)

    response = api_client.put(
        reverse('user-detail', kwargs={'user_id': target.id}),
        {},
        format='json',
    )

    assert response.status_code == status.HTTP_400_BAD_REQUEST
