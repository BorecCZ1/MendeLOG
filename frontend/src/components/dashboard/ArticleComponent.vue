<script setup lang="ts">
import { defineProps } from "vue";
import {Article} from "@/model/Article";

defineProps<{ log: Article }>();
</script>

<template>
  <div class="log-item">
    <div class="log-content">
      <h3>{{ log.article_title }}</h3>
      <p>{{ new Date(log.retrieved_at).toLocaleString() }}</p>
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
  text-decoration: none;
  border-radius: 5px;
}
</style>
