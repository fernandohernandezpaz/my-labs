import time
import requests


def fetch_pokemon(pokemon_id: str) -> str:
    url = f'https://pokeapi.co/api/v2/pokemon/{pokemon_id}'
    print(f"Starting to fetch Pokémon #{pokemon_id}")
    response = requests.get(url)

    data = response.json()
    name = data.get('name', 'unknown').capitalize()

    print(f"Finished fetching: {name} (Id: {pokemon_id})")
    return name

def main_sync() -> None:
    pokemon_ids= range(1, 152)
    start_time = time.time()

    for pid in pokemon_ids:
        fetch_pokemon(pid)

    
    end_time = time.time()

    time_taken = end_time - start_time;

    print(f"\n [SYNC] Total time taken: {time_taken:.2f}")

if __name__ == "__main__":
    main_sync()
