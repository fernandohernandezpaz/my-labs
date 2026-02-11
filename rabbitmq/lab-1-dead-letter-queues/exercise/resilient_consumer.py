import pika
import json
from time import sleep
from typing import Dict, Any
from pika import BlockingConnection, ConnectionParameters
from pika.adapters.blocking_connection import BlockingChannel
from pika.spec import Basic, BasicProperties

# 1. Establish the physical network link to the local RabbitMQ service
connection: BlockingConnection = BlockingConnection(
	ConnectionParameters(host='localhost')
)

# 2. Open a virtual communication channel for sending commands/requests
channel: BlockingChannel = connection.channel()

# 3. Create a 'sorting office' for rejected mail (The Dead Letter Exchange)
channel.exchange_declare(exchange='dlx_exchange', exchange_type='direct')

# 4. Build a physical shelf where rejected mail will sit (The Dead Letter Queue)
channel.queue_declare(queue='dead_letter_queue')

# 5. Connect the sorting office to the shelf using the label 'fail'
channel.queue_bind(
	exchange='dlx_exchange', queue='dead_letter_queue', routing_key='fail'
)

# 6. Define the 'Emergency Instructions' for our main mailbox
args: Dict[str, str] = {
	'x-dead-letter-exchange': 'dlx_exchange',  # If rejected, send to this specific office
	'x-dead-letter-routing-key': 'fail',  # Use this label so the DLX knows which shelf to use
}

# 7. Create our primary mailbox and apply the emergency instructions to it
channel.queue_declare(queue='main_email_queues', arguments=args)


# 8. This is the 'Instruction Manual' for our worker whenever mail arrives
def callback(
	ch: BlockingChannel,  # The channel used for the communication
	method: Basic.Deliver,  # The delivery metadata (contains the delivery tag)
	properties: BasicProperties,  # The properties of the message (metadata)
	body: bytes,  # The actual message content in raw bytes (from the network)
) -> None:
	print(' [x] Received payload')

	# Parse the raw bytes back into a readable Python dictionary
	# 💡 Parse the JSON body safely
	data: Dict[str, Any] = json.loads(body)

	print(data)

	# Simulate the time it takes to process the task (e.g., sending an email)
	sleep(5)

	print(' [!] Detected failure. Rejecting to DLX...')

	# 🚨 This is the critical rejection command
	ch.basic_reject(
		delivery_tag=method.delivery_tag,  # Specify WHICH exact message we are rejecting
		requeue=False,  # VERY IMPORTANT: Tells RabbitMQ NOT to put it back in this queue, which triggers the DLX flow
	)


# 9. Link the worker to our primary mailbox
channel.basic_consume(queue='main_email_queues', on_message_callback=callback)

print('Waiting for message. To exist press CTRL+C')

# 10. Turn on the motor and keep the program running to catch incoming messages
channel.start_consuming()
