<template>
  <div class="container">
    <h1>🎬 Películas Populares</h1>
    
    <SearchBar @search="handleSearch" placeholder="Buscar películas..." />
    
    <div v-if="cargando" class="loading">
      <div class="spinner"></div>
      <p>Cargando películas...</p>
    </div>
    
    <div v-else>
      <div v-if="buscando" class="search-info">
        <h3>Resultados para: "{{ ultimaBusqueda }}"</h3>
        <button @click="resetBusqueda" class="reset-btn">Ver todas</button>
      </div>
      
      <div class="movies-grid">
        <MovieCard
          v-for="pelicula in peliculas"
          :key="pelicula.id"
          :item="pelicula"
          tipo="movie"
        />
      </div>
      
      <div v-if="!buscando" class="pagination">
        <button @click="paginaAnterior" :disabled="pagina === 1" class="page-btn">
          ← Anterior
        </button>
        <span class="page-info">Página {{ pagina }} de {{ totalPaginas }}</span>
        <button @click="paginaSiguiente" :disabled="pagina === totalPaginas" class="page-btn">
          Siguiente →
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { getPopulares, buscar } from '../services/api'
import MovieCard from '../components/MovieCard.vue'
import SearchBar from '../components/SearchBar.vue'

export default {
  name: 'PeliculasView',
  components: {
    MovieCard,
    SearchBar
  },
  setup() {
    const peliculas = ref([])
    const cargando = ref(true)
    const pagina = ref(1)
    const totalPaginas = ref(1)
    const buscando = ref(false)
    const ultimaBusqueda = ref('')

    const cargarPeliculas = async () => {
      cargando.value = true
      buscando.value = false
      try {
        const response = await getPopulares('movie', pagina.value)
        peliculas.value = response.data.results
        totalPaginas.value = response.data.total_pages
      } catch (error) {
        console.error('Error cargando películas:', error)
      } finally {
        cargando.value = false
      }
    }

    const handleSearch = async (query) => {
      ultimaBusqueda.value = query
      
      if (!query || query.trim() === '') {
        await resetBusqueda()
        return
      }

      buscando.value = true
      cargando.value = true
      
      try {
        const response = await buscar(query)
        peliculas.value = response.data.results
          .filter(item => item.media_type === 'movie')
      } catch (error) {
        console.error('Error en búsqueda:', error)
      } finally {
        cargando.value = false
      }
    }

    const resetBusqueda = async () => {
      await cargarPeliculas()
    }

    const paginaAnterior = () => {
      if (pagina.value > 1) {
        pagina.value--
      }
    }

    const paginaSiguiente = () => {
      if (pagina.value < totalPaginas.value) {
        pagina.value++
      }
    }

    onMounted(cargarPeliculas)
    watch(pagina, cargarPeliculas)

    return {
      peliculas,
      cargando,
      pagina,
      totalPaginas,
      buscando,
      ultimaBusqueda,
      handleSearch,
      resetBusqueda,
      paginaAnterior,
      paginaSiguiente
    }
  }
}
</script>

<style scoped>
.search-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  padding: 15px;
  background-color: #2c2c2c;
  border-radius: 8px;
}

.reset-btn {
  padding: 8px 16px;
  background-color: #e50914;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.reset-btn:hover {
  background-color: #b2070f;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 40px;
  padding: 20px;
}

.page-btn {
  padding: 10px 20px;
  background-color: #e50914;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: bold;
}

.page-btn:hover:not(:disabled) {
  background-color: #b2070f;
  transform: translateY(-2px);
}

.page-btn:disabled {
  background-color: #666;
  cursor: not-allowed;
  opacity: 0.5;
}

.page-info {
  font-size: 1.1rem;
  color: #fff;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #333;
  border-top-color: #e50914;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 20px auto;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>