import random
from mysql.connector import connect
from datetime import datetime, timedelta

# Database connection parameters
DB_PARAMS = {
    "database": "optimization_lab",
    "user": "user",
    "password": "password",
    "host": "localhost",
    "port": "3306"
}

def populate():
    try:
        conn = connect(**DB_PARAMS)
        cur = conn.cursor()

        # Create the initial table without any indexes (except ID)
        print("🔨 Setting up table...")
        cur.execute("DROP TABLE IF EXISTS orders;")
        cur.execute("""
            CREATE TABLE orders (
                id SERIAL PRIMARY KEY,
                user_id INT,
                status VARCHAR(20),
                content TEXT,
                created_at TIMESTAMP
            );
        """)

        print("🚀 Generating 500,000 rows. This might take a minute...")
        statuses = ['completed', 'pending', 'cancelled', 'refunded']
        
        # Using execute_batch or large multi-row inserts for speed
        batch_size = 10_000
        total_rows = 500_000
        
        for i in range(0, total_rows, batch_size):
            rows = []
            for _ in range(batch_size):
                user_id = random.randint(1, 1000)
                status = random.choice(statuses)
                # Random date in the last 2 years
                date = datetime.now() - timedelta(days=random.randint(0, 730))
                content = f"Order content for user {user_id} with status {status}"
                rows.append((user_id, status, content, date))
            
            # 🔨 Efficient multi-row insert for MySQL
            insert_query = "INSERT INTO orders (user_id, status, content, created_at) VALUES (%s, %s, %s, %s)"
            cur.executemany(insert_query, rows)
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
