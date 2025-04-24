<script setup lang="ts">
import LogList from "@/components/log_components/LogList.vue";
import Statistics from "@/components/log_components/Statistics.vue";
import {useArticleService} from "@/services/articleService";
import {onMounted, ref} from "vue";

const isLoading = ref(true);
const {
  filteredLogs,
  searchQuery,
  startDate,
  endDate,
  selectedStatuses,
  availableStatuses,
  mostFrequentBadStatus,
  lastBadStatus,
  badStatusCountLastTwoDays,
  badStatusRatio,
  fetchAndFilterLogs,
  resetFilters
} = useArticleService();

onMounted(async () => {
  isLoading.value = true;
  await fetchAndFilterLogs();
  isLoading.value = false;
});
</script>

<template>
  <div class="my_content">
    <LogList
        :logs="filteredLogs"
        :is-loading="isLoading"
        :search-query="searchQuery"
        :start-date="startDate"
        :end-date="endDate"
        :selected-statuses="selectedStatuses"
        :available-statuses="availableStatuses"
        @update:searchQuery="(value) => searchQuery = value"
        @update:startDate="(value) => startDate = value"
        @update:endDate="(value) => endDate = value"
        @update:selectedStatuses="(value) => selectedStatuses = value"
        @reset-filters="resetFilters"
    />
    <Statistics
        :is-loading="isLoading"
        :most-frequent-bad-status="mostFrequentBadStatus"
        :last-bad-status="lastBadStatus"
        :bad-status-count-last-two-days="badStatusCountLastTwoDays"
        :bad-status-ratio="badStatusRatio"
    />
  </div>
</template>

<style scoped>
.my_content {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 1vh;
  gap: 1em;
}

LogList, Statistics {
  flex: 1;
}
</style>