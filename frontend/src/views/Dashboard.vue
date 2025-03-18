<script setup lang="ts">
import BarChart from "@/components/chart/BarChart.vue";
</script>

<template>
  <div class="dashboard">
    <h1 class="dashboard-title">Dashboard</h1>

    <BarChart />

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
</style>
