<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Chart, CategoryScale, BarElement, Title, Tooltip, Legend, LinearScale, BarController } from 'chart.js';

Chart.register(CategoryScale, BarElement, Title, Tooltip, Legend, LinearScale, BarController);

const chartRef = ref<HTMLCanvasElement | null>(null);

const getColorForValue = (value: number) => {
  if (value <= 15) {
    return 'rgba(255, 99, 132, 0.8)';
  } else if (value <= 25) {
    return 'rgba(255, 206, 86, 0.8)';
  } else {
    return 'rgba(75, 192, 192, 0.8)';
  }
};

const chartData = ref({
  labels: ['14:00', '15:00', '16:00', '17:00', '18:00', '19:00'],
  datasets: [
    {
      label: 'Počet reportů',
      data: [10, 15, 20, 25, 30, 35],
      backgroundColor: (context: any) => {

        return getColorForValue(context.raw);
      },
      borderColor: (context: any) => {
        return getColorForValue(context.raw);
      },
      borderWidth: 1
    }
  ]
});

onMounted(() => {
  if (chartRef.value) {
    new Chart(chartRef.value, {
      type: 'bar',
      data: chartData.value,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Čas',
            }
          },
          y: {
            title: {
              display: true,
              text: 'Počet reportů',
            },
            min: 0,
          }
        }
      },
    });
  }
});
</script>

<template>
  <div class="chart-container">
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<style scoped>
.chart-container {
  width: 150vh;
  height: 50vh;
  padding: 0;
  box-sizing: border-box;
}
</style>
