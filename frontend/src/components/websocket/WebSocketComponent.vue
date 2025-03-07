<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import {useWebSocketStore} from "@/store/websocketStore";

const websocketStore = useWebSocketStore();

const sendMessage = () => {
  websocketStore.sendMessage("Hello from Vue + Pinia!");
};

onMounted(() => {
  websocketStore.connect("ws://localhost:8000/ws");
});

onUnmounted(() => {
  websocketStore.close();
});
</script>

<template>
  <div>
    <h2>WebSocket with Pinia</h2>
    <button @click="sendMessage">Send Message</button>
    <div v-for="msg in websocketStore.messages" :key="msg">{{ msg }}</div>
  </div>
</template>
