<script setup lang="ts">
import { defineProps } from "vue";
import { Article } from "@/model/Article";
import ArticleComponent from "@/components/dashboard/ArticleComponent.vue";

const props = defineProps<{ logs: Article[] }>();
</script>

<template>
  <div class="recent-logs">
    <h2>Recent Logs</h2>
    <div v-if="props.logs.length">
      <ArticleComponent v-for="log in props.logs" :key="log.articles_id" :log="log" />
    </div>
    <p v-else class="loading-spinner"></p>
  </div>
</template>


<style scoped>

h2 {
  color: white;
  font-weight: 400;
}

.recent-logs {
  width: 100%;
  max-width: 90%;
  margin: auto;
  padding: 1rem;
}

.loading-spinner {
  border: 1vh solid #f3f3f3;
  border-top: 1vh solid #4caf50;
  border-radius: 50%;
  width: 30vh;
  height: 30vh;
  animation: spin 1s linear infinite;
  margin: 0 auto;
  margin-top: 2vh;
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
