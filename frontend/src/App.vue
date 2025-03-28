<script setup>
import Sidebar from './components/navigation/Sidebar.vue';
</script>

<template>
  <div class="app-container">
    <Sidebar />
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  height: 100vh;
  width: 170vh;
}

.content {
  flex-grow: 1;
  padding: 20px;
  overflow-x: hidden;
}

</style>
