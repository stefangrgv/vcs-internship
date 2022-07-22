from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Link, LinkList

class LinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Link
        fields = ['id', 'url', 'thumbnail', 'description']

class LinkListSerializer(serializers.ModelSerializer):
    class Meta:
        model = LinkList
        fields = ['id', 'links', 'owner', 'title', 'private']
        read_only_fields = ['owner']

    owner = serializers.ReadOnlyField(source='owner.username')

class UserSerializer(serializers.ModelSerializer):
    linklists = LinkListSerializer(many=True)
    # linklists = serializers.PrimaryKeyRelatedField(many=True, queryset=LinkList.objects.all())
    # for user in User.objects.all():
    #     Token.objects.get_or_create(user=user)

    class Meta:
        model = User
        fields = ['id', 'username', 'linklists']
