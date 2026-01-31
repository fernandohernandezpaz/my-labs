import time  # For simulating delays
import uuid  # For generating unique identifiers
import sys   # For command-line arguments
from redis_instance import redis_instance as r  # Prefabricated Redis connection
from product import PRODUCT_KEY  # String template for the product key

# Atomic Lua script: only deletes the lock if it matches our unique ID
LUA_RELEASE_SCRIPT = """
if redis.call("get", KEYS[1]) == ARGV[1] then
    return redis.call('del', KEYS[1])
else
    return 0
end
"""


def buy_product(worker_id: int) -> None:
    product_id = 1  # Target product
    lock_key = f"lock:product:{product_id}"  # The specific lock key in Redis
    product_key = PRODUCT_KEY.format(id=product_id)  # The specific stock key in Redis
    my_id = str(uuid.uuid4())  # Generate a unique owner ID for this lock attempt

    # Attempt to acquire lock: Set if Not Exist (nx) with 5s TTL (px)
    if r.set(lock_key, my_id, nx=True, px=5000):
        try:
            # Inside the lock: safe to read and write
            stock = int(r.get(product_key))
            if stock > 0:
                time.sleep(1)  # Simulate processing time/Race Condition window
                r.set(product_key, stock - 1)  # Update stock
                print(f"Worker {worker_id} SECURED the item.")
                return
            print(f"Worker {worker_id} confirmed OUT OF STOCK.")
        finally:
            # Release: Always run this to unlock, even if the above code fails
            r.eval(LUA_RELEASE_SCRIPT, 1, lock_key, my_id)
            return
    # If the 'if' fails, the lock was already taken
    print(f"Worker {worker_id} could not get lock. System busy.")


if __name__ == "__main__":
    # Use the first command-line argument as the worker name
    buy_product(sys.argv[1])
