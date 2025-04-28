<script setup lang="ts">
import { defineProps, computed } from "vue";
import type { Article } from "@/model/Article";
import { useStatusCheckerService } from "@/services/statusCheckerService";

const props = defineProps<{
  logs: Article[];
  title: string;
}>();

const logs = computed(() => props.logs);

const { status } = useStatusCheckerService(logs, props.title);
</script>

<template>
  <div class="status-container">
    <h2>{{ props.title }}</h2>

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
  width: 70%;
  height: 95%;
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
