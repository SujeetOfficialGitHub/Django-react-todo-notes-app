from django.urls import path
from .views import (
    UserRegisterView,
    UserLoginView,
    UserProfileView,
    UserChangePasswordView
)

urlpatterns = [
    path('register/', UserRegisterView.as_view()),
    path('login/', UserLoginView.as_view()),
    path('profile/', UserProfileView.as_view()),
    path('change_password/', UserChangePasswordView.as_view()),
]
