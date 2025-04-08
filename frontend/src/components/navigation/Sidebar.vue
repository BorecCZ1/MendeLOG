<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="sidebar">
    <h1 class="title">MendeLOG</h1>
    <nav>
      <RouterLink to="/" class="nav-item">Dashboard</RouterLink>
      <RouterLink to="/logs" class="nav-item">Logs</RouterLink>
      <RouterLink to="/suspicious" class="nav-item">Suspicious Activity</RouterLink>
    </nav>
  </div>
</template>

<style scoped>
/* Sidebar */
.sidebar {
  width: 250px;
  height: 100vh;
  background: linear-gradient(135deg, #2c3e50, #34495e);
  color: #ecf0f1;
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
}

.title {
  font-size: 2.2rem;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 2rem;
  color: #ecf0f1;
  text-align: center;
  font-family: 'Roboto', sans-serif;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.6);
}

nav {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  gap: 1.5rem;
}

.nav-item {
  display: block;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  color: #ecf0f1;
  padding: 10px 15px;
  border-radius: 8px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.nav-item:hover {
  background-color: #16a085;
  transform: scale(1.05);
}

.nav-item.router-link-exact-active {
  background-color: #1abc9c;
  font-weight: bold;
}

nav .nav-item:hover {
  background-color: #16a085;
  cursor: pointer;
}

.sidebar::after {
  content: '';
  position: absolute;
  bottom: 2vh;
  width: 85%;
  height: 2px;
  background-color: #ecf0f1;
  margin: 0 auto;
}
</style>
