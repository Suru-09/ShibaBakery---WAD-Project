from django.db import models

# Create your models here.

class User(models.Model):
    first_name = models.CharField(max_length=200, null=False)
    last_name = models.CharField(max_length=200, null=False)
    email = models.CharField(max_length=200, null=True)
    date_created = models.DateTimeField(auto_now_add=True, null=False)
    username = models.CharField(max_length=200, null=False)
    password = models.CharField(max_length=200, null=False)
    address = models.CharField(max_length=200, null=False)
    hash_salt = models.CharField(max_length=200, null=True)
    isAdmin = models.BooleanField(default=False)

    def __str__(self):
        return self.first_name + self.last_name


class Product(models.Model):
    name = models.CharField(max_length=200, null=False)
    ingredients = models.CharField(max_length=200, null=True)
    price = models.CharField(max_length=200, null=True)
    category = models.CharField(max_length=200, null=True)
    description = models.CharField(max_length=200, null=True)
    date_created = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return self.name + self.price


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
