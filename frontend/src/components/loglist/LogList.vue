<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { fetchLogs } from "@/services/articleService";
import { Article } from "@/model/Article";
import ArticleComponent from "@/components/dashboard/ArticleComponent.vue";

const logs = ref<Article[]>([]);
const searchQuery = ref("");

onMounted(async () => {
  const fetchedLogs = await fetchLogs();
  logs.value = Array.isArray(fetchedLogs) ? fetchedLogs : [];
});

const filteredLogs = computed(() =>
    logs.value.filter(log =>
        log.article_title.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
);
</script>

<template>
  <div class="logs-panel">
    <h2>Logs</h2>

    <input
        v-model="searchQuery"
        type="text"
        placeholder="Search logs..."
        class="search-bar"
    />

    <div class="log-list">
      <ArticleComponent v-for="log in filteredLogs" :key="log.articles_id" :log="log" />
    </div>
  </div>
</template>

<style scoped>
.logs-panel {
  width: 69%;
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

.search-bar {
  padding: 1vh;
  width: 100%;
  border-radius: 1vh;
  border: none;
  font-size: 1rem;
  margin-bottom: 2vh;
}

.log-list {
  flex-grow: 1;
  overflow-y: auto;
  max-height: calc(100vh - 80px);
  padding-right: 1vh;
}
</style>
