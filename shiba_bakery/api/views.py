from django.contrib.auth import authenticate

from .serializers import UserSerializer, LoginSerializer, ProductSerializer, OrderSerializer, ProductFilter
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate
from .models import Product, Order, Order_Product


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
            user = authenticate(username=username, password=password)
            if not user:
                return Response("The user doesn't exist in the database!", status=status.HTTP_400_BAD_REQUEST)
            is_admin = user.is_staff
            return Response(is_admin, status=status.HTTP_200_OK)
        return Response("Bad information give at input!", status=status.HTTP_404_NOT_FOUND)


class GetUserAfterId(APIView):
    serializer_class = UserSerializer
    lookup_url_kwarg = 'user_id'

    def get(self, request, format=None):
        user_id = request.GET.get(self.lookup_url_kwarg)
        user = User.objects.get(pk=user_id)
        serializer = self.serializer_class(user)
        return Response(serializer.data)


class GetUserAfterUsername(APIView):
    serializer_class = UserSerializer
    lookup_url_kwarg = 'username'

    def get(self, request, format=None):
        user_name = request.GET.get(self.lookup_url_kwarg)
        user = User.objects.get(username=user_name)
        serializer = self.serializer_class(user)
        return Response(serializer.data)


class ProductView(APIView):
    serializer_class = ProductSerializer

    def get(self, request, format=None):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        filter_product = ProductFilter

        if not serializer.is_valid():
            name = serializer.data.get('name')
            ingredients = serializer.data.get('ingredients')
            price = serializer.data.get('price')
            category = serializer.data.get('category')
            description = serializer.data.get('description')
            image = serializer.data.get('image')
            stock_count = serializer.data.get('stock_count')

            # value = filter_product.my_custom_filter(filter_product, name, ingredients, price, category, description, stock_count)
            product = Product(name=name,
                              ingredients=ingredients,
                              price=price,
                              category=category,
                              description=description,
                              image=image,
                              stock_count=stock_count)
            product.save()
            return Response("The product has been added to the database",
                            status=status.HTTP_200_OK)
        return Response("The given data is not valid!",
                        status=status.HTTP_400_BAD_REQUEST)


class GetProductAfterID(APIView):
    serializer_class = ProductSerializer
    lookup_url_kwarg = 'product_id'

    def get(self, request):
        product_id = request.GET.get(self.lookup_url_kwarg)
        product = Product.objects.get(pk=product_id)
        serializer = self.serializer_class(product)
        return Response(serializer.data)


class OrderView(APIView):
    serializer_class = OrderSerializer

    def get(self, request, format=None):
        orders = Order.objects.all()
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        if not serializer.is_valid():
            status_order = request.data.get('status')
            customer_name = request.data.get('customer')
            print(customer_name)
            customer_query = User.objects.filter(first_name=customer_name)
            customer = customer_query[0]

            phone_number = request.data.get('phone_number')
            contact_person = request.data.get('contact_person')
            delivery_address = request.data.get('delivery_address')

            Order.objects.update_or_create(status=status_order,
                          customer=customer,
                          phone_number=phone_number,
                          contact_person=contact_person,
                          delivery_address=delivery_address)
            final_order = Order.objects.filter(status=status_order,
                                               customer=customer)

            # Saving all the product in the many-to-many table for
            # the list of products in each order
            product_name = request.data.get('product')
            for x in product_name:
                product = Product.objects.filter(name=x)
                print(product[0])
                Order_Product.objects.update_or_create(order_id=final_order[0],
                                            product_id=product[0])

            return Response("The order has been added to the database",
                            status=status.HTTP_200_OK)
        return Response("The given data is not valid!",
                        status=status.HTTP_400_BAD_REQUEST)


class DeleteUser(APIView):
    def post(self, request, format=None):
        try:
            username = request.data.get('username')
            user = User.objects.filter(username=username)
            print(user)
            user.delete()
            return Response("There was an error",
                            status=status.HTTP_400_BAD_REQUEST)
        finally:
            return Response("The user has been deleted from the database",
                            status=status.HTTP_200_OK)


class UpdateUser:
    serializer_class = UserSerializer

    def gest(self, request, format=None):
        return Response("The user hasn't been updated!",
                        status=status.HTTP_400_BAD_REQUEST)

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


class DeleteProduct(APIView):
    serializer_class = ProductSerializer

    def post(self, request, format=None):
            product_name = request.data.get('name')
            product = Product.objects.filter(name=product_name)[0]
            print(product)
            product.delete()
            return Response("The product hasn't been deleted!",
                            status=status.HTTP_200_OK)


class UpdateProduct(APIView):
    serializer_class = ProductSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        print(request.data)

        if not serializer.is_valid():
            name = serializer.data.get('name')
            ingredients = serializer.data.get('ingredients')
            price = serializer.data.get('price')
            category = serializer.data.get('category')
            description = serializer.data.get('description')
            date_created = serializer.data.get('date_created')
            image = serializer.data.get('image')

            Product.objects.update(
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


class GetProductFromOrderProduct(APIView):
    lookup_url_kwarg = 'order_id'
    serializer_class = ProductSerializer

    def get(self, request, format=None):

        order_id = request.GET.get(self.lookup_url_kwarg)
        print(order_id)
        products_queue = Order_Product.objects.filter(order_id=order_id)
        product_list = []
        if products_queue:
            for x in products_queue:
                print(x)
                product_list.append(x.product_id)

        serializer = ProductSerializer(product_list, many=True)
        if product_list:
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response("No products", status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, format=None):

        product = request.data.get('product')
        print(product["customer"])
        customer_id = product["customer"]
        status_2 = product["status"]

        order_queue = Order.objects.filter(customer=customer_id,
                                           status=status_2)
        order = order_queue[0]

        if order.delete():
            return Response("The product has been updated in the database",
                            status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)
