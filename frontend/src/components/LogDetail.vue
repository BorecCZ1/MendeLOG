<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Article } from "@/model/Article";
import { fetchLogs } from "@/services/articleService";

const route = useRoute();
const router = useRouter();
const log = ref<Article | null>(null);

onMounted(async () => {
  const logs = await fetchLogs();
  log.value = logs.find((l) => l.articles_id === Number(route.params.id)) || null;
});

const goBack = () => {
  router.go(-1);
};
</script>

<template>
  <div class="log-detail">
    <button @click="goBack" class="back-button">Back</button>

    <template v-if="log">
      <div class="log-content">
        <div class="log-item">
          <strong>Title:</strong>
          <p>{{ log.article_title }}</p>
        </div>
        <div class="log-item">
          <strong>Retrieved at:</strong>
          <p>{{ new Date(log.retrieved_at).toLocaleString() }}</p>
        </div>
        <div class="log-item">
          <strong>Published at:</strong>
          <p>{{ new Date(log.published_at).toLocaleString() }}</p>
        </div>
        <div class="log-item">
          <strong>Language:</strong>
          <p>{{ log.lang }}</p>
        </div>
        <div class="log-item">
          <strong>Domain:</strong>
          <p>{{ log.domain }}</p>
        </div>
        <div class="log-item">
          <strong>URL:</strong>
          <p><a :href="log.url" target="_blank">{{ log.url }}</a></p>
        </div>
      </div>
    </template>

    <p v-else>Loading...</p>
  </div>
</template>

<style scoped>
.log-detail {
  padding: 2rem;
  max-width: 100%;
  margin: auto;
}

.back-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 1.5vh 2.5vh;
  margin-bottom: 3vh;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 0.25em;
  transition: background-color 0.3s ease;
}

.back-button:hover {
  background-color: #0056b3;
}

.log-content {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

.log-item {
  flex: 1;
  min-width: 25%;
  margin-bottom: 1.5rem;
}

strong {
  font-weight: bold;
  font-size: 1.2rem;
}

p {
  font-size: 1.1rem;
}
</style>
