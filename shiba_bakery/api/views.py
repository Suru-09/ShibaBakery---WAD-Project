from django.shortcuts import render
from .serializers import UserSerializer, ProductSerializer, OrderSerializer
from .models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, status
from django.contrib.auth.hashers import make_password

# Create your views here.

class SignUpView(APIView):
    serializer_class = UserSerializer

    def get(self, request, format=None):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            first_name = serializer.data.get('first_name')
            last_name = serializer.data.get('last_name')
            username = serializer.data.get('username')
            address = serializer.data.get('address')
            email = serializer.data.get('email')
            user = User(first_name=first_name,
                password=make_password('password'),
                last_name=last_name,
                username=username,
                email=email,
                address=address)
            user.save()
            return Response("User has been created", status=status.HTTP_200_OK)
        return Response("Invalid Data!!", status=status.HTTP_400_BAD_REQUEST)

            
