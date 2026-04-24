import pytest
from django.contrib.auth import get_user_model
from django.urls import reverse
from django_attachments.models import Library
from rest_framework import status

from base_feature_app.models import Blog


@pytest.fixture
def staff_user(db):
    User = get_user_model()
    user = User.objects.create_user(email='staff2@example.com', password='pass1234')
    user.is_staff = True
    user.save(update_fields=['is_staff'])
    return user


def _create_blog():
    library = Library.objects.create(title='Blog Library')
    return Blog.objects.create(title='Blog', description='Desc', category='Cat', image=library)


@pytest.mark.django_db
def test_blog_crud_list(api_client):
    _create_blog()

    response = api_client.get(reverse('blogs'))

    assert response.status_code == status.HTTP_200_OK
    assert len(response.json()) == 1


@pytest.mark.django_db
def test_blog_crud_create_success(api_client, staff_user):
    library = Library.objects.create(title='Blog Library')
    api_client.force_authenticate(user=staff_user)

    response = api_client.post(
        reverse('blogs'),
        {'title': 'New', 'description': 'Desc', 'category': 'Cat', 'image': library.id},
        format='json',
    )

    assert response.status_code == status.HTTP_201_CREATED
    assert Blog.objects.filter(title='New').exists()


@pytest.mark.django_db
def test_blog_crud_create_invalid(api_client, staff_user):
    api_client.force_authenticate(user=staff_user)

    response = api_client.post(reverse('blogs'), {}, format='json')

    assert response.status_code == status.HTTP_400_BAD_REQUEST


@pytest.mark.django_db
def test_blog_detail_get_success(api_client):
    blog = _create_blog()

    response = api_client.get(reverse('blog-detail', kwargs={'blog_id': blog.id}))

    assert response.status_code == status.HTTP_200_OK
    assert response.json()['id'] == blog.id


@pytest.mark.django_db
def test_blog_detail_not_found(api_client):
    response = api_client.get(reverse('blog-detail', kwargs={'blog_id': 999}))

    assert response.status_code == status.HTTP_404_NOT_FOUND


@pytest.mark.django_db
def test_blog_detail_update_requires_staff(api_client):
    blog = _create_blog()

    response = api_client.patch(
        reverse('blog-detail', kwargs={'blog_id': blog.id}),
        {'title': 'Updated'},
        format='json',
    )

    assert response.status_code == status.HTTP_403_FORBIDDEN


@pytest.mark.django_db
def test_blog_detail_update_success(api_client, staff_user):
    blog = _create_blog()
    api_client.force_authenticate(user=staff_user)

    response = api_client.patch(
        reverse('blog-detail', kwargs={'blog_id': blog.id}),
        {'title': 'Updated'},
        format='json',
    )

    assert response.status_code == status.HTTP_200_OK
    blog.refresh_from_db()
    assert blog.title == 'Updated'


@pytest.mark.django_db
def test_blog_detail_update_invalid(api_client, staff_user):
    blog = _create_blog()
    api_client.force_authenticate(user=staff_user)

    response = api_client.patch(
        reverse('blog-detail', kwargs={'blog_id': blog.id}),
        {'title': ''},
        format='json',
    )

    assert response.status_code == status.HTTP_400_BAD_REQUEST


@pytest.mark.django_db
def test_blog_detail_delete(api_client, staff_user):
    blog = _create_blog()
    api_client.force_authenticate(user=staff_user)

    response = api_client.delete(reverse('blog-detail', kwargs={'blog_id': blog.id}))

    assert response.status_code == status.HTTP_204_NO_CONTENT
    assert Blog.objects.count() == 0


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
