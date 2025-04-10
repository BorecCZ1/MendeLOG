<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useStatisticsService } from "@/services/statisticsService";

const { getBadStatusCountThisMonth, getMostFrequentBadStatus, getLastRecordedBadStatus } = useStatisticsService();

const badStatusCount = ref(0);
const mostFrequentBadStatus = ref<string | null>(null);
const lastRecordedBadStatus = ref<string | null>(null);

onMounted(() => {
  badStatusCount.value = getBadStatusCountThisMonth();
  mostFrequentBadStatus.value = getMostFrequentBadStatus();
  lastRecordedBadStatus.value = getLastRecordedBadStatus();
});
</script>

<template>
  <div class="statistics-panel">
    <h2>Statistics</h2>
    <p><strong>Bad status count per this month:</strong> {{ badStatusCount }}</p>

    <p v-if="mostFrequentBadStatus">
      <strong>Most frequent bad status:</strong> {{ mostFrequentBadStatus }}
    </p>

    <p v-if="lastRecordedBadStatus">
      <strong>Last recorded bad status:</strong> {{ lastRecordedBadStatus }}
    </p>

  </div>
</template>

<style scoped>
.statistics-panel {
  width: 31%;
  height: 100%;
  background: #1E1E1E;
  color: white;
  padding: 2vh;
  display: flex;
  flex-direction: column;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
  text-align: center;
}

p {
  font-size: 1.2rem;
  margin-bottom: 1vh;
}
</style>
