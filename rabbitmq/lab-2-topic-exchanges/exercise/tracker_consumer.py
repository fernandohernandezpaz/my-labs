import json
from time import sleep
from pika import BlockingConnection, ConnectionParameters
from pika.adapters.blocking_connection import BlockingChannel
from pika.spec import Basic, BasicProperties

connection: BlockingConnection = BlockingConnection(
	ConnectionParameters(host='localhost')
)

channel: BlockingChannel = connection.channel()

channel.exchange_declare(exchange='animal_topic_logs', exchange_type='topic')

result = channel.queue_declare(queue='', exclusive=True)
queue_name = result.method.queue

channel.queue_bind(
	exchange='animal_topic_logs', queue=queue_name, routing_key='*.track.#'
)

print(
	' [*] Activity Tracker connected. Waiting for tracking logs. To exit press CTRL+C'
)


def callback(
	ch: BlockingChannel,
	method: Basic.Deliver,
	properties: BasicProperties,
	body: bytes,
) -> None:
	print(f' [TRACKER] Received {method.routing_key}:')
	print(json.loads(body))
	sleep(1)


channel.basic_consume(
	queue=queue_name, on_message_callback=callback, auto_ack=True
)

channel.start_consuming()
