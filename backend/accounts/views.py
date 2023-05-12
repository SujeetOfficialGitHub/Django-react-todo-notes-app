from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializer import UserRegisterSerializer
from .models import User
from api.renderer import CustomRenderer

from rest_framework_simplejwt.tokens import RefreshToken

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

