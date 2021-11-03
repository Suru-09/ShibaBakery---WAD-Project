from django.urls import path
from .views import SignUpView, LoginView, ProductView, OrderView, GetProductAfterID

urlpatterns = [
    path('sign-up', SignUpView.as_view()),
    path('login', LoginView.as_view()),
    path('add-product', ProductView.as_view()),
    path('get-product', ProductView.as_view()),
    path('add-order', OrderView.as_view()),
    path('get-order', OrderView.as_view()),
    path('get-product-by-id', GetProductAfterID.as_view()),
]