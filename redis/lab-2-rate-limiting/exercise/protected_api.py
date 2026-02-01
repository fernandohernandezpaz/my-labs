"""
to keep alive the api in a web service, we should run the next command:

`uvicorn exercise.protected_api:app --reload`

"""

from fastapi import FastAPI, Request, HTTPException
from .rate_limiter import RateLimiter

app = FastAPI()
SECONDS_WAITING = 10

# Configuration of rae limiter
limiter = RateLimiter(limit=5, window_seconds=SECONDS_WAITING)


@app.get('/api/data')
async def get_data(request: Request):
	client_id = request.client.host
	if not limiter.is_allowed(client_id):
		raise HTTPException(
			status_code=429,
			detail=f'Rate limit exceeded. Please wait {SECONDS_WAITING}',
			headers={'Retry-After': str(SECONDS_WAITING)},
		)

	return {'data': 'Secure and unsecure content'}
