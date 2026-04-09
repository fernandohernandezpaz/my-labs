import redis
from time import sleep

r = redis.Redis(host='localhost', port=6379, decode_responses=True)

print("Starting worker, waiting for messages...")
while True:
    try:
        messages = r.xreadgroup(
            groupname='order_processors',
            consumername='worker_1', # Use a unique name for each script instance
            streams={'orders_stream': '>'},# The '>' symbol means "give me new messages that were never delivered to any other consumer"
            count=1,
            block=5000, # Blocks for 5 seconds waiting for new messages
        )

        for stream, events in messages:
            for event_id, data in events:
                print(f'Processing {event_id}: {data}')
                r.xack('orders_stream', 'order_processors', event_id)
                # sleep(1) # Optional: simulate some work
    except KeyboardInterrupt:
        print("Shutting down worker...")
        break