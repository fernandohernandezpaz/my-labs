from django.urls import path
from .views import order_list, order_list_optimized


app_name = 'orders'

urlpatterns = [
    path('', order_list, name='order_list'),
    path('optimized', order_list_optimized, name='order_list_optimized'),
]