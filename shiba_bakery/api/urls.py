from django.urls import path
from .views import SignUpView, LoginView, AddProduct

urlpatterns = [
    path('sign-up', SignUpView.as_view()),
    path('login', LoginView.as_view()),
    path('add-product', AddProduct.as_view()),
]