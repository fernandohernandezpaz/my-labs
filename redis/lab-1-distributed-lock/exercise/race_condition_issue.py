import time
import sys
from redis_instance import redis_instance as r
from product import PRODUCT_KEY


def buy_product(worker_id: int) -> None:
    print("We find the product key to decreate the quantity in stock")
    product_id = 1
    product_key = PRODUCT_KEY.format(id=product_id)
    stock = int(r.get(product_key))
    if stock > 0:
        time.sleep(1)

        r.set(product_key, stock - 1)
        print(
            f"The worker {worker_id} bought the item! New stock: {r.get(product_key)}"
        )
        return
    print(f"Worker {worker_id} found it OUT OF STOCK.")


if __name__ == "__main__":
    """
    To replicate a situation of concurrence,
    you can run on these ways:
    Situation 1:
    run in your terminar `python race_condition_issue.py 11 & python race_condition_issue.py 12`
    Situation 2:
    run in your terminal `for i in {1..5};do python race_condition_issue.py $RANDOM & done; wait`
    """
    buy_product(sys.argv[1])
