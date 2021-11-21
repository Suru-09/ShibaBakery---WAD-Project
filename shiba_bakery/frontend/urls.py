from django.urls import path, include
from .views import index

urlpatterns = [
    path('', index),
    path('home', index),
    path('sign-up', index),
    path('login', index),
    path('cart_screen', index),
    path('product/<slug:slug>', index),
    path('adminPage', index),
]
