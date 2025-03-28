<script setup lang="ts">
import BarChart from "@/components/dashboard/BarChart.vue";
import RecentLogs from "@/components/dashboard/RecentLogs.vue";

</script>

<template>
  <div class="dashboard">

    <BarChart />

    <RecentLogs></RecentLogs>

  </div>


</template>

<style scoped>

.dashboard {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
}

.dashboard > * {
  flex-grow: 1;
}


</style>
