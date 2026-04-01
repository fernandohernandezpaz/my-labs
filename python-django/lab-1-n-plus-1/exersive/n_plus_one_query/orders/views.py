from django.shortcuts import render
from django.http import HttpResponse
from django.db.models import Prefetch
from django.contrib.auth import get_user_model

from .models import Orders

UserModel = get_user_model()

# Create your views here.

def order_list(request) -> HttpResponse:
    orders = Orders.objects.all()
    
    return render(request, 'orders_list.html', {'orders': orders})

def order_list_optimized(request) -> HttpResponse:

    # optimize query
    # orders = Orders.objects.prefetch_related('customer').all()

    # deep optimize query with necessary fields
    users = UserModel.objects.only('username')
    orders = Orders.objects. \
        prefetch_related(
            Prefetch('customer', queryset=users)
        ). \
        all()
    
    return render(request, 'orders_list.html', {'orders': orders})
