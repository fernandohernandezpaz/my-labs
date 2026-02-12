import psycopg2
import random
from datetime import datetime, timedelta
from lorem_text import lorem

# Database connection parameters
DB_PARAMS = {
    "dbname": "partitioning_lab",
    "user": "user",
    "password": "password",
    "host": "localhost",
    "port": "5432"
}

def populate():
    try:
        conn = psycopg2.connect(**DB_PARAMS)
        cur = conn.cursor()

        # Create the initial table without any indexes (except ID)
        print("🔨 Setting up table...")
        cur.execute("DROP TABLE IF EXISTS logs;")
        cur.execute("""
            CREATE TABLE logs (
                id SERIAL,
                log_data TEXT,
                created_at TIMESTAMP NOT NULL
            ) PARTITION BY RANGE (created_at);
        """)

        cur.execute("DROP TABLE IF EXISTS logs_2024;")
        cur.execute("""
            CREATE TABLE logs_2024 PARTITION OF logs
                FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');
        """)

        cur.execute("DROP TABLE IF EXISTS logs_2025;")
        cur.execute("""
            CREATE TABLE logs_2025 PARTITION OF logs
                FOR VALUES FROM ('2025-01-01') TO ('2026-01-01');
        """)

        cur.execute('DROP TABLE IF EXISTS logs_2026;')
        cur.execute("""
            CREATE TABLE logs_2026 PARTITION OF logs
                FOR VALUES FROM ('2026-01-01') TO ('2027-01-01');
        """)

        print("🚀 Generating 500,000 rows. This might take a minute...")
        
        # Using execute_batch or large multi-row inserts for speed
        batch_size = 10_000
        total_rows = 500_000
        
        for i in range(0, total_rows, batch_size):
            rows = []
            for _ in range(batch_size):
                log_data = lorem.paragraphs(5)
                # Random date in the last 2 years
                date = datetime.now() - timedelta(days=random.randint(0, 730))
                rows.append((log_data, date))
            
            args_str = ','.join(cur.mogrify("(%s,%s)", x).decode('utf-8') for x in rows)
            cur.execute("INSERT INTO logs (log_data, created_at) VALUES " + args_str)
            conn.commit()
            print(f"Progress: {i + batch_size}/{total_rows}")

        print("✅ Success! Database is now slow enough for optimization.")
        cur.close()
        conn.close()

    except Exception as e:
        print(f"❌ Error: {e}")
        print("\nMake sure your Docker container is running: 'docker compose up -d'")

if __name__ == "__main__":
    populate()
