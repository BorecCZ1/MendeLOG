const ws = new WebSocket("ws://localhost:8000/ws"); // Připojení na backend

ws.onopen = () => {
    console.log("Connected to WebSocket server");
    ws.send("Hello from frontend!");
};

ws.onmessage = (event) => {
    console.log("Received from server:", event.data);
};

ws.onerror = (error) => {
    console.error("WebSocket error:", error);
};

ws.onclose = () => {
    console.log("WebSocket closed");
};
