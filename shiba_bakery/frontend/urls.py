from django.urls import path, include
from .views import index

urlpatterns = [
    path('', index),
    path('home', index),
    path('sign-up', index),
    path('login', index),
    path('cart/cart_screen', index),
    path('cart', index),
    path('cart/checkout', index),
    path('newhome', index),
    path('checkout', index),
    path('product/<slug:slug>', index),
    path('adminPage', index),
    path('adminPage/ProductTable', index),
    path('adminPage/addProduct', index),
    path('adminPage/updateProduct', index),
    path('adminPage/UserTable', index),
    path('adminPage/addUser', index),
    path('adminPage/OrderTable', index),
    path('adminPage/addOrder', index),
    path('adminPage/handleOrder', index),
    path('adminPage/updateOrder', index),
]
