from rest_framework import serializers
from links.models import Link, KodjaLink, User

class LinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Link
        fields = '__all__'

class KodjaLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = KodjaLink
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'