# Instructions: Testing Topic Wildcards

This lab demonstrates how RabbitMQ routes messages using wildcards (`*` and `#`) in a **Topic Exchange**.

---

### Step 1: Start the RabbitMQ Service
Ensure you have Docker running, then navigate to the `exercise` folder and start the service:

```bash
cd exercise
docker compose up -d
```

---

### Step 2: Open Multiple Terminals
To see the routing in real-time, you should open **4 separate terminals**.

#### Terminal 1: The Researcher (Omnipresent)
This consumer listens to `#` (everything).
```bash
python consumer_omnipresent.py
```

#### Terminal 2: The Dog Expert
This consumer listens to `canine.*.*` (exactly 3 words starting with canine).
```bash
python dog_consumer.py
```

#### Terminal 3: The Activity Tracker
This consumer listens to `*.track.#` (any species with the second word being 'track').
```bash
python tracker_consumer.py
```

---

### Step 3: Trigger the Messages
In your **4th terminal**, run the producer to send all animal logs:

```bash
python animal_producer.py
```

---

### Step 4: Expected Results

Here is the "Routing Matrix" of what each terminal should receive:

| Routing Key | Researcher (`#`) | Dog Expert (`canine.*.*`) | Activity Tracker (`*.track.#`) |
| :--- | :---: | :---: | :---: |
| `canine.bark.loud` | ✅ | ✅ | ❌ |
| `canine.track.active` | ✅ | ✅ | ✅ |
| `feline.track.silent` | ✅ | ❌ | ✅ |
| `feline.sleep.long` | ✅ | ❌ | ❌ |
| `all_animal.track.short.time` | ✅ | ❌ | ✅ |

### Key Takeaways
1.  **Researcher**: Since it uses `#`, it acts as a "Catch-All" and receives every single message.
2.  **Dog Expert**: It only catches `canine.bark.loud` and `canine.track.active` because they consist of exactly 3 words. If you sent `canine.bark`, this consumer would ignore it.
3.  **Activity Tracker**: It catches anything that has `track` in the second position. Notice how it catches `all_animal.track.short.time` because `#` matches zero or more words (in this case, `short.time`).
