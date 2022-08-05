from django.urls import reverse
import pytest


@pytest.mark.django_db
def test_get_my_lists(signed_in_user):
    resp = signed_in_user.get(reverse("list-view-list"))
    data = resp.json()
    assert resp.status_code == 200
    assert data == []


@pytest.mark.django_db
def test_get_others_private_list(signed_in_user, private_list):
    resp = signed_in_user.get(
        reverse("list-view-detail", kwargs={"pk": private_list.id})
    )
    assert resp.status_code == 403


@pytest.mark.django_db
def test_update_others_private_list(signed_in_user, private_list):
    resp = signed_in_user.patch(
        reverse("list-view-detail", kwargs={"pk": private_list.id}),
        {"title": "new title"},
    )
    assert resp.status_code == 403


@pytest.mark.django_db
def test_delete_others_private_list(signed_in_user, private_list):
    resp = signed_in_user.delete(
        reverse("list-view-detail", kwargs={"pk": private_list.id})
    )
    assert resp.status_code == 403


@pytest.mark.django_db
def test_get_my_private_list(signed_in_private_user, private_list):
    resp = signed_in_private_user.get(
        reverse("list-view-detail", kwargs={"pk": private_list.id})
    )
    # assert contents
    assert resp.status_code == 200


@pytest.mark.django_db
def test_update_my_private_list(signed_in_private_user, private_list):
    resp = signed_in_private_user.patch(
        reverse("list-view-detail", kwargs={"pk": private_list.id}),
        {"title": "new title"},
    )
    assert resp.json()["title"] == "new title"
    assert resp.status_code == 200


@pytest.mark.django_db
def test_delete_my_private_list(signed_in_private_user, private_list):
    resp = signed_in_private_user.delete(
        reverse("list-view-detail", kwargs={"pk": private_list.id})
    )
    assert resp.status_code == 204


@pytest.mark.django_db
def test_get_my_lists__anon_user(anon_user):
    resp = anon_user.get(reverse("list-view-list"))
    assert resp.status_code == 401


@pytest.mark.django_db
def test_create_new_list(signed_in_user, link):
    resp = signed_in_user.post(
        reverse("list-view-list"),
        {"links": [link], "title": "generic title"},
        format='json'
    )
    data = resp.json()
    assert data["links"] == [link]
    assert data["title"] == "generic title"
    assert resp.status_code == 201


@pytest.mark.django_db
def test_create_new_list__anon_user(anon_user, link):
    resp = anon_user.patch(
        reverse("list-view-list"),
        {"links": [link.id], "title": "generic title"}
    )
    assert resp.status_code == 401


@pytest.mark.django_db
def test_delete_list(signed_in_user, sample_list):
    resp = signed_in_user.delete(
        reverse("list-view-detail", args=[sample_list.id]))
    assert resp.status_code == 204


@pytest.mark.django_db
def test_delete_list__anon_user(anon_user, sample_list):
    resp = anon_user.delete(
        reverse("list-view-detail", args=[sample_list.id]))
    assert resp.status_code == 401


@pytest.mark.django_db
def test_update_list(signed_in_user, sample_list):
    resp = signed_in_user.patch(
        reverse("list-view-detail", args=[sample_list.id]),
        {"title": "new idea"}
    )
    assert resp.json()["title"] == "new idea"
    assert resp.status_code == 200


@pytest.mark.django_db
def test_update_list__anon_user(anon_user, sample_list):
    resp = anon_user.patch(
        reverse("list-view-detail", args=[sample_list.id]),
        {"title": "new idea"}
    )
    assert resp.status_code == 401


@pytest.mark.django_db
def test_create_link_anon_user(anon_user):
    resp = anon_user.post(
        reverse("link-view-list"),
        {"url": "http://abv.bg", "description": "email"}
    )
    assert resp.status_code == 401
