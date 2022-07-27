from rest_framework import routers
from . import views

router = routers.SimpleRouter()
router.register("links", views.LinkView, basename="link-view")
router.register("lists", views.LinkListView, basename="list-view")
router.register("user", views.UserDetailsView, basename="user-view")
router.register("allusers", views.UserListView, basename="allusers-view")
router.register("createuser", views.UserCreateView, basename="createuser-view")

urlpatterns = router.urls
