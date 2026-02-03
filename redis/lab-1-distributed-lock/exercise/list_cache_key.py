from redis_instance import redis_instance


def list_cache_key() -> None:
    print("Listing all keys in the redis cache")
    keys = redis_instance.scan_iter("*")
    for key in keys:
        print(
            "The key name: {key} containts {value}".format(
                key=key, value=redis_instance.get(key)
            )
        )


if __name__ == "__main__":
    list_cache_key()
