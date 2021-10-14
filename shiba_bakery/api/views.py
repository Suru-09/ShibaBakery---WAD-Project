from django.shortcuts import render
from .serializers import UserSerializer, LoginSerializer
# from .models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, status
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth.models import User

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
            email = serializer.data.get('email')
            user = User(first_name=first_name,
                password=make_password('password'),
                last_name=last_name,
                username=username,
                email=email)
            user.save()
            return Response("User has been created", status=status.HTTP_200_OK)
        return Response("Invalid Data!!", status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    serializer_class = LoginSerializer
    
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            username = serializer.data.get('username')
            password = serializer.data.get('password')
            user = User.objects.filter(username=username)
            print(user)
            if not user:  
                return Response("The user doesn't exist in the database!", status=status.HTTP_400_BAD_REQUEST)
            print(password + " string intre " + user[0].get_password())
            print(check_password(password, user[0].get_password()))
            if check_password(password, user[0].get_password()):
                return Response("You have successfully logged in!", status=status.HTTP_200_OK)
            return Response("Wrong password!", status=status.HTTP_400_BAD_REQUEST)  
        return Response("Bad information give at input!", status=status.HTTP_200_OK)