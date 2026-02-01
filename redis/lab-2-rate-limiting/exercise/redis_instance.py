from redis import Redis


REDIS_HOST = 'localhost'
REDIS_PORT = 6379
REDIS_DB = 0


class RedisInstance:
	__client: Redis

	def __init__(self):
		self.__client = Redis(host=REDIS_HOST, port=REDIS_PORT, db=REDIS_DB)

	def set_value(self, key: str, value: str) -> None:
		self.__client.set(key, value)

	def get_value(self, key: str) -> str:
		return self.__client.get(key)

	def delete_value(self, key: str) -> None:
		self.__client.delete(key)

	def get_pipeline(self):
		return self.__client.pipeline()
