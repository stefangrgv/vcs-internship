from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework.authtoken.models import Token
from django.urls import reverse
from .models import Link, LinkList
import pytest



@pytest.fixture
def user():
    return User.objects.create(username="yolo", password="1234655")

@pytest.fixture
def anon_user():
    return APIClient()

@pytest.fixture
def signed_in_user(user):
    client = APIClient()
    token, _ = Token.objects.get_or_create(user=user)
    user.save()
    token.save()
    client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
    return client

@pytest.fixture
def link():
    return Link.objects.create(url='http://abv.bg', description='blabla')

@pytest.fixture
def sample_list(user):
    return LinkList.objects.create(title='sample_list', owner=user)

@pytest.fixture
def private_list():
    secret_user = User.objects.create(username='secret_user', password='password')
    return LinkList.objects.create(title='private_list', owner=secret_user, private=True)

@pytest.mark.django_db
def test_get_my_lists(signed_in_user):
    resp = signed_in_user.get(reverse('list-view-list'))
    # import pdb; pdb.set_trace()
    data = resp.json()
    assert resp.status_code == 200
    assert data == []

@pytest.mark.django_db
def test_get_others_private_lists(signed_in_user, sample_list, private_list):
    resp = signed_in_user.get(reverse('list-view-list'), args=[private_list.id])
    data = resp.json()
    #import pdb; pdb.set_trace()
    assert resp.status_code == 403

@pytest.mark.django_db
def test_get_my_lists__anon_user(anon_user):
    resp = anon_user.get(reverse('list-view-list'))
    assert resp.status_code == 401

@pytest.mark.django_db
def test_create_new_list(signed_in_user, link):
    resp = signed_in_user.post(
        reverse('list-view-list'),
        {'links': [link.id], 'title': 'generic title'}
    )
    assert resp.status_code == 201

@pytest.mark.django_db
def test_create_new_list__anon_user(anon_user, link):
    resp = anon_user.post(
        reverse('list-view-list'),
        {'links': [link.id], 'title': 'generic title'}
    )
    assert resp.status_code == 401

@pytest.mark.django_db
def test_delete_list(signed_in_user, sample_list):
    resp = signed_in_user.delete(
        reverse('list-view-detail', args=[sample_list.id])
    )
    assert resp.status_code == 204

@pytest.mark.django_db
def test_delete_list__anon_user(anon_user, sample_list):
    resp = anon_user.delete(
        reverse('list-view-detail', args=[sample_list.id])
    )
    assert resp.status_code == 401

@pytest.mark.django_db
def test_update_list(signed_in_user, sample_list):
    resp = signed_in_user.patch(
        reverse('list-view-detail', args=[sample_list.id]),
        {'title': 'new idea'}
    )
    assert resp.status_code == 200

@pytest.mark.django_db
def test_update_list__anon_user(anon_user, sample_list):
    resp = anon_user.put(
        reverse('list-view-detail', args=[sample_list.id])
    )
    assert resp.status_code == 401

@pytest.mark.django_db
def test_create_link(signed_in_user):
    resp = signed_in_user.post(
        reverse('link-view-list'),
        {'url': 'http://abv.bg', 'description': 'email'}
    )
    #import pdb; pdb.set_trace()
    assert resp.status_code == 201

@pytest.mark.django_db
def test_create_link_anon_user(anon_user):
    resp = anon_user.post(
        reverse('link-view-list'),
        {'url': 'http://abv.bg', 'description': 'email'}
    )
    #import pdb; pdb.set_trace()
    assert resp.status_code == 401


# @pytest.mark.django_db
# def test_get_my_list(signed_in_user, my_first_list):
#     data = signed_in_user.get(reverse('list_view-detail', args=[my_first_list.id]))
#     # assert data['lists'] == []