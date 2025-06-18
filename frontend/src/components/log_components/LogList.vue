<script setup lang="ts">
import {ref, watch} from "vue";
import ArticleComponent from "@/components/dashboard/ArticleComponent.vue";
import NoArticlesFound from "@/components/NoArticlesFound.vue";

const props = defineProps({
  logs: Array,
  isLoading: Boolean,
  searchQuery: String,
  startDate: String,
  endDate: String,
  selectedStatuses: Array,
  availableStatuses: Array
});

const emit = defineEmits([
  'update:searchQuery',
  'update:startDate',
  'update:endDate',
  'update:selectedStatuses',
  'reset-filters'
]);

const showFiltersPanel = ref(false);

const toggleFiltersPanel = () => {
  showFiltersPanel.value = !showFiltersPanel.value;
};

watch(() => props.startDate, (newStart) => {
  if (newStart && props.endDate && new Date(newStart) > new Date(props.endDate)) {
    emit('update:endDate', newStart);
  }
});

watch(() => props.endDate, (newEnd) => {
  if (newEnd && props.startDate && new Date(newEnd) < new Date(props.startDate)) {
    emit('update:startDate', newEnd);
  }
});
</script>

<template>
  <div class="logs-panel">
    <h2>Logs</h2>

    <input
        :value="searchQuery"
        @input="emit('update:searchQuery', $event.target.value)"
        type="text"
        placeholder="Search logs..."
        class="search-bar"
    />

    <div class="filters-actions">
      <button @click="toggleFiltersPanel" class="add-filters-button">Add Filters</button>
      <button @click="emit('reset-filters')" class="reset-filters-button">Reset Filters</button>
    </div>

    <div v-if="showFiltersPanel" class="filters-panel">
      <div class="date-filters">
        <label for="start-date" class="filter-label">Start Date:</label>
        <input
            :value="startDate"
            @input="emit('update:startDate', $event.target.value)"
            type="date"
            id="start-date"
            class="date-picker"
            :max="endDate || undefined"
        />

        <label for="end-date" class="filter-label">End Date:</label>
        <input
            :value="endDate"
            @input="emit('update:endDate', $event.target.value)"
            type="date"
            id="end-date"
            class="date-picker"
            :min="startDate || undefined"
        /></div>

      <div class="status-filters">
        <br>
        <h4 class="filter-label">Select Statuses</h4>
        <div class="status-checkboxes">
          <label
              v-for="status in availableStatuses"
              :key="status.id"
              :for="'status-' + status.id"
              class="status-chip"
              :class="{ selected: selectedStatuses.includes(status.id) }"
          >
            <input
                type="checkbox"
                :id="'status-' + status.id"
                :value="status.id"
                :checked="selectedStatuses.includes(status.id)"
                @change="(e) => {
        const newSelected = e.target.checked
          ? [...selectedStatuses, status.id]
          : selectedStatuses.filter(id => id !== status.id);
        emit('update:selectedStatuses', newSelected);
      }"
            />
            {{ status.description }}
          </label>
        </div>

      </div>

      <button @click="toggleFiltersPanel" class="close-filters-button">Close</button>
    </div>

    <div v-if="isLoading">
      <p class="loading-spinner"></p>
    </div>

    <div v-else-if="logs.length === 0" class="no-articles-found">
      <NoArticlesFound/>
    </div>

    <div v-else class="log-list">
      <ArticleComponent v-for="log in logs" :key="log.articles_id" :log="log"/>
    </div>
  </div>
</template>

<style scoped>
.logs-panel {
  width: 60%;
  height: 100%;
  background: #1E1E1E;
  color: white;
  padding: 2vh;
  border-radius: 1.5rem;
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
  min-width: 12vh;
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
  gap: 0.75rem;
}

.status-chip input[type="checkbox"] {
  display: none;
}

.status-chip {
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  background-color: #555;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  font-size: 0.95rem;
  user-select: none;
  border: 2px solid transparent;
}

.status-chip:hover {
  background-color: #666;
  transform: scale(1.05);
}

.status-chip.selected {
  background-color: #4caf50;
  color: #fff;
  border-color: #2e7d32;
  box-shadow: 0 0 0 2px #2e7d32;
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
