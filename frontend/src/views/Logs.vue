<script setup lang="ts">
import { ref, onMounted } from "vue";

const articles = ref<any[]>([]);

const fetchData = async () => {
  try {
    const response = await fetch("http://localhost:8000/database");
    const data = await response.json();

    articles.value = data.data;
  } catch (error) {
    console.error("Chyba při načítání dat:", error);
  }
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="dashboard">
    <h1 class="dashboard-title">Dashboard</h1>

    <div v-if="articles.length > 0" class="articles-list">
      <div v-for="article in articles" :key="article.articles_id" class="article-card">
        <h2 class="article-title">{{ article.article_title }}</h2>
        <p><strong>Category ID:</strong> {{ article.articles_categories_id }}</p>
        <p><strong>Published At:</strong> {{ article.published_at }}</p>
        <p><strong>Retrieved At:</strong> {{ article.retrieved_at }}</p>
        <p><strong>Domain:</strong> <a :href="article.url" target="_blank">{{ article.domain }}</a></p>
      </div>
    </div>

    <div v-else>
      <p>Loading articles...</p>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.dashboard-title {
  text-align: center;
  margin-bottom: 30px;
  color: #FFFFFF;
}

.articles-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
}

.article-card {
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.article-title {
  font-size: 1.2em;
  font-weight: bold;
  color: black;
}

.article-card p {
  font-size: 0.9em;
  color: #555;
}

strong {
  color: #181818;
}

.article-card a {
  color: #1e90ff;
  text-decoration: none;
}

.article-card a:hover {
  text-decoration: underline;
}
</style>
