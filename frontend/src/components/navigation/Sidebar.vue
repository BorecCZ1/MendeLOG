<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="sidebar">
    <h1 class="title">MendeLOG</h1>
    <nav>
      <RouterLink to="/">Dashboard</RouterLink>
      <RouterLink to="/logs">Logs</RouterLink>
      <RouterLink to="/suspicious">Suspicious Activity</RouterLink>
    </nav>
  </div>
</template>

<style scoped>

.sidebar {
  width: 30vh;
  height: 100vh;
  background-color: #2c3e50;
  color: white;
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 20px;
  margin-bottom: 20px;
}

nav {
  display: flex;
  flex-direction: column;
}

nav a {
  color: white;
  text-decoration: none;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}

nav a:hover {
  background-color: #34495e;
}
</style>
