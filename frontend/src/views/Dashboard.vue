<script setup lang="ts">
import {ref, onMounted} from "vue";
import BarChart from "@/components/dashboard/BarChart.vue";
import RecentLogs from "@/components/dashboard/RecentLogs.vue";
import StatusChecker from "@/components/dashboard/StatusChecker.vue";
import type {Article} from "@/model/Article";
import {useArticleService} from "@/services/articleService";

const {
  fetchLogs
} = useArticleService();

const logs = ref<Article[]>([]);

onMounted(async () => {
  logs.value = await fetchLogs();
});
</script>

<template>
  <div class="dashboard">
    <div class="left-section">
      <div class="chart">
        <BarChart :logs="logs"/>
      </div>
      <div class="logs">
        <RecentLogs :logs="logs"/>
      </div>
    </div>

    <div class="right-section">
      <div class="status">

        <StatusChecker :logs="logs" title="Afrodita"/>
      </div>
      <div class="status">

        <StatusChecker :logs="logs" title="Dita"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 1vh;
  box-sizing: border-box;
  gap: 2vh;
}

.left-section {
  display: flex;
  flex-direction: column;
  width: 60%;
  height: 100%;
  gap: 2vh;
}

.chart {
  height: 50%;
}

.logs {
  height: 50%;
  overflow-y: hidden;
}

.right-section {
  display: flex;
  flex-direction: column;
  width: 40%;
  height: 100%;
  gap: 2vh;
}

.status {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
