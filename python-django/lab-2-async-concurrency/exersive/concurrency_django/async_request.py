import asyncio
import aiohttp
import time

MAX_CONCURRENT_REQUESTS = 250


async def fetch_url(session, url, semaphore):
	async with semaphore:
		async with session.get(url) as response:
			return await response.text()


async def main(urls):
	sem = asyncio.Semaphore(MAX_CONCURRENT_REQUESTS)
	async with aiohttp.ClientSession() as session:
		tasks = [fetch_url(session, url, sem) for url in urls]
		return await asyncio.gather(*tasks)


if __name__ == '__main__':
	urls = [f'https://example.com/page/{i}' for i in range(1000)]
	print('Starting call processing')
	start = time.time()
	a = asyncio.run(main(urls))
	print(f'Finished 1000 requests in {time.time() - start:.2f} seconds')
