<script setup lang="ts">
import { computed } from "vue";
import { Article } from "@/model/Article";
import ArticleComponent from "@/components/dashboard/ArticleComponent.vue";
import NoBadArticlesFound from "@/components/NoBadArticlesFound.vue";

const props = defineProps<{
  logs: Article[];
  isLoading: boolean;
}>();

const badLogs = computed(() => {
  return props.logs.filter(log => log.statuses_id !== 1);
});
</script>

<template>
  <div class="recent-logs">
    <div v-if="badLogs.length">
      <ArticleComponent
          v-for="log in badLogs.slice(0, 4)"
          :key="log.articles_id"
          :log="log"
      />
    </div>
    <p v-else-if="props.isLoading" class="loading-spinner"></p>
    <NoBadArticlesFound v-else />
  </div>
</template>

<style scoped>
.recent-logs {
  width: 90%;
  border-radius: 1vh;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1vh;
}

.loading-spinner {
  border: 1vh solid #f3f3f3;
  border-top: 1vh solid #4caf50;
  border-radius: 50%;
  width: 30vh;
  height: 30vh;
  animation: spin 1s linear infinite;
  margin: 2vh auto 0;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
