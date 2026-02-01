import requests
import time

APP_URL = 'http://localhost:8000/api/data'

for i in range(10):
	response = requests.get(APP_URL)
	print(f'Request {i}: {response.status_code}')
	time.sleep(0.1)
