from django.contrib import admin
from .models import User, Product, Order, Order_Product
# Register your models here.

admin.site.register(User)
admin.site.register(Product)
admin.site.register(Order)
admin.site.register(Order_Product)
