from typing import List
from product import Product, PRODUCT_KEY
from redis_instance import redis_instance


def populate_products() -> None:
    print("Populating the redis cache with products")
    products: List[Product] = [
        Product(1, 100),
        Product(2, 20),
        Product(3, 3),
    ]
    for product in products:
        redis_instance.set(PRODUCT_KEY.format(id=product.id), product.quantity)


if __name__ == "__main__":
    populate_products()
