import csv
import json
import random
import requests
from os import getenv
from datetime import datetime
from os.path import join
from pathlib import Path
from currency_enum import Currency

today = datetime.now()
current_dir = Path(__file__).parent.resolve()
data_folder = 'data'

products = ['Monitor', 'Keyboard', 'Mouse']
cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix']


def create_sales_csv():
	print('Creating sales CSV...')
	print('')
	print('')
	print('')
	file = join(current_dir, data_folder, 'sales.csv')
	print('Opening file: ' + file)
	with open(file, 'w', newline='') as f:
		columns = ['txn_id', 'timestamp', 'product', 'amount_usd', 'city']
		writer = csv.writer(f)
		writer.writerow(columns)
		for i in range(1_000):
			writer.writerow(
				[
					f'txn_{i}',
					today.isoformat(),
					random.choice(products),
					random.randint(100, 500),
					random.choice(cities),
				]
			)
		print('')
		print('')
		print('')
	print('File created successfully')


def create_rate_json():
	print('Creating rate JSON...')
	print('')
	print('')
	print('')
	print('Calling RapidAPI of currency conversion and exchange rates...')
	url = getenv('API_URL')
	base = Currency.USD
	today_date = today.date().isoformat()
	querystring = {
		'start_date': today_date,
		'end_date': today_date,
		'base': base.value,
		'symbols': ','.join([c.value for c in Currency if c != base]),
	}
	response = requests.get(
		url,
		params=querystring,
		headers={
			'X-RapidAPI-Key': getenv('API_KEY'),
			'X-RapidAPI-Host': getenv('API_HOST'),
			'Content-Type': 'application/json',
		},
	)
	print('Call to RapidAPI completed')
	print('')
	print('')
	print('')
	if response.status_code != 200:
		raise Exception(
			f'Error al obtener las tasas de cambio: {response.status_code}'
		)
	print('Call to RapidAPI completed successfully')
	print('')
	data = response.json()
	rates = {
		'base': base.value,
		'rates': {},
	}
	response_rates = data['rates']
	currencies = response_rates[today_date]
	for currency, value in currencies.items():
		rates['rates'][currency] = value
	file = join(current_dir, data_folder, 'rates.json')
	print('Opening file ' + file)
	with open(file, 'w') as f:
		json.dump(rates, f)
	print('File created successfully')


if __name__ == '__main__':
	create_sales_csv()
	create_rate_json()
