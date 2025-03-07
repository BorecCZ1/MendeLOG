from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Povolení CORS pro frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Můžeš nastavit konkrétní doménu místo "*"
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI"}

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        try:
            data = await websocket.receive_text()
            await websocket.send_text(f"Received: {data}")
        except Exception as e:
            print(f"WebSocket disconnected: {e}")
            break
