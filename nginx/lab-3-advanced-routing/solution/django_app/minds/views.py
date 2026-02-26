from time import sleep
from random import randint
from django.conf import settings
from django.http import JsonResponse


def orders(request):
	list_orders = [
		{
			'id': 1,
			'product': 'Product 1',
			'price': 100,
			'quantity': 1,
			'total': 100,
		}
	]
	# sleep(randint(1, 10))
	return JsonResponse(list_orders, safe=False)
