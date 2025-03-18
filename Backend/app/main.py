from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, Any

from app.db.database import db

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Povolí všechny zdroje
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/database")
def get_database_data():
    """Vrátí data z tabulky `articles_p_2025_01`."""
    query = "SELECT * FROM articles_p_2025_01 LIMIT 10;"
    rows = db.fetch_data(query)
    return {"data": rows}
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

