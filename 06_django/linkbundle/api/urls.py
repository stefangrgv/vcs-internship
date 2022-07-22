from rest_framework import routers
from . import views

router = routers.SimpleRouter()
router.register('links', views.LinkView, basename='link-view')
router.register('lists', views.LinkListView, basename='list-view')
router.register('users', views.UserView, basename='user-view')

urlpatterns = router.urls
