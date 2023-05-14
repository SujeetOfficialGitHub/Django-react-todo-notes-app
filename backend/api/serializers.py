from .models import Category, TodoNote
from accounts.models import User
from rest_framework import serializers
from accounts.serializer import UserProfileSerializer

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'title']
        
class TodoNoteSerializer(serializers.ModelSerializer):
    user_email =  serializers.StringRelatedField(source='user.email')
    category_name = serializers.StringRelatedField(source="category.title")
    class Meta:
        model = TodoNote
        fields = ['id', 'user_email', 'category_name', 'title','slug', 'description', 'updated_at', 'created_at']

        