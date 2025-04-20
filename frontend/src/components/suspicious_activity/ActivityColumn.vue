<script setup lang="ts">
import {computed, defineProps} from "vue";
import { SuspiciousActivity } from "@/model/SuspiciousActivity";
import ActivityCard from "@/components/suspicious_activity/ActivityCard.vue";
import {useActivities} from "@/services/activityService";

const props = defineProps<{
  title: string;
  activities: SuspiciousActivity[];
  expanded: string | null;
  onToggleSolved: (activity: SuspiciousActivity) => void;
  onDelete: (id: string) => void;
  onToggleExpanded: (id: string) => void;
  isLoading: boolean;
}>();

const {
  initialLoad
} = useActivities()

const sortedActivities = computed(() => {
  return [...props.activities].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
});

</script>

<template>
  <div class="column">
    <div class="column-title">
      <h2>{{ title }}</h2>
    </div>
    <div class="scrollable">
      <p v-if="isLoading && initialLoad" class="loading-spinner"></p>

      <div v-else-if="sortedActivities.length === 0" class="empty-state">
        <p>
          V tuto chvíli nejsou žádné podezřelé aktivity.<br />
          Všechno vypadá v pořádku.
        </p>
      </div>

      <div v-else class="grid">
        <ActivityCard
            v-for="activity in sortedActivities"
            :key="activity.id"
            :activity="activity"
            :expanded="expanded"
            :onToggleSolved="onToggleSolved"
            :onDelete="onDelete"
            :onToggleExpanded="onToggleExpanded"
        />
      </div>
    </div>

  </div>
</template>

<style scoped>
.column {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #1a1a1a;
  border: 1px solid #333;
  border-radius: 1rem;
  padding: 1.5rem;
  gap: 1.5rem;
  max-height: 100%;
  box-shadow: 0 0 16px rgba(0,0,0,0.3);
}

.column-title {
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  border-bottom: 1px solid #444;
  padding-bottom: 0.5rem;
}

.scrollable {
  flex: 1;
  overflow-y: auto;
  max-height: 75vh;
  padding-right: 0.5rem;
  scrollbar-width: thin;
}

.scrollable::-webkit-scrollbar {
}

.scrollable::-webkit-scrollbar-thumb {
  background-color: #444;
  border-radius: 4px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.empty-state {
  text-align: center;
  color: #aaa;
  font-size: 1.1rem;
  padding: 2rem 1rem;
  border: 2px dashed #444;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.02);
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
