from django.contrib.auth.models import User
from rest_framework import permissions, mixins, viewsets
from rest_framework.authtoken.models import Token
from .models import Link, LinkList
from .serializers import LinkSerializer, LinkListSerializer, UserSerializer
from .permissions import IsMyOwn

class LinkView(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet
    ):
    queryset = Link.objects.all()
    serializer_class = LinkSerializer
    permission_classes = (permissions.IsAuthenticated, )

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
    permission_classes = [IsMyOwn, permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    

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

    for user in queryset:
        Token.objects.get_or_create(user=user)