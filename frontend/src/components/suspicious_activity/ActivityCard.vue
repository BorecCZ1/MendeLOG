<script setup lang="ts">
import { defineProps } from "vue";
import { SuspiciousActivity } from "@/model/SuspiciousActivity";

const props = defineProps<{
  activity: SuspiciousActivity;
  expanded: string | null;
  onToggleSolved: (activity: SuspiciousActivity) => void;
  onDelete: (id: string) => void;
  onToggleExpanded: (id: string) => void;
}>();
</script>

<template>
  <div class="card" :class="[activity.level, { solved: activity.solved }]">
    <div class="card-header">
      <span class="icon">{{ activity.level === "error" ? "❌" : "⚠️" }}</span>
      <h3>{{ activity.name }}</h3>
    </div>
    <p class="meta">
      Level: <strong>{{ activity.level }}</strong> ·
      {{ new Date(activity.timestamp).toLocaleString() }}
    </p>

    <button class="toggle-btn" @click="onToggleExpanded(activity.id!)">
      {{ expanded === activity.id ? '🔽 Hide Details' : '🔼 Show Details' }}
    </button>

    <transition name="fade">
      <p v-if="expanded === activity.id" class="description">
        {{ activity.description || "No description provided." }}
      </p>
    </transition>

    <div class="actions">
      <button @click="onToggleSolved(activity)">
        {{ activity.solved ? '🔁 Mark as Unsolved' : '✅ Mark as Solved' }}
      </button>
      <button @click="onDelete(activity.id!)" class="danger">🗑 Delete</button>
    </div>
  </div>
</template>

<style scoped>
.card {
  background-color: #1e1e1e;
  color: #eaeaea;
  border: 1px solid #333;
  padding: 1.5rem;
  border-radius: 1rem;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  box-shadow: 0 0 12px rgba(0,0,0,0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease;
}

.card.solved {
  background-color: #223322;
  border-color: #3a5f3a;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.5em;
  margin-bottom: 0.5em;
}

.icon {
  font-size: 1.6em;
}

.meta {
  font-size: 0.85em;
  color: #aaa;
  margin-bottom: 0.8em;
}

.toggle-btn {
  background: none;
  color: #bbb;
  border: none;
  font-size: 0.9em;
  cursor: pointer;
  margin-bottom: 0.5em;
}

.description {
  font-size: 0.95em;
  color: #ddd;
  margin-bottom: 0.8em;
  text-align: center;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 0.6em;
  width: 100%;
}


button {
  cursor: pointer;
  padding: 0.5em 1em;
  background: #2e2e2e;
  border: 1px solid #444;
  color: #ddd;
  border-radius: 8px;
  transition: 0.2s ease;
}

button:hover {
  background: #3a3a3a;
}

button.danger {
  background: #5a1a1a;
  border-color: #aa4444;
}

button.danger:hover {
  background: #761818;
}

.card.error {
  border-left: 4px solid #d33;
}

.card.warning {
  border-left: 4px solid #e6b800;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
