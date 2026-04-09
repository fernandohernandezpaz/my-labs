#!/bin/bash


docker exec -it solution-redis_stream_db-1 redis-cli XPENDING orders_stream order_processors