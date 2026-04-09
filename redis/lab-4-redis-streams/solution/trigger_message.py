import redis
import json

r = redis.Redis(host='localhost', port=6379, decode_responses=True)

order_data = {
	'order_id': 'ORD-2024-001',
	'amount': 99.0,
}

# Add the order to the stream
r.xadd('orders_stream', order_data)

print(f'Order {order_data["order_id"]} added to the stream.')
