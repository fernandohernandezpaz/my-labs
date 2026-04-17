"""
Incident Response Analyzer: NexusShop Outage
--------------------------------------------
This script uses Apache Spark to perform forensic analysis on microservice logs.
It identifies error patterns, latency spikes, and pinpoint the root cause (Smoking Gun)
during a service failure window.
"""

import os
from pathlib import Path
from pyspark.sql import SparkSession
from pyspark.sql.types import (
	StructType,
	StructField,
	StringType,
	IntegerType,
)
from pyspark.sql.functions import col, window, count, when, avg, to_timestamp

master_url = os.getenv('SPARK_MASTER_URL', 'local[*]')

# 1. Initialize Spark Session
# 'getOrCreate' ensures we don't create multiple contexts in the same JVM.
spark = SparkSession.builder.appName('NexusShopIncidents').master(master_url).getOrCreate()

print(f'Spark Master is running: {spark.sparkContext.master}')

# 2. Define Schema (Production-Grade)
# We define the schema explicitly to avoid the overhead of 'inferSchema'
# and to ensure data quality during ingestion.
schema = StructType(
	[
		StructField('timestamp', StringType(), True),
		StructField('service', StringType(), True),
		StructField('status', IntegerType(), True),
		StructField('response_time_ms', IntegerType(), True),
		StructField('path', StringType(), True),
		StructField('ip', StringType(), True),
	]
)

# 3. Data Ingestion
# Load the JSON logs and convert the string timestamp into a real Spark SQL Timestamp
current_path = Path(__file__).parent.resolve()
log_file = os.path.join(current_path, 'logs', 'raw_logs.json')
print(f'Reading logs from: {log_file}')

df = spark.read.schema(schema).json(log_file)
df = df.withColumn('timestamp', to_timestamp('timestamp'))

# 4. Service Health Metrics (High-Level Dashboard)
# Calculates Total Requests, Average Latency, and Error Rate per service.
# This helps identify which service is "bleeding" (highest error_rate).
service_health = (
	df.groupBy('service')
	.agg(
		count('*').alias('total_reqs'),
		avg('response_time_ms').alias('avg_latency'),
		count(when(col('status') >= 500, True)).alias('errors'),
	)
	.withColumn('error_rate', col('errors') / col('total_reqs'))
)

print('\n--- Service Health Dashboard ---')
service_health.orderBy(col('error_rate').desc()).show()


# 5. Time-Window Analysis (The Timeline)
# Groups logs into 15-minute 'buckets' to observe when the error spike started.
time_analysis = (
	df.filter(col('status') >= 500)
	.groupBy(window(col('timestamp'), '15 minutes'))
	.count()
	.orderBy(col('count').desc())
)

print('\n--- Error distribution by 15-minute window ---')
time_analysis.show(truncate=False)


# 6. Correlation (The Smoking Gun)
# Deep dive into the failing service to find which specific API path was hit.
print('\n--- Root Cause Analysis: Payment Service Paths ---')
smoking_gun = (
	df.filter((col('service') == 'payment-service') & (col('status') >= 500))
	.groupBy('path')
	.count()
)

smoking_gun.show()
