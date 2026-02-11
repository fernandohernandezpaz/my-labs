from json import dumps
from typing import Dict
from pika import BlockingConnection, ConnectionParameters
from pika.adapters.blocking_connection import BlockingChannel
from utils.enums.message_types_enum import MessageTypesEnum


connection: BlockingChannel = BlockingConnection(
	ConnectionParameters('localhost')
)

channel: BlockingChannel = connection.channel()

channel.exchange_declare(exchange='animal_topic_logs', exchange_type='topic')

messages: Dict[str, str] = {
	MessageTypesEnum.CANINE_BARK_LOUD.value: 'A golden retriever is barking loudly.',
	MessageTypesEnum.CANINE_TRACK_ACTIVE.value: 'A wolf is being tracked in the north.',
	MessageTypesEnum.FELINE_TRACK_SILENT.value: 'A black panther is moving silently.',
	MessageTypesEnum.FELINE_SLEEP_LONG.value: 'A house cat is sleeping.',
	MessageTypesEnum.ALL_ANIMALS_TRACK_SHORT_TIME.value: 'Hi for a short time.',
}

for routing_key, payload in messages.items():
	channel.basic_publish(
		exchange='animal_topic_logs',
		routing_key=routing_key,
		body=dumps(payload),
	)
	print(f' Sent {routing_key}: {payload}')

connection.close()
