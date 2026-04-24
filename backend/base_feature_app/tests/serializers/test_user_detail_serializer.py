import pytest
from django.contrib.auth import get_user_model

from base_feature_app.serializers.user_detail import UserDetailSerializer

User = get_user_model()

_EXPECTED_FIELDS = {'id', 'email', 'first_name', 'last_name', 'phone', 'role', 'is_active', 'is_staff', 'date_joined'}


@pytest.mark.django_db
def test_user_detail_serializer_contains_expected_fields(existing_user):
    data = UserDetailSerializer(existing_user).data

    assert set(data.keys()) == _EXPECTED_FIELDS


@pytest.mark.django_db
def test_user_detail_serializer_excludes_password(existing_user):
    data = UserDetailSerializer(existing_user).data

    assert 'password' not in data


@pytest.mark.django_db
def test_user_detail_serializer_returns_correct_field_values():
    user = User.objects.create_user(
        email='detail@example.com',
        password='pass1234',
        first_name='Detail',
        last_name='User',
        role=User.Role.CUSTOMER,
    )

    data = UserDetailSerializer(user).data

    assert data['email'] == 'detail@example.com'
    assert data['first_name'] == 'Detail'
    assert data['role'] == User.Role.CUSTOMER
