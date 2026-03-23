import asyncio
import aiohttp
import time

from aiohttp import ClientSession


async def fetch_pokemon_async(session: ClientSession, pokemon_id: str) -> str:
    url = f'https://pokeapi.co/api/v2/pokemon/{pokemon_id}'
    print(f"Starting to fetch Pokémon #{pokemon_id}")

    async with session.get(url) as response:
        data = await response.json()
        name = data.get('name', 'unknown').capitalize()
        print(f"Finished fetching: {name} (Id: {pokemon_id})")
        return name

async def main_sync() -> None:
    pokemon_ids= range(1, 152)
    start_time = time.time()
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_pokemon_async(session, pid) for pid in pokemon_ids]
        _ = await asyncio.gather(*tasks)    
    end_time = time.time()
    time_taken = end_time - start_time;
    print(f"\n [ASYNC] Total time taken: {time_taken:.2f}")

if __name__ == "__main__":
    asyncio.run(main_sync())
