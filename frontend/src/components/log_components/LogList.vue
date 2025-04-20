<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import { useArticleService } from "@/services/articleService";
import ArticleComponent from "@/components/dashboard/ArticleComponent.vue";
import NotFound from "@/components/NoArticlesFound.vue";

const isLoading = ref(true);

const {
  filteredLogs,
  searchQuery,
  startDate,
  endDate,
  selectedStatuses,
  availableStatuses,
  fetchAndFilterLogs,
  resetFilters,
} = useArticleService();

onMounted(async () => {
  isLoading.value = true;
  await fetchAndFilterLogs();
  isLoading.value = false;
});

const toggleFiltersPanel = () => {
  showFiltersPanel.value = !showFiltersPanel.value;
};

const showFiltersPanel = ref(false);

watch(startDate, (newStart) => {
  if (newStart && endDate.value && new Date(newStart) > new Date(endDate.value)) {
    endDate.value = newStart;
  }
});

watch(endDate, (newEnd) => {
  if (newEnd && startDate.value && new Date(newEnd) < new Date(startDate.value)) {
    startDate.value = newEnd;
  }
});

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

    <div class="filters-actions">
      <button @click="toggleFiltersPanel" class="add-filters-button">Add Filters</button>
      <button @click="resetFilters" class="reset-filters-button">Reset Filters</button>
    </div>

    <div v-if="showFiltersPanel" class="filters-panel">
      <div class="date-filters">
        <label for="start-date" class="filter-label">Start Date:</label>
        <input
            v-model="startDate"
            type="date"
            id="start-date"
            class="date-picker"
            :max="endDate || undefined"
        />

        <label for="end-date" class="filter-label">End Date:</label>
        <input
            v-model="endDate"
            type="date"
            id="end-date"
            class="date-picker"
            :min="startDate || undefined"
        />      </div>

      <div class="status-filters">
        <br>
        <h4 class="filter-label">Select Statuses</h4>
        <div class="status-checkboxes">
          <div v-for="status in availableStatuses" :key="status.id">
            <input
                type="checkbox"
                :id="'status-' + status.id"
                :value="status.id"
                v-model="selectedStatuses" />
            <label :for="'status-' + status.id">{{ status.description }}</label>
          </div>
        </div>
      </div>

      <button @click="toggleFiltersPanel" class="close-filters-button">Close</button>
    </div>

    <div v-if="isLoading">
      <p class="loading-spinner"></p>
    </div>

    <div v-else-if="filteredLogs.length === 0" class="no-articles-found">
      <NotFound />
    </div>

    <div v-else class="log-list">
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

.filters-actions {
  display: flex;
  justify-content: flex-start;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.add-filters-button, .reset-filters-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  min-width: 120px;
}

.add-filters-button:hover, .reset-filters-button:hover {
  background-color: #45a049;
}

.reset-filters-button {
  background-color: #f44336;
}

.reset-filters-button:hover {
  background-color: #d32f2f;
}

.filters-panel {
  background: #333;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-top: 1rem;
}

.date-filters {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
}

.date-picker:focus {
  outline: none;
  border-color: #4caf50;
}

.date-picker::-webkit-calendar-picker-indicator {
  filter: invert(1);
}

.status-checkboxes {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.status-checkboxes input {
  margin-right: 0.5rem;
}

.close-filters-button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  margin-top: 1rem;
}

.close-filters-button:hover {
  background-color: #d32f2f;
}

.log-list {
  flex-grow: 1;
  overflow-y: auto;
  max-height: calc(100vh - 80px);
  padding-right: 1vh;
  margin-top: 1em;
}

.date-picker {
  background-color: #444;
  color: white;
  border: 1px solid #555;
  border-radius: 0.5rem;
  padding: 0.5rem;
  width: 17vh;
  font-size: 1rem;
  margin: 0.5rem 0;
}

.date-picker:focus {
  outline: none;
  border-color: #4caf50;
}

.date-picker::-webkit-calendar-picker-indicator {
  filter: invert(1);
}

.no-articles-found {
  margin-top: 2em;
}

.filter-label {
  font-weight: bold;
  color: white;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
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
