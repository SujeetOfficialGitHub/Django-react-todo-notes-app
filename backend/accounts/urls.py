from django.urls import path
from .views import (
    UserRegisterView,
    UserLoginView,
    UserProfileView,
    UserChangePasswordView,
    SendPasswordResetEmailView,
    UserPasswordResetView
)

urlpatterns = [
    path('register/', UserRegisterView.as_view()),
    path('login/', UserLoginView.as_view()),
    path('profile/', UserProfileView.as_view()),
    path('change_password/', UserChangePasswordView.as_view()),
    path('send_reset_password_email/', SendPasswordResetEmailView.as_view()),
    path('reset_password/<uid>/<token>/', UserPasswordResetView.as_view()),
]
