from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .models import TodoNote, Category
from .serializers import TodoNoteSerializer
# Create your views here.
class TodoNoteView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, slug=None, format=None):
        if slug:
            try:
                queryset = TodoNote.objects.get(slug=slug, user=request.user)
                serialize = TodoNoteSerializer(queryset)
                return Response(serialize.data, status=status.HTTP_200_OK)
            except Exception as e:
                print(e)
                return Response({'message':"Request failed"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            queryset = TodoNote.objects.filter(user=request.user).order_by('-updated_at')
            serialize = TodoNoteSerializer(queryset, many=True)
            return Response(serialize.data, status=status.HTTP_200_OK)
        
    def post(self, request, format=None):
        category = request.data.get('category')
        # Check category is present or not 
        category_name, _ = Category.objects.get_or_create(title=category)
        serialize = TodoNoteSerializer(data=request.data)
        serialize.is_valid(raise_exception=True)
        serialize.save(user=request.user, category=category_name)
        return Response(serialize.data, status=status.HTTP_201_CREATED)
    
    def delete(self, request, slug, format=None):
        try:
            queryset = TodoNote.objects.get(slug=slug)
            serialize = TodoNoteSerializer(queryset, many=False)
            queryset.delete()
            return Response(serialize.data, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({'message': 'Rquest failed'})
    
    def put(self, request, slug, format=None):
        try:
            queryset = TodoNote.objects.get(slug=slug)
            serialize = TodoNoteSerializer(queryset, data=request.data)
            serialize.is_valid(raise_exception=True)
            serialize.save()
            return Response(serialize.data, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({'message': 'Rquest failed'})
    
    
            