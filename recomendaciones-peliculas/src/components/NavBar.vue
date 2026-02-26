<template>
  <nav class="navbar">
    <div class="nav-container">
      <router-link to="/" class="logo">
        🎬 Recomendaciones
      </router-link>
      <div class="nav-links">
        <router-link to="/" class="nav-link" :class="{ active: $route.path === '/' }">
          Inicio
        </router-link>
        <router-link to="/peliculas" class="nav-link" :class="{ active: $route.path === '/peliculas' }">
          Películas
        </router-link>
        <router-link to="/series" class="nav-link" :class="{ active: $route.path === '/series' }">
          Series
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style scoped>
.navbar {
  background-color: #000;
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0,0,0,0.5);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.logo {
  color: #e50914;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s;
}

.logo:hover {
  color: #ff0f1c;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s;
  font-weight: 500;
}

.nav-link:hover {
  background-color: #333;
  transform: translateY(-2px);
}

.nav-link.active {
  background-color: #e50914;
  color: white;
}

@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    gap: 10px;
  }
  
  .nav-links {
    width: 100%;
    justify-content: center;
  }
}
</style>