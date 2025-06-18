<script setup lang="ts">

</script>

<template>
  <div class="placeholder-card">
    <div class="icon">✅</div>
    <div class="text">
      <h3>All clear!</h3>
      <p>No problematic articles found.</p>
    </div>
  </div>
</template>

<style scoped>
.placeholder-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 1vh;
  background-color: #1e1e1e;
  color: #ccc;
  padding: 4vh 2vh;
  width: 100%;
  min-height: 30vh;
  border: 2px dashed #4caf50;
  text-align: center;
}

.icon {
  font-size: 4rem;
  margin-bottom: 1vh;
}

.text h3 {
  font-size: 1.6rem;
  margin-bottom: 0.5vh;
}

.text p {
  font-size: 1.1rem;
  color: #aaa;
}
</style>
