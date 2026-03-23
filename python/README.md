# Python: Concurrency & Async Mastery

Python is traditionally synchronous and single-threaded. However, for networking tasks (I/O bound), it provides powerful tools to handle hundreds of tasks simultaneously without slowing down.

## 核心概念 (Core Concepts)

- **Synchronous**: Tasks are executed one after another. If one task is slow, everything waits.
- **Asynchronous**: Tasks "pause" while waiting (e.g., for a website to reply) and let other tasks run in the meantime.
- **`asyncio`**: The standard library for writing single-threaded concurrent code using coroutines.
- **`await`**: A keyword that tells the program: "Pause here until this task is finished, but go do other work while you wait."
- **Event Loop**: The engine that manages and distributes the execution of different tasks.

## Why use Async in Python?

1. **Massive Speedup**: Instead of waiting for one API call to finish before starting the next, you start all of them at once.
2. **Efficiency**: Uses much less memory than opening a new "Thread" for every task.
3. **Scalability**: Allows a single Python process to handle thousands of concurrent connections (like in FastAPI).
