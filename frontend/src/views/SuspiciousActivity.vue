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
      <button class="toggle-form" @click="showForm = !showForm">
        + Add Suspicious Activity
      </button>

    </div>

    <transition name="fade">
      <div v-if="showForm" class="modal-backdrop" @click.self="showForm = false">
        <div class="modal">
          <button class="modal-close" @click="showForm = false">×</button>
          <ActivityForm @created="addActivity" />
        </div>
      </div>
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
  background-color: #3a5f3a;
  border: none;
  color: #fff;
  padding: 0.75em 1.5em;
  border-radius: 12px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 0 10px rgba(0,0,0,0.3);
  transition: background 0.3s ease;
}

.toggle-form:hover {
  background-color: #4b7c4b;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  position: relative;
  background-color: #1e1e1e;
  padding: 2rem;
  border-radius: 1rem;
  width: 90%;
  max-width: 600px;
  box-shadow: 0 0 20px rgba(0,0,0,0.5);
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 3rem;
  color: #aaa;
  cursor: pointer;
  transition: color 0.2s ease;
}

.modal-close:hover {
  color: #fff;
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
