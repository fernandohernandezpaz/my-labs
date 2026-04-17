import json
import random
import os
import pandas as pd
from datetime import datetime, timedelta


def generate_logs(
	num_entries: int = 50_000, output_file: str = 'raw_logs.json'
) -> None:
	services = [
		'gateway',
		'aut-services',
		'payment-service',
		'invetory-service',
	]
	status_codes = [200, 201, 400, 400, 404, 500, 503]

	start_time = datetime.now() - timedelta(hours=1)

	file_path = os.path.join('logs', output_file)
	data = []

	with open(file_path, 'w') as f:
		for i in range(num_entries):
			current_time = start_time + timedelta(
				seconds=i * (3600 / num_entries)
			)

			elapsed_mins = (current_time - start_time).seconds // 60

			service = random.choice(services)
			status = random.choices(
				status_codes, weights=[80, 5, 2, 5, 5, 3, 1]
			)[0]

			if 30 <= elapsed_mins <= 45:
				if service == 'payment-service':
					status = 500
					latency = random.randint(2_000, 5_000)
				else:
					latency = random.randint(50, 200)
			else:
				latency = random.randint(10, 300)
			log_entry = {
				'timestamp': current_time.isoformat(),
				'service': service,
				'status': status,
				'response_time_ms': latency,
				'path': random.choice(['/login', '/checkout', '/cart']),
				'ip': f'192.168.1.{random.randint(1, 255)}',
			}
			data.append(log_entry)
			f.write(json.dumps(log_entry) + '\n')

	df = pd.DataFrame(data)
	df.to_excel(os.path.join('logs', 'raw_logs.xlsx'), index=False)


if __name__ == '__main__':
	generate_logs()
	print('Data generated in raw_logs.json')
