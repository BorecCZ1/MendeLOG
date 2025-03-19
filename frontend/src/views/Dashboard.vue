<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import BarChart from "@/components/chart/BarChart.vue";

const socket = ref<WebSocket | null>(null);
const messages = ref<string[]>([]);
const inputMessage = ref("");

const connectWebSocket = () => {
  socket.value = new WebSocket("ws://localhost:8000/ws");

  socket.value.onopen = () => {
    console.log("WebSocket connected!");
  };

  socket.value.onmessage = (event) => {
    messages.value.push(event.data);
  };

  socket.value.onclose = () => {
    console.log("WebSocket disconnected!");
  };

  socket.value.onerror = (error) => {
    console.error("WebSocket Error:", error);
  };
};

const sendMessage = () => {
  if (socket.value && socket.value.readyState === WebSocket.OPEN) {
    socket.value.send(inputMessage.value);
    inputMessage.value = "";
  }
};

onMounted(() => {
  connectWebSocket();
});

onUnmounted(() => {
  if (socket.value) {
    socket.value.close();
  }
});
</script>

<template>
  <div class="dashboard">
    <h1 class="dashboard-title">Dashboard</h1>

    <BarChart />

    <div class="websocket-section">
      <h2>WebSocket Test</h2>
      <input v-model="inputMessage" placeholder="Type a message..." />
      <button @click="sendMessage">Send</button>

      <ul>
        <li v-for="(msg, index) in messages" :key="index">
          {{ msg }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.dashboard-title {
  text-align: center;
  margin-bottom: 30px;
  color: #FFFFFF;
}

.websocket-section {
  margin-top: 20px;
  padding: 10px;
  background: #222;
  color: #fff;
  border-radius: 8px;
}

input {
  padding: 5px;
  margin-right: 10px;
}

button {
  padding: 5px 10px;
  background: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background: #45a049;
}
</style>
