import pytest
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status


@pytest.mark.django_db
def test_user_detail_requires_staff(api_client):
    User = get_user_model()
    user = User.objects.create_user(email='target@example.com', password='pass1234')

    response = api_client.get(reverse('user-detail', kwargs={'user_id': user.id}))

    assert response.status_code == status.HTTP_403_FORBIDDEN
