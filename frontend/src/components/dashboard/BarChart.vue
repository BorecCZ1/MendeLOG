<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import type { Article } from "@/model/Article";
import { useChartService } from "@/services/chartService";
import { Chart } from "chart.js";

const props = defineProps<{ logs: Article[] }>();
const chartRef = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;

const { renderChart, filterLogsByServer, getFilteredLogsCount } = useChartService();

const selectedServer = ref<string>('all');

const filteredLogs = computed(() => filterLogsByServer(props.logs, selectedServer.value));

const totalLogsCount = computed(() => getFilteredLogsCount(filteredLogs.value));

const render = () => {
  if (chartRef.value) {
    chartInstance = renderChart(chartRef.value, filteredLogs.value, chartInstance);
  }
};

onMounted(render);
watch(() => filteredLogs.value, render, { deep: true });
</script>

<template>
  <div class="chart-wrapper">
    <div class="filter">
      <select v-model="selectedServer">
        <option value="all">All</option>
        <option value="dita">Dita</option>
        <option value="afrodita">Afrodita</option>
      </select>
    </div>

    <div class="chart-container">
      <canvas ref="chartRef"></canvas>
    </div>

    <div class="log-count">
      <p>Total Logs: {{ totalLogsCount }}</p>
    </div>
  </div>
</template>

<style scoped>

.chart-wrapper {
  position: relative;
  width: 85%;
  height: 85%;
  display: flex;
  flex-direction: column;
}

.filter {
  position: absolute;
  top: 1vh;
  right: 1vh;
  z-index: 10;
}

.filter select {
  padding: 0.5em 1em;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #222;
  color: #eee;
  font-size: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  appearance: none;
  background-repeat: no-repeat;
  background-position: right 1em center;
  background-size: 10px 7px;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.filter select:hover {
  border-color: #999;
}

.filter select:focus {
  outline: none;
  border-color: #007BFF;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
}

.chart-container {
  flex: 1;
  width: 100%;
  position: relative;
}

.log-count {
  text-align: center;
  font-size: 1.1rem;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  padding: 1vh;
  color: white;
}

</style>
