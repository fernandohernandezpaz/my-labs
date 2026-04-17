from os import getenv
from os.path import join
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, lit
from pathlib import Path
from currency_enum import Currency

current_dir = Path(__file__).parent.resolve()
data_folder = join(current_dir, 'data')

master_url = getenv('SPARK_MASTER_URL', 'local[*]')

spark = (
	SparkSession.builder.appName('GlobalRevenueETL')
	.master(master_url)
	.getOrCreate()
)

# Extraction
df_sales = spark.read.csv(
	join(data_folder, 'sales.csv'), header=True, inferSchema=True
)

df_rates = spark.read.json(join(data_folder, 'rates.json'))

# Transformation
rates_row = df_rates.select('rates.*').first()
eur_rate = rates_row[Currency.EUR.value]
gbp_rate = rates_row[Currency.GBP.value]

df_enriched = df_sales.withColumn(
	'amount_eur', col('amount_usd') * lit(eur_rate)
).withColumn('amount_gbp', col('amount_usd') * lit(gbp_rate))

# Aggregation
report = (
	df_enriched.groupBy('city', 'product')
	.agg({'amount_usd': 'sum', 'amount_eur': 'sum'})
	.withColumnRenamed('sum(amount_usd)', 'total_usd')
	.sort('city', 'product')
)

report.show()

# Load
df_enriched.write.mode('overwrite').parquet(join(data_folder, 'enriched_sales'))
