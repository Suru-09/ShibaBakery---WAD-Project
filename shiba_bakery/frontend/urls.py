from django.urls import path, include
from .views import index

urlpatterns = [
    path('', index),
    path('sign-up', index),
    path('log-in', index),
]