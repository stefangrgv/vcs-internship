from links.models import Link, KodjaLink, User
from rest_framework import viewsets, permissions
from .serializers import LinkSerializer, KodjaLinkSerializer, UserSerializer

class LinkViewSet(viewsets.ModelViewSet):
    queryset = Link.objects.all()
    permissions_classes = [
        permissions.AllowAny
    ]
    serializer_class = LinkSerializer

class KodjaLinkViewSet(viewsets.ModelViewSet):
    queryset = KodjaLink.objects.all()
    permissions_classes = [
        permissions.AllowAny
    ]
    serializer_class = KodjaLinkSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permissions_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserSerializer