from django.db import models
from django.contrib.auth.models import User


class Product(models.Model):
    name = models.CharField(max_length=200, null=False)
    ingredients = models.CharField(max_length=200, null=True)
    price = models.CharField(max_length=200, null=True)
    category = models.CharField(max_length=200, null=True)
    description = models.CharField(max_length=200, null=True)
    date_created = models.DateTimeField(auto_now_add=True, null=True)
    image = models.ImageField(null=True, blank=True, upload_to="images/")
    stock_count = models.IntegerField(null=False, default=0)


class Order(models.Model):
    STATUS = (
        ('0', 'Pending'),
        ('1', 'Accepted'),
        ('2', 'Declined'),
        ('3', 'Delivered'),
        ('4', 'Cancelled')
    )
    date_created = models.DateTimeField(auto_now_add=True, null=False)
    customer = models.ForeignKey(User, null=False, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, null=False, on_delete=models.CASCADE)
    status = models.CharField(max_length=200, null=False, choices=STATUS)


class Order_Product(models.Model):
    order_id = models.ForeignKey(Order, null=True, on_delete=models.CASCADE, db_column='order_id')
    product_id = models.ForeignKey(Product, null=True, on_delete=models.CASCADE, db_column='product_id')

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['order_id', 'product_id'], name='order_product_id')
        ]
