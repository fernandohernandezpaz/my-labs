# 🕵️‍♂️ NexusShop Incident Response Analyzer

A professional Big Data forensic tool designed to identify root causes and cascade failures in microservice architectures using **Apache Spark**.

---

## 🆘 The Scenario
NexusShop is experiencing high latency and successful-checkout dropouts. This tool processes gigabytes of raw logs to identify the "Smoking Gun" service and the exact time-window of the failure.

## 🛠️ Prerequisites
Before running the analyzer, ensure you have:
- **Docker & Docker Compose** (Recommended)
- **Conda** (Optional, for local execution)
- **Java 17 (OpenJDK)** (Required for local execution)

---

## 🚀 Getting Started (Choose your path)

### Option A: Docker (Preferred)
This method isolates all dependencies (Java, Spark, Python) into containers.

1.  **Build and Start the services:**
    ```bash
    docker-compose up --build -d
    ```
2.  **Generate Simulation Data:**
    ```bash
    docker-compose exec python-app python make_data.py
    ```
3.  **Run the Forensic Analysis:**
    ```bash
    docker-compose exec python-app python analyzer.py
    ```

### Option B: Local Conda Environment
1.  **Create the environment:**
    ```bash
    conda env create -f environment.yaml
    conda activate spark-analyzer
    ```
2.  **Install Java 17:**
    ```bash
    conda install -c conda-forge openjdk=17
    ```
3.  **Run the scripts:**
    ```bash
    python make_data.py
    python analyzer.py
    ```

---

## 📊 Outputs & Insights
The analyzer generates three key reporting sections:

1.  **Service Health Dashboard:** Identifies the service with the highest `error_rate`.
2.  **Time-Window Distribution:** Pinpoints the 15-minute window where errors peaked.
3.  **Path Correlation:** Identifies which specific API endpoints (e.g., `/checkout`) were failing.

---

## 📁 Project Structure
- `analyzer.py`: Main Spark logic for log processing.
- `make_data.py`: Simulator that generates realistic "broken" JSON logs.
- `docker/`: Contains the environment definition for the Python container.
- `logs/`: Directory where raw and processed logs are stored.
- `environment.yaml`: Local dependency manifest.
- `docker-compose.yml`: Spark Cluster & App definitions.
  
> [!TIP]
> To save your results for the DevOps team:
> `df.write.mode("overwrite").parquet("incident_report.parquet")`
