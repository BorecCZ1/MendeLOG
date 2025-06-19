<script setup>
import {RouterLink} from 'vue-router';
</script>

<template>
  <div class="sidebar">
    <h1 class="title">MendeLOG</h1>
    <nav>
      <RouterLink to="/" class="nav-item">Dashboard</RouterLink>
      <RouterLink to="/logs" class="nav-item">Logs</RouterLink>
      <RouterLink to="/suspicious_activity" class="nav-item">Suspicious Activity</RouterLink>
    </nav>
  </div>
</template>

<style scoped>

.sidebar {
  width: 15vw;
  height: 100vh;
  background: linear-gradient(200deg, rgba(44, 62, 80, 0.89), rgba(26, 188, 156, 0.76));
  color: #ecf0f1;
  padding: 2vh;
  position: fixed;
  grid-column: 1;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  box-shadow: 1vh 0 3vh rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease-in-out;
}

.title {
  font-size: 2.4rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 2rem;
  color: #ecf0f1;
  text-align: center;
  font-family: 'Roboto', sans-serif;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
  transition: text-shadow 0.3s ease;

}

@media (max-width: 1800px) {
  .title{
    font-size: 2rem;
  }
}

@media (max-width: 1400px) {
  .title{
    font-size: 1.5rem;
  }
}

nav {
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  gap: 1.5rem;
}

.nav-item {
  display: block;
  font-size: 1.2rem;
  font-weight: 600;
  text-decoration: none;
  color: #ecf0f1;
  padding: 1vh 2vh;
  border-radius: 1vh;
  transition: background-color 0.3s ease, transform 0.2s ease, padding 0.2s ease;
}

.nav-item:hover {
  background-color: #16a085;
  transform: scale(1.05);
  padding-left: 3vh;
  cursor: pointer;
}

.nav-item.router-link-exact-active {
  background-color: #1abc9c;
  font-weight: bold;
  color: #34495e;
}

nav .nav-item:active {
  background-color: #1abc9c;
  transform: scale(0.98);
}

.sidebar::after {
  content: '';
  position: absolute;
  bottom: 2vh;
  width: 85%;
  height: 0.5vh;
  background-color: #ecf0f1;
  margin: 0 auto;
  border-radius: 5vh;
}

</style>
