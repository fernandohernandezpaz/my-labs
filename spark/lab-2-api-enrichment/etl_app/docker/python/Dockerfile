FROM python:3.12-slim

# Install OpenJDK 11 (Required for Spark)
RUN apt-get update && \
    apt-get install -y openjdk-21-jre-headless && \
    apt-get clean && \
    pip install --upgrade pip;

# Set JAVA_HOME
ENV JAVA_HOME=/usr/lib/jvm/java-21-openjdk-arm64

# COPY AND INSTALL REQUIREMENTS
COPY requirements.txt .
RUN pip install -r requirements.txt

WORKDIR /app

# Keep the container running so you can execute scripts
CMD ["tail", "-f", "/dev/null"]
