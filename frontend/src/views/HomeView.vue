<template>
  <div>
    <h1>Welcome to FastAPI and Vue</h1>
    <p>{{ message }}</p>
    <p>Status: {{ status }}</p>
    <p>Version: {{ version }}</p>
    <router-link to="/ws">Go to WebSocket Page</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  name: 'HomeView',
  setup() {
    const message = ref('');
    const status = ref('');
    const version = ref('');

    // Načítání dat z backendu při mountování komponenty
    onMounted(async () => {
      const response = await fetch('http://localhost:8000/data');
      const data = await response.json();
      message.value = data.message;
      status.value = data.status;
      version.value = data.version;
    });

    return {
      message,
      status,
      version
    };
  }
});
</script>

<style scoped>
/* Tady můžeš přidat styly pro HomeView */
</style>
