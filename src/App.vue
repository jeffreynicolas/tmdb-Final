<script setup>
import navBar from '@/components/navBar.vue';
</script>

<template>
  <navBar />
  <main>
    <router-view />
  </main>
</template>

<style>
:root {
  --primary-color: #e50914;
  --secondary-color: #564d4d;
  --background-color: #141414;
  --text-color: #ffffff;
  --card-background: #2f2f2f;
  --hover-color: #ff424f;
}

body {
  font-family: 'Roboto', sans-serif;
  background-color: var(--background-color);
  color: var(--text-color);
  margin: 0;
  padding: 0;
  min-height: 100vh;
}

#app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  color: var(--primary-color);
  text-transform: uppercase;
  letter-spacing: 2px;
}

button {
  background-color: var(--primary-color);
  color: var(--text-color);
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-radius: 5px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

button:hover {
  background-color: var(--hover-color);
}

select {
  background-color: var(--secondary-color);
  color: var(--text-color);
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 300px;
}

@media (max-width: 768px) {
  #app {
    padding: 1rem;
  }

  h1 {
    font-size: 2rem;
  }
}
</style>