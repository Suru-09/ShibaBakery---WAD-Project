from rest_framework import serializers
from .models import Product, Order
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'first_name',
            'password',
            'last_name',
            'username',
            'email',
            )

class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('__all__')

class OrderSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Order
        fields = ('__all__')