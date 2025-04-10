<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import type { Article } from "@/model/Article";
import { useChartService } from "@/services/chartService";
import {Chart} from "chart.js";

const props = defineProps<{ logs: Article[] }>();
const chartRef = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;

const { renderChart } = useChartService();

const render = () => {
  if (chartRef.value) {
    chartInstance = renderChart(chartRef.value, props.logs, chartInstance);
  }
};

onMounted(render);
watch(() => props.logs, render, { deep: true });
</script>

<template>
  <div class="chart-container">
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
}
</style>
