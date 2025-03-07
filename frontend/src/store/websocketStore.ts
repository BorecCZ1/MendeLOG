import { defineStore } from "pinia";

export const useWebSocketStore = defineStore("websocket", {
    state: () => ({
        socket: null as WebSocket | null,
        messages: [] as string[],
    }),

    actions: {
        connect(url: string) {
            this.socket = new WebSocket(url);

            this.socket.onopen = () => {
                console.log("✅ WebSocket connected");
            };

            this.socket.onmessage = (event: MessageEvent) => {
                this.messages.push(event.data);
            };

            this.socket.onerror = (error: Event) => {
                console.error("❌ WebSocket Error:", error);
            };

            this.socket.onclose = () => {
                console.log("🔴 WebSocket closed");
            };
        },

        sendMessage(message: string) {
            if (this.socket && this.socket.readyState === WebSocket.OPEN) {
                this.socket.send(message);
            } else {
                console.warn("⚠️ WebSocket not connected!");
            }
        },

        close() {
            this.socket?.close();
        },
    },
});
