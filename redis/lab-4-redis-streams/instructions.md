# Redis Streams Lab Instructions

This guide provides step-by-step instructions to set up the environment and run the processes for the Redis Streams lab.

## 1. Environment Setup

### Starting the Redis Database
First, ensure that your Docker container is running. Navigate to the `solution` directory and start the Redis database using Docker Compose:

```bash
cd solution
docker compose up -d
```

### Setting up the Python Environment
We will use Conda to manage our Python dependencies. Create and activate the provided conda environment:

```bash
conda env create -f environment.yaml
conda activate redis_stream_lab
```

### Initializing the Consumer Group
Before the consumers can start picking up messages, you need to tell Redis to create a Consumer Group (`order_processors`) for your stream (`orders_stream`). This acts as the team coordinator for all your workers.

Run this command once to initialize the stream and group:

```bash
docker exec -it solution-redis_stream_db-1 redis-cli XGROUP CREATE orders_stream order_processors 0 MKSTREAM
```
*(Note: If you have already set this up, Redis might throw an error saying the group already exists, which is safe to ignore).*

---

## 2. Running the Processes

Now that the infrastructure and environments are ready, we can run our Producer-Consumer workflow.

### Start the Consumer (Worker)
Open a terminal window, activate your conda environment, and start the consumer. The consumer `receptor_message.py` has a `while True:` loop, so it will stay alive and wait for new messages continuously.

```bash
conda activate redis_stream_lab
python receptor_message.py
```
*Leave this terminal running. You should see "Starting worker, waiting for messages..."*

### Trigger a Message (Producer)
Open a **second** terminal window, activate the conda environment, and run the producer script. This script will publish a new order entry to the stream.

```bash
conda activate redis_stream_lab
python trigger_message.py
```

Go back and check the terminal where your consumer is running! You should instantly see output indicating it received the message and processed it.

### Verifying Pending Entries (Optional)
If a worker crashes *after* reading a message but *before* acknowledging it (calling `XACK`), the message goes into a Pending Entries List (PEL). You can check if any messages are "stuck" by running:

```bash
./verify_pending_entries.sh
```

---

## 3. Conclusion: Redis Streams vs. RabbitMQ

When designing high-throughput messaging pipelines, developers often compare Redis Streams to traditional brokers like RabbitMQ or standard Redis Pub/Sub. Here is why Redis Streams is frequently the superior choice:

1. **Simplicity and Reduced Stack:** If your application already uses Redis for caching or rate-limiting, you don't need to deploy, secure, and maintain a separate RabbitMQ cluster just for queuing. Redis Streams handles the job effortlessly inside your existing database.
2. **Built-in History (Replayability):** Unlike RabbitMQ or Redis Pub/Sub (where messages are largely ephemeral or fire-and-forget once routed), Redis Streams keep a persistent history of messages. If a new analytics service is deployed later, it can "replay" old messages from the very beginning. You can cap this memory growth using `MAXLEN`.
3. **Consumer Sovereignty:** Through Consumer Groups, multiple microservices (e.g., a Shipping worker and a Billing worker) can read from the exact same stream at completely different speeds. Redis Tracks where each group left off independently.
4. **Memory Efficiency & Speed:** Because it's an in-memory datastore using specialized Radix trees for streams, it comes with minimal latency and high compression, allowing massive throughput out-of-the-box.

## 4. Key Technical Takeaways

- **Idle Timeout**: In production, you should periodically check the PEL for messages that have been pending for too long (using `XPENDING` and `XCLAIM`) and re-process them.
- **Max Length**: Use `XADD orders_stream MAXLEN ~1000 ...` to keep your stream from growing infinitely and consuming all your RAM.