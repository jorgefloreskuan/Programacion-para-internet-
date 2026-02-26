<template>
  <div class="container detalle">
    <div v-if="cargando" class="loading">
      <div class="spinner"></div>
      <p>Cargando detalles...</p>
    </div>
    
    <div v-else-if="item" class="detalle-contenido">
      <button @click="$router.back()" class="back-btn">
        ← Volver
      </button>
      
      <div class="detalle-header">
        <div class="poster-container">
          <img
            :src="posterUrl"
            :alt="item.title || item.name"
            class="detalle-poster"
          />
        </div>
        
        <div class="detalle-info">
          <h1>{{ item.title || item.name }}</h1>
          
          <div class="detalle-metadata">
            <span class="año">{{ año }}</span>
            <span class="rating">⭐ {{ item.vote_average?.toFixed(1) }}</span>
            <span class="duracion" v-if="item.runtime">
              ⏱️ {{ item.runtime }} min
            </span>
            <span class="temporadas" v-else-if="item.number_of_seasons">
              📺 {{ item.number_of_seasons }} {{ item.number_of_seasons === 1 ? 'temporada' : 'temporadas' }}
            </span>
          </div>
          
          <p class="sinopsis">{{ item.overview || 'Sin sinopsis disponible' }}</p>
          
          <div v-if="item.genres && item.genres.length" class="generos">
            <span v-for="genero in item.genres" :key="genero.id" class="genero-tag">
              {{ genero.name }}
            </span>
          </div>

          <div v-if="item.production_companies && item.production_companies.length" class="productoras">
            <h3>Productoras:</h3>
            <div class="productoras-lista">
              <span v-for="company in item.production_companies.slice(0, 3)" :key="company.id" class="productora">
                {{ company.name }}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="recomendaciones.length" class="recomendaciones">
        <h2>Más como esto</h2>
        <div class="movies-grid">
          <MovieCard
            v-for="recomendacion in recomendaciones.slice(0, 6)"
            :key="recomendacion.id"
            :item="recomendacion"
            :tipo="tipo"
          />
        </div>
      </div>
    </div>
    
    <div v-else class="error">
      <p>No se pudo cargar la información</p>
      <button @click="$router.push('/')" class="home-btn">Ir al inicio</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getDetalle, getRecomendaciones } from '../services/api'
import MovieCard from '../components/MovieCard.vue'

export default {
  name: 'DetalleView',
  components: {
    MovieCard
  },
  setup() {
    const route = useRoute()
    const item = ref(null)
    const recomendaciones = ref([])
    const cargando = ref(true)
    const tipo = ref(route.params.tipo)

    const posterUrl = computed(() => {
      if (item.value?.poster_path) {
        return `https://image.tmdb.org/t/p/w500${item.value.poster_path}`
      }
      return 'https://via.placeholder.com/500x750?text=No+Image'
    })

    const año = computed(() => {
      const fecha = item.value?.release_date || item.value?.first_air_date || ''
      return fecha.substring(0, 4)
    })

    const cargarDetalle = async () => {
      cargando.value = true
      try {
        const [detalleRes, recomendacionesRes] = await Promise.all([
          getDetalle(tipo.value, route.params.id),
          getRecomendaciones(tipo.value, route.params.id)
        ])
        
        item.value = detalleRes.data
        recomendaciones.value = recomendacionesRes.data.results
      } catch (error) {
        console.error('Error cargando detalle:', error)
      } finally {
        cargando.value = false
      }
    }

    onMounted(cargarDetalle)

    return {
      item,
      recomendaciones,
      cargando,
      tipo,
      posterUrl,
      año
    }
  }
}
</script>

<style scoped>
.back-btn {
  background: none;
  border: none;
  color: #e50914;
  font-size: 1.1rem;
  cursor: pointer;
  padding: 10px 0;
  margin-bottom: 20px;
  display: inline-flex;
  align-items: center;
  transition: transform 0.3s;
}

.back-btn:hover {
  transform: translateX(-5px);
}

.detalle-header {
  display: flex;
  gap: 40px;
  margin: 20px 0 40px;
  flex-wrap: wrap;
}

.poster-container {
  flex: 0 0 300px;
}

.detalle-poster {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.5);
}

.detalle-info {
  flex: 1;
  min-width: 300px;
}

.detalle-info h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #fff;
}

.detalle-metadata {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin: 20px 0;
  font-size: 1.1rem;
  color: #ccc;
}

.rating {
  color: #ffd700;
}

.sinopsis {
  line-height: 1.8;
  color: #ccc;
  margin: 20px 0;
  font-size: 1.1rem;
}

.generos {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin: 20px 0;
}

.genero-tag {
  background-color: #333;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  color: #fff;
}

.productoras {
  margin-top: 30px;
}

.productoras h3 {
  color: #ccc;
  margin-bottom: 10px;
  font-size: 1rem;
}

.productoras-lista {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.productora {
  background-color: #2c2c2c;
  padding: 5px 15px;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #999;
}

.recomendaciones {
  margin-top: 50px;
}

.recomendaciones h2 {
  margin-bottom: 20px;
  color: #e50914;
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

.error {
  text-align: center;
  padding: 50px;
}

.error p {
  color: #e50914;
  font-size: 1.2rem;
  margin-bottom: 20px;
}

.home-btn {
  padding: 10px 20px;
  background-color: #e50914;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.home-btn:hover {
  background-color: #b2070f;
}
</style>