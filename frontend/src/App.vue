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
  padding-left: 15vw; /* stejná šířka jako sidebar */
  box-sizing: border-box; /* zajistí, že padding nebude přidávat k celkové šířce */
}

.content {
  flex-grow: 1;
  padding: 2vh;
  overflow-x: hidden;
  width: calc(100% - 15vw);
  grid-column: 2;
}

</style>
