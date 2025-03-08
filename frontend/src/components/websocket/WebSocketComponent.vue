<template>
  <div>
    <h1>WebSocket Demo</h1>
    <input v-model="message" @keyup.enter="sendMessage" placeholder="Type a message" />
    <button @click="sendMessage">Send</button>
    <p>Received: {{ receivedMessage }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'WebSocketComponent',
  setup() {
    const message = ref('');
    const receivedMessage = ref('');

    const socket = new WebSocket('ws://localhost:8000/ws');

    socket.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
      receivedMessage.value = event.data;
      console.log('Message from server:', event.data);
    };

    const sendMessage = () => {
      if (message.value) {
        socket.send(message.value);
        message.value = '';
      }
    };

    return {
      message,
      receivedMessage,
      sendMessage
    };
  }
});
</script>

<style scoped>

</style>
