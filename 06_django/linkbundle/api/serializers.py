from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Link, LinkList
from collections import OrderedDict

class LinkSerializer(serializers.ModelSerializer):
    """
    Serializer for link endpoint.
    """


    class Meta:
        model = Link
        fields = ["id", "url", "thumbnail", "description"]



class LinkListSerializer(serializers.ModelSerializer):
    """
    Serializer for linklist endpoint.
    """

    links = LinkSerializer(many=True, required=False)
    owner = serializers.ReadOnlyField(source="owner.username")
    

    class Meta:
        model = LinkList
        fields = ["id", "links", "owner", "title", "private"]
        read_only_fields = ["owner"]


    def create(self, validated_data):
        links = validated_data.pop('links')
        linklist = LinkList.objects.create(owner=self.context['request'].user, **validated_data)
        for l in links:
            linklist.links.add(
                Link.objects.get(url=l['url'])
            )
        return linklist


class UserDetailsSerializer(serializers.ModelSerializer):
    """
    Serializer for user details endpoint.
    """

    linklists = LinkListSerializer(many=True)


    class Meta:
        model = User
        fields = ["id", "username", "email", "linklists"]


class UserListSerializer(serializers.ModelSerializer):
    """
    Serializer for listing all users endpoint.
    """


    class Meta:
        model = User
        fields = ["username"]


class UserCreateSerializer(serializers.ModelSerializer):
    """
    Serializer for user creation endpoint.
    """


    class Meta:
        model = User
        fields = ["id", "username", "password", "email"]


class UserChangePasswordSerializer(serializers.ModelSerializer):
    """
    Serializer for password change endpoint.
    """

    old_password = serializers.CharField(required=True)
    new_password_one = serializers.CharField(required=True)
    new_password_two = serializers.CharField(required=True)


    class Meta:
        model = User