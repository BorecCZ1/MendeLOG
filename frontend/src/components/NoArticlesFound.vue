<template>
  <div class="no-logs-container">
    <h3>Sorry, no logs were found</h3>
    <p>We couldn't find any logs matching your filters or search. Please adjust your filters or search query.</p>
  </div>
</template>

<style scoped>
.no-logs-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: white;
  background-color: #333;
  border-radius: 1vh;
  padding: 2rem;
  text-align: center;
}

.no-logs-container h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.no-logs-container p {
  font-size: 1rem;
}
</style>
