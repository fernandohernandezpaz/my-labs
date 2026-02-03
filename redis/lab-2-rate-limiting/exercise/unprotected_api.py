"""
to keep alive the api in a web service, we should run the next command:

`uvicorn exercise.unprotected_api:app --reload`

"""

from fastapi import FastAPI, Request, HTTPException

app = FastAPI()


@app.get('/api/data')
async def get_data(request: Request):
	client_id = request.client.host
	return {'data': 'Secure and unsecure content'}
