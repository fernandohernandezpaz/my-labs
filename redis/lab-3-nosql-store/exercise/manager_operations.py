from datetime import date

from redis_instance import RedisInstance
from utils.types.user import User
from utils.enums.cache_keys import CacheKey

redis_instance = RedisInstance()


def create_user(user_id: str, name: str, level: int, team: str) -> None:
	user_key = CacheKey.USER.value.format(user_id=user_id)
	user_data = User(
		name=name, level=level, team=team, last_login=date.today().isoformat()
	)

	redis_instance.set_hash_data(user_key, user_data.dict())

	redis_instance.set_secondary_index(
		CacheKey.LEVEL.value.format(level=level), user_id
	)
	redis_instance.set_secondary_index(
		CacheKey.TEAM.value.format(team=team), user_id
	)
	print(f'User {name} created and indexed successfully.')


def get_users_by_level(level: int):
	level_key = CacheKey.LEVEL.value.format(level=level)
	user_ids = redis_instance.get_items_by(level_key)
	profiles = []
	for uid in user_ids:
		user_key = CacheKey.USER.value.format(user_id=uid)
		profiles.append(redis_instance.get_hash_data(user_key))
	return profiles


def change_user_level(user_id:str, old_level: int, new_level: int):
	user_key = CacheKey.USER.value.format(user_id=user_id)
	# 1. update the document
	redis_instance.set_hash_data(user_key, {'level': new_level})

	# 2. update the index(Atomic migration)
	old_level_key = CacheKey.LEVEL.value.format(level=old_level)
	new_level_key = CacheKey.LEVEL.value.format(level=new_level)

	# Use the public method to get the raw client for pipelining
	pipe = redis_instance.get_redis().pipeline()
	pipe.srem(old_level_key, user_id)
	pipe.sadd(new_level_key, user_id)
	pipe.execute()
	print(f'User {user_id} level changed from {old_level} to {new_level} successfully.')


if __name__ == '__main__':
	LEVEL_1 = 1
	LEVEL_2 = 2
	LEVEL_3 = 3
	create_user(101, 'John Doe', LEVEL_1, 'Team A')
	create_user(102, 'Jane Doe', LEVEL_2, 'Team B')
	create_user(103, 'Bob Smith', LEVEL_3, 'Team C')

	levels = [LEVEL_1, LEVEL_2, LEVEL_3]

	for level in levels:
		print(f'Users in level {level}:')
		print(get_users_by_level(level))

	change_user_level(101, LEVEL_1, LEVEL_2)

	for level in levels:
		print(f'Users in level {level}:')
		print(get_users_by_level(level))
