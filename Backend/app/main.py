from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict

from app.db.database_queries import get_basic_articles, get_detailed_articles_with_sentiments

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/database")
async def get_database_data():
    rows = await get_basic_articles()
    return {"articles": rows}

@app.get("/logs")
async def get_logs():
    rows = await get_detailed_articles_with_sentiments()
    return {"articles": rows}

@app.get("/logs/{article_id}")
async def get_single_log(article_id: int):
    rows = await get_detailed_articles_with_sentiments()
    for article in rows:
        if article["articles_id"] == article_id:
            return {"article": article}
    return {"article": None}

@app.get("/data")
def get_data() -> Dict[str, str]:
    return {"message": "Hello from FastAPI!", "status": "Toto je pecka", "version": "1.0"}

@app.get("/")
def main():
    return {"message": "Hello from FastAPI"}

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            print(f"Received message: {data}")
            await websocket.send_text(f"Message received: {data}")
    except Exception as e:
        print(f"WebSocket error: {e}")
    finally:
        await websocket.close()

