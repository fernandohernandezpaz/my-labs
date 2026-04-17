# Apache Spark: Distributed Big Data Processing 🌌

Apache Spark is a unified analytics engine for large-scale data processing. It provides high-level APIs in Java, Scala, Python, and R, and an optimized engine that supports general execution graphs. It also supports a rich set of higher-level tools including Spark SQL for SQL and structured data processing, MLlib for machine learning, GraphX for graph processing, and Structured Streaming for incremental computation and stream processing.

## 🚀 Key Features

*   **Speed**: Run workloads 100x faster than Hadoop MapReduce by processing data in-memory.
*   **Ease of Use**: Write applications quickly in Java, Scala, Python, R, and SQL.
*   **Generality**: Combine SQL, streaming, and complex analytics.
*   **Runs Everywhere**: Spark runs on Hadoop, Apache Mesos, Kubernetes, standalone, or in the cloud. It can access diverse data sources.

## 🏗️ Core Architecture (The Big Picture)

Spark uses a master/worker architecture. There is a driver that communicates with a single coordinator (master) that manages workers in which executors run.

- **Driver Program**: The process running the `main()` function of the application and creating the `SparkContext`.
- **Cluster Manager**: An external service for acquiring resources on the cluster (e.g., standalone manager, Mesos, YARN, Kubernetes).
- **Worker Node**: Any node that can run application code in the cluster.
- **Executor**: A process launched for an application on a worker node, that runs tasks and keeps data in memory or on disk storage across them.
- **Task**: A unit of work that will be sent to one executor.

## 🛠️ Main Components

1.  **Spark Core**: The foundation of the whole project; provides distributed task scheduling, scheduling, and basic I/O functionalities.
2.  **Spark SQL**: A module for working with structured data. It allows you to query structured data inside Spark programs, using either SQL or a familiar DataFrame API.
3.  **Spark Streaming**: Enables scalable, high-throughput, fault-tolerant stream processing of live data streams.
4.  **MLlib**: A scalable machine learning library consisting of common learning algorithms and utilities.
5.  **GraphX**: API for graphs and graph-parallel computation.

---

## 🧪 Labs in this Series

1.  **[Lab 1: Distributed Log Processing](./lab-1-log-processing)**: Learn how to process massive log files to extract insights using Spark DataFrames and SQL.
