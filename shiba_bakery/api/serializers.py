from rest_framework import serializers
from .models import Product, Order
from django.contrib.auth.models import User
from django.db.models import Q
import django_filters


class ProductFilter(django_filters.FilterSet):
    q = django_filters.CharFilter(method='my_custom_filter', label="Search")

    class Meta:
        model = Product
        fields = ['q']

    def my_custom_filter(self, name, ingredients, price, category, description):
        return Product.objects.filter(
            Q(name__icontains=name) | Q(ingredients__icontains=ingredients)
            | Q(price__icontains=price) | Q(category__icontains=category) 
            | Q(description__icontaions=description)
        )


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'first_name',
            'password',
            'last_name',
            'username',
            'email',
        )


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    # class Meta:
    #     model = User
    #     fields = ('username', 'password')


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id',
                  'name',
                  'ingredients',
                  'price',
                  'category',
                  'description',
                  'image',
                  'stock_count')


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('date_created',
                  'customer',
                  'product',
                  'status')
