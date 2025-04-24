<template>
  <div class="not-found-container">
    <!---
    <div class="illustration">
      <img src="https://cdn-0001.qstv.on.epicgames.com/DeWFZjGciBtKpknWZf/image/landscape_comp.jpeg" alt="404 Illustration" />
    </div> --->
    <div class="content">
      <h1>🚧 404 – Tady nic není</h1>
      <p>Vypadá to, že jsi se ztratil v digitálním vesmíru.<br></p>
      <router-link to="/" class="home-button">🚀 Zpátky na dashboard</router-link>
    </div>
  </div>
</template>

<style scoped>

.not-found-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 100%;
  color: #ffffff;
  padding: 2rem;
}

.illustration img {
  max-width: 40vh;
  margin-bottom: 2rem;
  opacity: 1;
  animation: float 4s infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.content h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #1abc9c;
}

.content p {
  font-size: 1.2rem;
  color: #ccc;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.home-button {
  background-color: rgba(24, 165, 137, 0.8);
  padding: 0.75rem 1.5rem;
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  border-radius: 0.75rem;
  transition: background-color 0.3s ease;
}

.home-button:hover {
  background-color: #1abc9c;
}
</style>
