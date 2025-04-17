<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { SuspiciousActivity } from "@/model/SuspiciousActivity";
import { suspiciousActivityController } from "@/controllers/suspiciousActivityController";
import ActivityColumn from "@/components/suspicious_activity/ActivityColumn.vue";
import ActivityForm from "@/components/suspicious_activity/ActivityForm.vue";

const activities = ref<SuspiciousActivity[]>([]);
const expanded = ref<string | null>(null);
const showForm = ref(false);

const fetchActivities = async () => {
  activities.value = await suspiciousActivityController.fetchAll();
};

const toggleSolved = async (activity: SuspiciousActivity) => {
  const updated = { ...activity, solved: !activity.solved };
  await suspiciousActivityController.createActivity(updated);
  if (activity.id) await suspiciousActivityController.deleteActivity(activity.id);
  await fetchActivities();
};

const deleteActivity = async (id: string) => {
  await suspiciousActivityController.deleteActivity(id);
  await fetchActivities();
};

const addActivity = async (activity: SuspiciousActivity) => {
  await suspiciousActivityController.createActivity(activity);
  showForm.value = false;
  await fetchActivities();
};

const toggleExpanded = (id: string) => {
  expanded.value = expanded.value === id ? null : id;
};

onMounted(fetchActivities);

const unsolvedActivities = computed(() => activities.value.filter(a => !a.solved));
const solvedActivities = computed(() => activities.value.filter(a => a.solved));
</script>

<template>
  <div class="suspicious_container">
    <div class="header">
      <h2>Suspicious Activities</h2>
      <button class="toggle-form" @click="showForm = !showForm">
        {{ showForm ? "➖ Close Form" : "➕ Add Activity" }}
      </button>
    </div>

    <transition name="fade">
      <ActivityForm v-if="showForm" @created="addActivity" />
    </transition>

    <div class="columns">
      <ActivityColumn
          title="🛑 Unsolved"
          :activities="unsolvedActivities"
          :expanded="expanded"
          :onToggleSolved="toggleSolved"
          :onDelete="deleteActivity"
          :onToggleExpanded="toggleExpanded"
      />
      <ActivityColumn
          title="✅ Solved"
          :activities="solvedActivities"
          :expanded="expanded"
          :onToggleSolved="toggleSolved"
          :onDelete="deleteActivity"
          :onToggleExpanded="toggleExpanded"
      />
    </div>
  </div>
</template>

<style scoped>
.suspicious_container {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 2rem;
  width: 100%;
  height: 100%;
  max-width: 100vw;
  box-sizing: border-box;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.toggle-form {
  background-color: #2c2c2c;
  border: 1px solid #444;
  color: #eee;
  padding: 0.5em 1em;
  border-radius: 1vh;
  cursor: pointer;
  transition: 0.2s ease;
}

.toggle-form:hover {
  background-color: #444;
}

.columns {
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.columns > * {
  flex: 1;
  min-width: 0;
}


.activity-column-content {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(3vh, 1fr));
  gap: 1rem;
  width: 100%;
}
</style>
