#!/bin/bash


docker exec -it solution-redis_stream_db-1 redis-cli XGROUP CREATE orders_stream order_processors 0 MKSTREAM