import os
from flask import Flask
from datetime import date

app = Flask(__name__)

APP_PORT = int(os.getenv('APP_PORT', '3000'))
DEBUG_STR = os.getenv('DEBUG', 'False').lower()
DEBUG = DEBUG_STR in ['true','1']

app.config['DEBUG'] = DEBUG
app.config['APP_TITLE'] = os.getenv('APP_TITLE', 'None')

@app.route('/')
def index():
    return {'app_title': app.config.get('APP_TITLE')}, 200

@app.route('/health')
def health():
    return {'status': 'healthy',}, 200

@app.route('/current-time')
def current_time():
    return {'current_time': date.today().isoformat()}, 200

if __name__ == '__main__':
    print(f"Debug Mode: {DEBUG}")
    print(f"App title: {app.config.get('APP_TITLE')}")
    app.run(host='0.0.0.0', port=APP_PORT, debug=DEBUG)