from django.contrib.auth import authenticate

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from api.renderer import CustomRenderer
from .serializer import (
    UserRegisterSerializer,
    UserLoginSerializer,
    UserProfileSerializer
)
from .models import User


# Create your views here.
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


class UserRegisterView(APIView):
    renderer_classes = [CustomRenderer]
    def post(self, request, format=None):
        serialize = UserRegisterSerializer(data=request.data)
        serialize.is_valid(raise_exception=True)
        user = serialize.save()
        token = get_tokens_for_user(user)
        return Response({"message": "Registration Successfully", "token": token}, status=status.HTTP_201_CREATED)


class UserLoginView(APIView):
    renderer_classes = [CustomRenderer]
    def post(self, request, format=None):
        serialize = UserLoginSerializer(data=request.data)
        serialize.is_valid(raise_exception=True)
        email = serialize.data.get('email')
        password = serialize.data.get('password')
        user = authenticate(email=email, password=password)
        if user is not None:
            token = get_tokens_for_user(user)
            return Response({'token': token, 'message': 'Login Successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'errors': {'non_field_errors': ['Email or password is not valid']}}, status=status.HTTP_404_NOT_FOUND)
    
class UserProfileView(APIView):
    renderer_classes = [CustomRenderer]
    parser_classes = [IsAuthenticated]
    def get(self, request, format=None):
        try:
            serialize = UserProfileSerializer(request.user)
            return Response(serialize.data, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({'message': 'Request failed'}, status=status.HTTP_400_BAD_REQUEST)
            