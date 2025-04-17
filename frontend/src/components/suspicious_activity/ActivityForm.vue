<script setup lang="ts">
import { ref, computed } from "vue";
import { SuspiciousActivity } from "@/model/SuspiciousActivity";

const emit = defineEmits<{
  (e: "created", activity: SuspiciousActivity): void;
}>();

const name = ref("");
const description = ref("");
const level = ref<"warning" | "error">("warning");

const MAX_NAME_LENGTH = 50;
const MAX_DESCRIPTION_LENGTH = 300;

const nameRemaining = computed(() => MAX_NAME_LENGTH - name.value.length);
const descriptionRemaining = computed(() => MAX_DESCRIPTION_LENGTH - description.value.length);

const submit = () => {
  if (name.value.length > MAX_NAME_LENGTH || description.value.length > MAX_DESCRIPTION_LENGTH) {
    alert(`Name must be max ${MAX_NAME_LENGTH} characters, description max ${MAX_DESCRIPTION_LENGTH} characters.`);
    return;
  }

  const newActivity: SuspiciousActivity = {
    name: name.value.trim(),
    description: description.value.trim(),
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
    <h3>Add New Suspicious Activity</h3>

    <label>
      Name
      <input
          v-model="name"
          placeholder="e.g. EVERYTHING DROPPED WTH"
          required
          maxlength="50"
      />
      <small :class="{ warning: nameRemaining < 0 }">
        {{ nameRemaining }} characters remaining
      </small>
    </label>

    <label>
      Description
      <textarea
          v-model="description"
          placeholder="Details about the suspicious activity"
          rows="3"
          maxlength="300"
      />
      <small :class="{ warning: descriptionRemaining < 0 }">
        {{ descriptionRemaining }} characters remaining
      </small>
    </label>

    <label>
      Level
      <select v-model="level">
        <option value="warning">⚠️ Warning</option>
        <option value="error">❌ Error</option>
      </select>
    </label>

    <button type="submit">+ Add Activity</button>
  </form>
</template>

<style scoped>
.activity-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 2rem;
  max-width: 65vh;
  margin: 0 auto;
}

.activity-form h3 {
  color: #f0f0f0;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  text-align: center;
}

.activity-form label {
  display: flex;
  flex-direction: column;
  font-size: 0.95rem;
  color: #ccc;
  gap: 0.3rem;
}

.activity-form input,
.activity-form textarea,
.activity-form select {
  background-color: #2b2b2b;
  border: 1px solid #444;
  border-radius: 8px;
  padding: 0.75rem;
  color: #f0f0f0;
  font-size: 1rem;
  transition: border 0.2s ease;
}

textarea {
  resize: none;
  width: 100%;
}

.activity-form input:focus,
.activity-form textarea:focus,
.activity-form select:focus {
  outline: none;
  border-color: #888;
}

.activity-form small {
  font-size: 0.8rem;
  color: #aaa;
  align-self: flex-end;
}

.activity-form small.warning {
  color: #ff6b6b;
  font-weight: bold;
}

.activity-form button {
  background-color: #2e7d32;
  border: none;
  color: white;
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s ease;
}

.activity-form button:hover {
  background-color: #388e3c;
}
</style>
