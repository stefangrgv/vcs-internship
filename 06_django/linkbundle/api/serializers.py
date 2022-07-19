from rest_framework import serializers
from kodjalink.models import KodjaLink

class KodjaLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = KodjaLink
        fields = ['id', 'user', 'links']