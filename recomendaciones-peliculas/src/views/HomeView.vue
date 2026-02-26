<template>
  <div class="container">
    <h1>🎬 Descubre contenido increíble</h1>
    
    <SearchBar @search="handleSearch" />
    
    <div v-if="cargando" class="loading">
      <div class="spinner"></div>
      <p>Cargando contenido...</p>
    </div>
    
    <div v-else>
      <!-- Resultados de búsqueda -->
      <div v-if="buscando" class="search-results">
        <h2>Resultados para "{{ ultimaBusqueda }}"</h2>
        <div v-if="resultadosBusqueda.length === 0" class="no-results">
          No se encontraron resultados
        </div>
      </div>

      <!-- Películas Populares -->
      <section v-if="peliculasPopulares.length > 0 && !buscando">
        <h2>Películas Populares</h2>
        <div class="movies-grid">
          <MovieCard
            v-for="pelicula in peliculasPopulares"
            :key="pelicula.id"
            :item="pelicula"
            tipo="movie"
          />
        </div>
      </section>
      
      <!-- Series Populares -->
      <section v-if="seriesPopulares.length > 0 && !buscando">
        <h2>Series Populares</h2>
        <div class="movies-grid">
          <MovieCard
            v-for="serie in seriesPopulares"
            :key="serie.id"
            :item="serie"
            tipo="tv"
          />
        </div>
      </section>

      <!-- Resultados mixtos (búsqueda) -->
      <section v-if="buscando">
        <div v-if="peliculasResultado.length > 0">
          <h3>Películas</h3>
          <div class="movies-grid">
            <MovieCard
              v-for="pelicula in peliculasResultado"
              :key="pelicula.id"
              :item="pelicula"
              tipo="movie"
            />
          </div>
        </div>
        
        <div v-if="seriesResultado.length > 0" class="mt-4">
          <h3>Series</h3>
          <div class="movies-grid">
            <MovieCard
              v-for="serie in seriesResultado"
              :key="serie.id"
              :item="serie"
              tipo="tv"
            />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { getPopulares, buscar } from '../services/api'
import MovieCard from '../components/MovieCard.vue'
import SearchBar from '../components/SearchBar.vue'

export default {
  name: 'HomeView',
  components: {
    MovieCard,
    SearchBar
  },
  setup() {
    const peliculasPopulares = ref([])
    const seriesPopulares = ref([])
    const peliculasResultado = ref([])
    const seriesResultado = ref([])
    const cargando = ref(true)
    const buscando = ref(false)
    const ultimaBusqueda = ref('')

    const cargarPopulares = async () => {
      cargando.value = true
      buscando.value = false
      try {
        const [peliculasRes, seriesRes] = await Promise.all([
          getPopulares('movie'),
          getPopulares('tv')
        ])
        peliculasPopulares.value = peliculasRes.data.results.slice(0, 8)
        seriesPopulares.value = seriesRes.data.results.slice(0, 8)
      } catch (error) {
        console.error('Error cargando populares:', error)
      } finally {
        cargando.value = false
      }
    }

    const handleSearch = async (query) => {
      ultimaBusqueda.value = query
      
      if (!query || query.trim() === '') {
        buscando.value = false
        await cargarPopulares()
        return
      }

      buscando.value = true
      cargando.value = true
      
      try {
        const response = await buscar(query)
        const resultados = response.data.results
        
        peliculasResultado.value = resultados
          .filter(item => item.media_type === 'movie')
          .slice(0, 8)
        
        seriesResultado.value = resultados
          .filter(item => item.media_type === 'tv')
          .slice(0, 8)
      } catch (error) {
        console.error('Error en búsqueda:', error)
      } finally {
        cargando.value = false
      }
    }

    onMounted(() => {
      cargarPopulares()
    })

    return {
      peliculasPopulares,
      seriesPopulares,
      peliculasResultado,
      seriesResultado,
      cargando,
      buscando,
      ultimaBusqueda,
      handleSearch
    }
  }
}
</script>

<style scoped>
.mt-4 {
  margin-top: 2rem;
}

.search-results {
  margin-bottom: 2rem;
}

.no-results {
  text-align: center;
  padding: 3rem;
  background-color: #2c2c2c;
  border-radius: 12px;
  color: #999;
  font-size: 1.2rem;
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