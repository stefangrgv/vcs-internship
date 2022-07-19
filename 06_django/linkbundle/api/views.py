from rest_framework.response import Response
from rest_framework.decorators import api_view
from kodjalink.models import KodjaLink
from .serializers import KodjaLinkSerializer

@api_view(['GET'])
def getData(request, pk):
    kodjalinks = KodjaLink.objects.get(id=pk)
    serializer = KodjaLinkSerializer(kodjalinks)
    return Response(serializer.data)
