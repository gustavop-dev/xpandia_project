import pytest
from django.contrib.auth import get_user_model

from base_feature_app.serializers.user_list import UserListSerializer

User = get_user_model()

_EXPECTED_FIELDS = {'id', 'email', 'first_name', 'last_name', 'role', 'is_active', 'is_staff'}
_EXCLUDED_FIELDS = {'phone', 'date_joined', 'password'}


@pytest.mark.django_db
def test_user_list_serializer_contains_expected_fields(existing_user):
    data = UserListSerializer(existing_user).data

    assert set(data.keys()) == _EXPECTED_FIELDS


@pytest.mark.django_db
def test_user_list_serializer_excludes_sensitive_fields(existing_user):
    data = UserListSerializer(existing_user).data

    assert _EXCLUDED_FIELDS.isdisjoint(data.keys())


@pytest.mark.django_db
def test_user_list_serializer_returns_correct_field_values():
    user = User.objects.create_user(
        email='list@example.com',
        password='pass1234',
        first_name='List',
        last_name='User',
    )
    user.is_staff = True
    user.save(update_fields=['is_staff'])

    data = UserListSerializer(user).data

    assert data['email'] == 'list@example.com'
    assert data['last_name'] == 'User'
    assert data['is_staff'] is True
