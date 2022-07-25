from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Link, LinkList


class LinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Link
        fields = ["id", "url", "thumbnail", "description"]


class LinkListSerializer(serializers.ModelSerializer):
    links = LinkSerializer(many=True)
    owner = serializers.ReadOnlyField(source="owner.username")

    class Meta:
        model = LinkList
        fields = ["id", "links", "owner", "title", "private"]
        read_only_fields = ["owner"]



class UserSerializer(serializers.ModelSerializer):
    linklists = LinkListSerializer(many=True)

    class Meta:
        model = User
        fields = ["id", "username", "linklists"]
