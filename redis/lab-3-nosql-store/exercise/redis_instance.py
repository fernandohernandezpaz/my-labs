from typing import Awaitable, Dict, Set, Union
from redis import Redis

__HOST__ = 'localhost'
__PORT__ = 6379
__DB__ = 0


class RedisInstance:
	def __init__(self):
		self.redis = Redis(host=__HOST__, port=__PORT__, db=__DB__, decode_responses=True)

	def get_redis(self) -> Redis:
		return self.redis

	def get_items_by(self, key: str) -> Union[Awaitable[Set], Set]:
		return self.redis.smembers(key)

	def get_hash_data(self, key: str) -> Union[Awaitable[Dict], Dict]:
		return self.redis.hgetall(key)

	def set_hash_data(self, key: str, value: dict) -> None:
		self.redis.hset(key, mapping=value)

	def set_secondary_index(self, key: str, value: str) -> None:
		self.redis.sadd(key, value)
