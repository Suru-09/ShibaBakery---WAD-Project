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

    def my_custom_filter(self, name, ingredients, price, category, description, stock_count):
        return Product.objects.filter(
            Q(name__icontains=name) | Q(ingredients__icontains=ingredients)
            | Q(price__icontains=price) | Q(category__icontains=category)
            | Q(description__icontaions=description) | Q(description__icontaions=stock_count)
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
    # name = serializers.CharField()
    # ingredients = serializers.CharField()
    # price = serializers.CharField()
    # category = serializers.CharField()
    # description = serializers.CharField()
    # image = serializers.CharField()
    # stock_count = serializers.IntegerField()
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
        fields = ('id',
                  'customer',
                  'status',
                  'contact_person',
                  'phone_number',
                  'delivery_address')