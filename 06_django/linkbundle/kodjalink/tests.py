from django.contrib.auth.models import User
from rest_framework.test import APIClient
import pytest



@pytest.fixture
def user():
    return User.objects.create(username="yolo", password="1234655")

@pytest.fixture
def anon_user(user):
    client = APIClient()
    return client

@pytest.fixture
def signed_in_user(user):
    client = APIClient()
    client.login(username=user.username, password=user.password)
    return client


@pytest.mark.django_db
def test_get_my_lists(signed_in_user):
    data = signed_in_user.get(reverse('kl'))
    assert data['lists'] == []