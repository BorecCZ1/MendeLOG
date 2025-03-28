<script setup lang="ts">
import { ref, onMounted } from "vue";
import { fetchLogs } from "@/services/articleService";
import {Article} from "@/model/Article";
import ArticleComponent from "@/components/dashboard/ArticleComponent.vue";

const logs = ref<Article[]>([]);

onMounted(async () => {
  const fetchedLogs = await fetchLogs();
  console.log('Fetched logs:', fetchedLogs);
  logs.value = Array.isArray(fetchedLogs) ? fetchedLogs : [];
});
</script>

<template>
  <div class="recent-logs">
    <h2>Recent Logs</h2>
    <div v-if="logs.length">
      <ArticleComponent v-for="log in logs" :key="log.articles_id" :log="log" />
    </div>
    <p v-else>Loading logs...</p>
  </div>
</template>

<style scoped>
.recent-logs {
  width: 100%;
  max-width: 600px;
  margin: auto;
  padding: 1rem;
}
</style>
