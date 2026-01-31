from dataclasses import dataclass

PRODUCT_KEY = "product:{id}:stock"


@dataclass
class Product:
    id: int
    quantity: int
