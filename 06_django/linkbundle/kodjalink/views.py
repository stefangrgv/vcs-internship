from django.contrib.auth.models import User
from rest_framework import permissions, mixins
from rest_framework.views import APIView
from .permissions import IsOwnerOrReadOnly
from .models import LinkList
from .serializers import LinkListSerializer, UserSerializer

from rest_framework.response import Response

class LinkListView(mixins.ListModelMixin, mixins.CreateModelMixin, APIView):
    queryset = LinkList.objects.all()
    serializer_class = LinkListSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner = self.request.user)

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

class UserView(mixins.ListModelMixin, mixins.CreateModelMixin, APIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)