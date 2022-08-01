from django.contrib.auth.models import User
from rest_framework import permissions, mixins, viewsets
from rest_framework.authtoken.models import Token
from .models import Link, LinkList
from .serializers import \
    LinkSerializer, LinkListSerializer, UserDetailsSerializer,\
    UserListSerializer, UserCreateSerializer,\
    UserChangePasswordSerializer
from .permissions import IsMyOwn, IsMe
import requests
import json
from bs4 import BeautifulSoup as bs


class LinkView(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet
):
    queryset = Link.objects.all()
    serializer_class = LinkSerializer
    permission_classes = (permissions.IsAuthenticated,)


class LinkListView(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):
    queryset = LinkList.objects.all()
    serializer_class = LinkListSerializer
    permission_classes = [IsMyOwn, permissions.IsAuthenticated]       


class UserDetailsView(
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    #mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    queryset = User.objects.all()
    serializer_class = UserDetailsSerializer
    permission_classes = [IsMe]
    lookup_field = 'username'

class UserListView(
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):
    queryset = User.objects.all()
    serializer_class = UserListSerializer

    for user in queryset:
        Token.objects.get_or_create(user=user)

class UserCreateView(
    mixins.CreateModelMixin,
    viewsets.GenericViewSet,
):
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer


class UserChangePasswordView(
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet,
):
    serializer_class = UserChangePasswordSerializer
    permission_classes = [IsMe]


# class ScrapedSiteView(
#     mixins.RetrieveModelMixin,
#     viewsets.GenericViewSet,
# ):
#     queryset = ScrapedSite.objects.all()
#     serializer_class = ScrapedSiteSerializer


# def scrape(request):
#     response = requests.get(request.url)
#     soup = bs(response.text, 'html.parser')

#     scraped = ScrapedSite()
#     scraped.title = ''

#     if type(soup.title) == 'list':
#         scraped.title = soup.title[0].text
#     else:
#         scraped.title = soup.title.text

#     scraped.save()
#     print(scraped.title)
