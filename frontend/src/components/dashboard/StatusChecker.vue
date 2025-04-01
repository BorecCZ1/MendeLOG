<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { fetchLogs } from "@/services/articleService";

const lastRetrieved = ref<Date | null>(null);

onMounted(async () => {
  const logs = await fetchLogs();
  if (logs.length > 0) {
    lastRetrieved.value = new Date(logs[0].retrieved_at);
  }
});

const status = computed(() => {
  if (!lastRetrieved.value) {
    return { color: "#808080", text: "No data", icon: "ℹ️", border: "2px solid #808080" };
  }

  const now = new Date();
  const diffMinutes = Math.floor((now.getTime() - lastRetrieved.value.getTime()) / 60000);

  if (diffMinutes <= 10) {
    return { color: "#28a745", text: "All systems operational", icon: "✅", border: "2px solid #28a745", time: diffMinutes };
  }
  if (diffMinutes <= 20) {
    return { color: "#ffc107", text: "Minor delays", icon: "⚠️", border: "2px solid #ffc107", time: diffMinutes };
  }
  return { color: "#dc3545", text: "Critical issue", icon: "❌", border: "2px solid #dc3545", time: diffMinutes };
});
</script>

<template>
  <div class="status-container">
    <h2>System Status</h2>

    <div class="status-box" :style="{ border: status.border }">
      <span class="status-icon">{{ status.icon }}</span>
      <p class="status-text">{{ status.text }}</p>
    </div>

    <p v-if="status.time !== undefined" class="time-text">
      Last record processed: {{ status.time }} min ago
    </p>
  </div>
</template>

<style scoped>
.status-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 45vh;
  height: 45vh;
  background: #2a2a2a;
  border-radius: 1vh;
  padding: 2vh;
  text-align: center;
}

h2 {
  font-size: 2rem;
  margin-bottom: 2vh;
  color: white;
}

.status-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  padding: 4vh;
  border-radius: 1vh;
  background: #1e1e1e;
}

.status-icon {
  font-size: 4rem;
  margin-bottom: 1vh;
}

.status-text {
  font-size: 1.5rem;
  color: white;
}

.time-text {
  margin-top: 2vh;
  font-size: 1.1rem;
  color: white;
}
</style>
