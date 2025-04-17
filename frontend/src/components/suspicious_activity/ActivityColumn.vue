<script setup lang="ts">
import { defineProps } from "vue";
import { SuspiciousActivity } from "@/model/SuspiciousActivity";
import ActivityCard from "@/components/suspicious_activity/ActivityCard.vue";

const props = defineProps<{
  title: string;
  activities: SuspiciousActivity[];
  expanded: string | null;
  onToggleSolved: (activity: SuspiciousActivity) => void;
  onDelete: (id: string) => void;
  onToggleExpanded: (id: string) => void;
}>();
</script>
<template>
  <div class="column">
    <h2>{{ title }}</h2>
    <div class="scrollable">
      <div class="grid">
        <ActivityCard
            v-for="activity in activities"
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
  gap: 1em;
  padding: 1em;
  height: 100%;
}

h2 {
  color: #ddd;
  font-size: 1.4rem;
  margin-bottom: 0.5em;
}

.scrollable {
  flex: 1;
  overflow-y: auto;
  max-height: 70vh;
  padding-right: 0.3rem; /* optický prostor vedle scrollbar */
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30vh, 1fr));
  gap: 1.5rem;
}
</style>
