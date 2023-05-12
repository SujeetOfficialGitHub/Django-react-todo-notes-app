from rest_framework import serializers
from .models import User

# User Registration serializer
class UserRegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    class Meta:
        model = User
        fields = ['email', 'name', 'password', 'password2', 'tc']
        extra_kwargs = {
            'password': {'write_only': True}
        }
        
    # Validate password and confirm password 
    def validate(self, attrs):
        tc = attrs.get('tc')
        password = attrs.get('password')
        password2 = attrs.get('password2')
        if password != password2:
            raise serializers.ValidationError("Password and confirm doesn't match")
        if not tc:
            raise serializers.ValidationError("tc must be required")
        return attrs
    
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
 
# User Login serializer    
class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255)
    class Meta:
        model = User
        fields = ['email', 'password']