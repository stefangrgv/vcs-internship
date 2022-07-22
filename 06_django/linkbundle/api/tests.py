from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework.authtoken.models import Token
from django.urls import reverse
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


@pytest.mark.django_db
def test_get_my_lists(signed_in_user):
    resp = signed_in_user.get(reverse('linklist-view-list'))
    # import pdb; pdb.set_trace()
    data = resp.json()
    assert resp.status_code == 200
    assert data == []

@pytest.mark.django_db
def test_get_my_lists__anon_user(anon_user):
    resp = anon_user.get(reverse('linklist-view-list'))
    assert resp.status_code == 403


# @pytest.mark.django_db
# def test_get_my_list(signed_in_user, my_first_list):
#     data = signed_in_user.get(reverse('linklist_view-detail', args=[my_first_list.id]))
#     # assert data['lists'] == []