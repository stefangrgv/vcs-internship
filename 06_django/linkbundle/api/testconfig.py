from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework.authtoken.models import Token
import pytest
from .models import Link, LinkList


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
def private_user():
    return User.objects.create(username='private_user', password='password')

@pytest.fixture
def signed_in_private_user(private_user):
    client = APIClient()
    token, _ = Token.objects.get_or_create(user=private_user)
    private_user.save()
    token.save()
    client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
    return client

@pytest.fixture
def private_list(private_user):
    return LinkList.objects.create(title='private_list', owner=private_user, private=True)
