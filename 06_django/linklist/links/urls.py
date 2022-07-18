from rest_framework import routers
from .api import LinkViewSet, KodjaLinkViewSet, UserViewSet

router = routers.DefaultRouter()
router.register('', KodjaLinkViewSet)

urlpatterns = router.urls

'''
urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html')),
]
'''