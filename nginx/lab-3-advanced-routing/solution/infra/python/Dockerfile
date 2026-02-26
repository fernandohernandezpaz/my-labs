FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PIP_NO_CACHE_DIR=1
ENV PIP_DISABLE_PIP_VERSION_CHECK=1

RUN apt-get update && \
    apt-get install -y --no-install-recommends && \
    apt-get install -y gcc postgresql-client && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY ./django_app/ /app/

RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt 

RUN mkdir -p staticfiles mediafiles

RUN python manage.py collectstatic --noinput

RUN useradd -m -u 1000 appuser && \
    chown -R appuser:appuser /app 

USER appuser

EXPOSE 8000

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "4",  "great_minds.wsgi:application"]