from django.contrib.auth.models import User
from rest_framework import permissions, mixins, viewsets
from .models import LinkList
from .serializers import LinkListSerializer, UserSerializer

from rest_framework.response import Response

class LinkListView(
        mixins.CreateModelMixin,
        mixins.RetrieveModelMixin,
        mixins.UpdateModelMixin,
        mixins.DestroyModelMixin,
        mixins.ListModelMixin,
        viewsets.GenericViewSet
    ):
    queryset = LinkList.objects.all()
    serializer_class = LinkListSerializer
    permission_classes = (permissions.IsAuthenticated, )

    def perform_create(self, serializer):
        serializer.save(owner = self.request.user)

class UserView(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet
    ):
    queryset = User.objects.all()
    serializer_class = UserSerializer
