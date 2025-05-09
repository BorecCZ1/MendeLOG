<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Article } from "@/model/Article";
import { useArticleService } from "@/services/articleService";
import NotFound from "@/views/NotFound.vue";

const route = useRoute();
const router = useRouter();
const log = ref<Article | null>(null);
const hasError = ref(false);
const isLoading = ref(true);

const { fetchSingleLog } = useArticleService();

onMounted(async () => {
  const id = Number(route.params.id);

  if (isNaN(id)) {
    hasError.value = true;
    isLoading.value = false;
    return;
  }

  try {
    const result = await fetchSingleLog(id);
    if (result) {
      log.value = result;
    } else {
      hasError.value = true;
    }
  } catch (err) {
    hasError.value = true;
  } finally {
    isLoading.value = false;
  }
});


const goBack = () => {
  router.go(-1);
};
</script>


<template>
  <div class="log-detail">
    <button @click="goBack" class="back-button">Back</button>

    <template v-if="isLoading">
      <p class="loading-spinner"></p>
    </template>

    <template v-else-if="hasError">
      <NotFound/>
    </template>

    <template v-else-if="log">
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
          <strong>Articles sentiments ID:</strong>
          <p>{{ log.articles_sentiments_id || 'No article sentiments id available' }}</p>
        </div>

        <div class="log-item">
          <strong>Short summary ID:</strong>
          <p>{{ log.short_summary_id || 'No short summary id available' }}</p>
        </div>

        <div class="log-item">
          <strong>Long summary ID:</strong>
          <p>{{ log.long_summary_id || 'No long summary id available' }}</p>
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

        <div class="log-item">
          <strong>Status ID:</strong>
          <p>{{ log.statuses_id ?? 'N/A' }}</p>
        </div>

        <div class="log-item">
          <strong>Status Description:</strong>
          <p>{{ log.status_description ?? 'No status description' }}</p>
        </div>

        <div class="log-item">
          <strong>Tools ID:</strong>
          <p>{{ log.tools_id || 'No tools ID available' }}</p>
        </div>

        <div class="log-item">
          <strong>Processed by:</strong>
          <p>{{ log.processed_by || 'N/A' }}</p>
        </div>

        <div class="log-item">
          <strong>Description:</strong>
          <p>{{ log.description || 'No description available' }}</p>
        </div>

      </div>
    </template>
  </div>
</template>


<style scoped>
.log-detail {
  width: 100%;
  height: 100%;
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

.loading-spinner {
  border: 2vh solid #f3f3f3;
  border-top: 2vh solid #4caf50;
  border-radius: 70%;
  width: 50vh;
  height: 50vh;
  animation: spin 1s infinite linear;
  margin: 2vh auto 0;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
