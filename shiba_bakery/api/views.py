from django.contrib.auth import authenticate

from .serializers import UserSerializer, LoginSerializer, ProductSerializer, OrderSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth.models import User
from .models import Product, Order


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
                        last_name=last_name,
                        username=username,
                        email=email)
            user.set_password(serializer.data.get('password'))
            user.save()
            return Response("User has been created", status=status.HTTP_200_OK)
        return Response("Invalid Data!!", status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            username = serializer.data.get('username')
            password = serializer.data.get('password')
            user = User.objects.filter(username=username)
            if not user:
                return Response("The user doesn't exist in the database!", status=status.HTTP_400_BAD_REQUEST)
            if user[0].check_password(password):
                return Response("You have successfully logged in!", status=status.HTTP_200_OK)
            return Response("Wrong password!", status=status.HTTP_400_BAD_REQUEST)
        return Response("Bad information give at input!", status=status.HTTP_404_NOT_FOUND)


class ProductView(APIView):
    serializer_class = ProductSerializer

    def get(self, request, format=None):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            name = serializer.data.get('name')
            ingredients = serializer.data.get('ingredients')
            price = serializer.data.get('price')
            category = serializer.data.get('category')
            description = serializer.data.get('description')
            image = serializer.data.get('image')

            product = Product(name,
                              ingredients,
                              price,
                              category,
                              description,
                              image)
            print(product)
            product.save()
            return Response("The product has been added to the database",
                            status=status.HTTP_200_OK)
        return Response("The given data is not valid!",
                        status=status.HTTP_400_BAD_REQUEST)


class OrderView(APIView):
    serializer_class = OrderSerializer

    def get(self, request, format=None):
        orders = Order.objects.all()
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            status_order = serializer.data.get('status')
            date_created = serializer.data.get('customer')
            customer = serializer.data.get('customer')
            product = serializer.data.get('product')

            order = Order(status_order,
                          date_created,
                          customer,
                          product)

            order.save()
            return Response("The order has been added to the database",
                            status=status.HTTP_200_OK)
        return Response("The given data is not valid!",
                        status=status.HTTP_400_BAD_REQUEST)


class DeleteUser:
    def post(self, request, format=None):
        try:
            first_name = request.data.get('first_name')
            last_name = request.data.get('last_name')
            user = User.filter(last_name, first_name)
            user.delete()
        except:
            return Response("There was an error",
                            status=status.HTTP_400_BAD_REQUEST)

        return Response("The user has been deleted from the database",
                        status=status.HTTP_200_OK)


class UpdateUser:
    serializer_class = UserSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            first_name = serializer.data.get('first_name')
            last_name = serializer.data.get('last_name')
            username = serializer.data.get('username')
            email = serializer.data.get('email')

            User.objects.update_or_create(
                first_name=first_name,
                last_name=last_name,
                password=make_password('password'),
                username=username,
                email=email
            )

            return Response("The user has been updated in the database",
                            status=status.HTTP_200_OK)
        return Response("The user hasn't been updated!",
                        status=status.HTTP_400_BAD_REQUEST)


class DeleteProduct:
    def post(self, request, format=None):
        try:
            name = request.data.get('name')
            product = Product.filter(name)
            product.delete()
        except:
            return Response("The product hasn't been deleted!",
                            status=status.HTTP_400_BAD_REQUEST)
        return Response("The product has been deleted from the database",
                        status=status.HTTP_200_OK)

class UpdateProduct:
    serializer_class = ProductSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            name = serializer.data.get('name')
            ingredients = serializer.data.get('ingredients')
            price = serializer.data.get('price')
            category = serializer.data.get('category')
            description = serializer.data.get('description')
            date_created = serializer.data.get('date_created')
            image = serializer.data.get('image')

            Product.objects.update_or_create(
                name=name,
                ingredients=ingredients,
                price=price,
                category=category,
                description=description,
                date_created=date_created,
                image=image
            )

            return Response("The product has been updated in the database",
                            status=status.HTTP_200_OK)
        return Response("The product hasn't been updated!",
                        status=status.HTTP_400_BAD_REQUEST)
