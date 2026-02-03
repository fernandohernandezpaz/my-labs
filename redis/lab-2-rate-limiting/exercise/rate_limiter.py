import time
import uuid
from .redis_instance import RedisInstance


class RateLimiter:
	def __init__(self, limit: int, window_seconds: int) -> None:
		self._redis_client = RedisInstance()
		self._limit = limit
		self._window_seconds = window_seconds

	def is_allowed(self, identifier: str) -> bool:
		key = f'rate_limit:{identifier}'
		now = time.time()
		request_id = str(uuid.uuid4())

		# Use Pipeline for atomic execution
		pipe = self._redis_client.get_pipeline()
		# 1. Clean up old request records
		pipe.zremrangebyscore(key, 0, now - self._window_seconds)
		# 2. Add current request
		pipe.zadd(key, {request_id: now})
		# 3. Count requests in current window
		pipe.zcard(key)
		# 4. Refresh TTL
		pipe.expire(key, self._window_seconds + 5)

		results = pipe.execute()

		current_count = results[2]

		return current_count <= self._limit
