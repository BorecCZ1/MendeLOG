<script setup lang="ts">
import { ref } from "vue";
import { SuspiciousActivity } from "@/model/SuspiciousActivity";

const emit = defineEmits<{
  (e: "created", activity: SuspiciousActivity): void;
}>();

const name = ref("");
const description = ref("");
const level = ref<"warning" | "error">("warning");

const submit = () => {
  const newActivity: SuspiciousActivity = {
    name: name.value,
    description: description.value,
    level: level.value,
    solved: false,
    timestamp: new Date().toISOString()
  };
  emit("created", newActivity);
  name.value = "";
  description.value = "";
  level.value = "warning";
};
</script>

<template>
  <form @submit.prevent="submit" class="activity-form">
    <input v-model="name" placeholder="Name" required />
    <textarea v-model="description" placeholder="Description" />
    <select v-model="level">
      <option value="warning">⚠️ Warning</option>
      <option value="error">❌ Error</option>
    </select>
    <button type="submit">➕ Add Activity</button>
  </form>
</template>

<style scoped>
.activity-form {
  margin-bottom: 1.5em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}
</style>
