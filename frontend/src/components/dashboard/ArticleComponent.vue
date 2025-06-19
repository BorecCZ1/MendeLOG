<script setup lang="ts">
import {Article} from "@/model/Article";
import {useRoute} from "vue-router";

defineProps<{ log: Article }>();

const route = useRoute();

const showTitle = route.path !== '/';

</script>

<template>
  <div class="log-item">
    <div class="log-content">
      <h3 v-if="showTitle"><span class="log-title">Title:</span> {{ log.article_title }}</h3>
      <h3><span class="log-title">Retrieved at: </span> {{ new Date(log.retrieved_at).toLocaleString() }}</h3>
      <p><span class="log-title">Status: </span> {{ log.statuses_id }} - {{ log.status_description}} </p>
    </div>
    <router-link :to="`/logs/${log.articles_id}`" class="details-button">Details</router-link>
  </div>
</template>

<style scoped>
.log-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.log-item:not(:last-child) {
  border-bottom: 1px solid #ddd;
}

.log-content h3 {
  margin: 0;
  font-size: 1rem;
}

.details-button {
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.4em;
}

.log-title {
  font-size: 1rem;
  font-weight: 350;
}
</style>
