from rest_framework.response import Response
from rest_framework.decorators import api_view
from kodjalist.models import Link
from .serializers import LinkSerializer

@api_view(['GET'])
def getData(request):
    links = Link.objects.all()
    serializer = LinkSerializer(links, many=True)
    return Response(serializer.data)
