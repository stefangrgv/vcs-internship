from rest_framework import routers
from . import views

router = routers.SimpleRouter()
router.register('links', views.LinkListView, basename='linklist-view')
# router.register(r'^users', views.UserView.as_view(), basename='user_view')

urlpatterns = router.urls
