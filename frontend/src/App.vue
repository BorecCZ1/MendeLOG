<script setup>
import Sidebar from './components/navigation/Sidebar.vue';
</script>

<template>
  <div class="app-container">
    <Sidebar/>
    <div class="content">
      <RouterView/>
    </div>
  </div>
</template>

<style scoped>

.app-container {
  display: flex;
  height: 100vh;
  width: 100vw;
  padding-left: 15vw;
  box-sizing: border-box;
  background: #181818;
}

.content {
  flex-grow: 1;
  overflow-x: hidden;
  width: calc(100% - 15vw);
  grid-column: 2;
}

</style>
