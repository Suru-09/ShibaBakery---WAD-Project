from django.urls import path
from .views import SignUpView, LoginView, ProductView, OrderView, DeleteProduct, DeleteUser, UpdateProduct, \
    GetProductFromOrderProduct
from .views import GetProductAfterID, GetUserAfterId, GetUserAfterUsername

urlpatterns = [
    path('sign-up', SignUpView.as_view()),
    path('login', LoginView.as_view()),
    path('add-product', ProductView.as_view()),
    path('get-product', ProductView.as_view()),
    path('update-product', UpdateProduct.as_view()),
    path('delete-product', DeleteProduct.as_view()),
    path('add-order', OrderView.as_view()),
    path('get-order', OrderView.as_view()),
    path('get-order-products', GetProductFromOrderProduct.as_view()),
    path('get-product-by-id', GetProductAfterID.as_view()),
    path('get-user-by-id', GetUserAfterId.as_view()),
    path('delete-user', DeleteUser.as_view()),
    path('get-user-by-username', GetUserAfterUsername.as_view()),
]