from enum import StrEnum


class CacheKey(StrEnum):
	USER = 'user:{user_id}'
	LEVEL = 'level:{level}:users'
	TEAM = 'team:{team}:users'
