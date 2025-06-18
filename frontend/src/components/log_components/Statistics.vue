<script setup lang="ts">
const props = defineProps({
  isLoading: Boolean,
  mostFrequentBadStatus: Object,
  lastBadStatus: Object,
  badStatusCountLastTwoDays: Number,
  badStatusRatio: Number
});
</script>

<template>
  <div class="statistics-panel">
    <h2>📈 Status Statistics</h2>

    <div v-if="props.isLoading" class="loading-state">
      <div class="shimmer-card" v-for="n in 4" :key="n">
        <div class="shimmer-emoji shimmer"></div>
        <div class="shimmer-text shimmer short"></div>
        <div class="shimmer-text shimmer long"></div>
      </div>
      <p class="loading-text">⌛ Načítáme statistiky... prosím o moment 🌐</p>
    </div>


    <div v-else class="stats-grid">
      <div class="stat-card">
        <span class="emoji">📊</span>
        <div class="stat-content">
          <h3>Most Frequent Bad Status</h3>
          <p>ID: <strong>{{ props.mostFrequentBadStatus.id }} - {{ props.mostFrequentBadStatus.description }}</strong>
          </p>
          <p>Count: <strong>{{ props.mostFrequentBadStatus.count }}×</strong></p>
        </div>
      </div>

      <div class="stat-card">
        <span class="emoji">🕓</span>
        <div class="stat-content">
          <h3>Last Bad Status</h3>
          <p>{{ props.lastBadStatus?.formattedTime || "—" }}</p>
        </div>
      </div>

      <div class="stat-card">
        <span class="emoji">📅</span>
        <div class="stat-content">
          <h3>Bad Status Last 2 Days</h3>
          <p><strong>{{ props.badStatusCountLastTwoDays }}</strong> total</p>
        </div>
      </div>

      <div class="stat-card">
        <span class="emoji">⚠️</span>
        <div class="stat-content">
          <h3>Bad Status Ratio</h3>
          <p><strong>{{ props.badStatusRatio }}%</strong></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.shimmer-card {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  background: #1f1f1f;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  animation: pulse 1.5s infinite ease-in-out;
}

.shimmer {
  background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite linear;
  border-radius: 8px;
}

.shimmer-emoji {
  width: 2.5rem;
  height: 2.5rem;
}

.shimmer-text {
  height: 1rem;
  flex-grow: 1;
}

.shimmer-text.short {
  width: 30%;
}

.shimmer-text.long {
  width: 60%;
}

.loading-text {
  font-size: 1.1rem;
  color: #aaa;
  text-align: center;
  margin-top: 1rem;
  font-style: italic;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.01);
    opacity: 0.9;
  }
}

.statistics-panel {
  width: 30%;
  max-width: 50vw;
  height: 100%;
  background: linear-gradient(to bottom right, #1e1e1e, #2a2a2a);
  color: #ffffff;
  padding: 2rem;
  border-radius: 1.5rem;
}

h2 {
  font-size: 1.75rem;
  text-align: center;
  margin-bottom: 1.5rem;
}

.stats-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.stat-card {
  display: flex;
  background: #292929;
  border-radius: 1rem;
  padding: 1rem;
  align-items: flex-start;
  gap: 1rem;
  transition: transform 0.2s ease;
}



.emoji {
  font-size: 2rem;
}

.stat-content h3 {
  margin: 0 0 0.4rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: #60a5fa;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 0.25rem;
}

.stat-content p {
  margin: 0.2rem 0;
  font-size: 1rem;
}
</style>
