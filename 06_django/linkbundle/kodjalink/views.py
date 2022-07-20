from django.contrib.auth.models import User
from rest_framework import generics
from .models import Link, LinkList
from .serializers import LinkSerializer, LinkListSerializer, UserSerializer
from rest_framework import permissions
from .permissions import IsOwnerOrReadOnly


class LinkListView(generics.RetrieveUpdateDestroyAPIView):
    queryset = LinkList.objects.all()
    serializer_class = LinkListSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner = self.request.user)

class LinkView(generics.RetrieveUpdateDestroyAPIView):
    queryset = LinkList.objects.all()
    serializer_class = LinkSerializer

class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetails(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer