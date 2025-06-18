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
  flex-direction: row;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  gap: 2vh;
  padding: 2vh;
  overflow: hidden;
}

.left-section {
  flex: 3;
  display: flex;
  flex-direction: column;
  gap: 6vh;
}

.chart {
  flex: 3;
  height: 60%;
  min-height: 0;
}

.logs {
  flex: 3;
  min-height: 30vh;
}

.right-section {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 2vh;
  max-width: 100%;
}

.status {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
