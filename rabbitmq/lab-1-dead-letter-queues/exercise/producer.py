import pika  # Core library for RabbitMQ communication
import json  # Used to transform our Python dict into a string for the network
from typing import Dict, Any  # Type hinting for structured data
from pika import BlockingConnection  # Type hint for the physical connection
from pika.adapters.blocking_connection import (
	BlockingChannel,
)  # Type hint for the virtual channel

# Establish a physical network link to the local RabbitMQ service
connection: BlockingConnection = pika.BlockingConnection(
	pika.ConnectionParameters('localhost')
)

# Open a virtual communication channel to send specific commands
channel: BlockingChannel = connection.channel()

# 💡 Typified message structure - Our actual payload
message: Dict[str, str] = {
	'email': 'herñandez@test.com',
	'body': 'Hellow, System design!',
}

# The actual "Send" command
channel.basic_publish(
	exchange='',  # Go through the default exchange
	routing_key='main_email_queues',  # Address the message to this specific mailbox (updated to match consumer)
	body=json.dumps(
		message
	),  # Convert our data into a tiny JSON string for transport
)

print(' [x] Sent message to main queue')

# Close the door and clean up resources
connection.close()
