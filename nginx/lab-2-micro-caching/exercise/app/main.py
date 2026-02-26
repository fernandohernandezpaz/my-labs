import asyncio
import random
from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse
from datetime import datetime

app = FastAPI()

@app.exception_handler(404)
async def custom_404_handler(request: Request, __):
    return JSONResponse(
        status_code=404,
        content={
            "success": False,
            "message": "The requested endpoint was not found.",
            "path": request.url.path
        },
    )

@app.get("/ticker")
async def get_ticker():
    # Simulate a heavy database query or external API call
    # This is what micro-caching is designed to optimize!
    await asyncio.sleep(2)
    
    return {
        "symbol": "BTC/USD",
        "price": round(random.uniform(40000, 60000), 2),
        "timestamp": datetime.now().isoformat(),
        "source": "Heavy-computation-backend"
    }

@app.get("/health")
async def health():
    return {"status": "ok"}
