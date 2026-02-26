<template>
  <div class="movie-card" @click="verDetalle">
    <div class="image-container">
      <img 
        :src="posterUrl" 
        :alt="item.title || item.name"
        class="movie-image"
        loading="lazy"
      />
      <div class="rating-badge">
        ⭐ {{ item.vote_average?.toFixed(1) }}
      </div>
    </div>
    <div class="movie-info">
      <h3>{{ item.title || item.name }}</h3>
      <p class="year">{{ año }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovieCard',
  props: {
    item: {
      type: Object,
      required: true
    },
    tipo: {
      type: String,
      required: true
    }
  },
  computed: {
    posterUrl() {
      if (this.item.poster_path) {
        return `https://image.tmdb.org/t/p/w500${this.item.poster_path}`
      }
      return 'https://via.placeholder.com/500x750?text=No+Image'
    },
    año() {
      const fecha = this.item.release_date || this.item.first_air_date || ''
      return fecha.substring(0, 4)
    }
  },
  methods: {
    verDetalle() {
      this.$router.push({
        name: 'detalle',
        params: {
          id: this.item.id,
          tipo: this.tipo
        }
      })
    }
  }
}
</script>

<style scoped>
.movie-card {
  background-color: #2c2c2c;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0,0,0,0.3);
}

.movie-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 12px 20px rgba(229, 9, 20, 0.3);
}

.image-container {
  position: relative;
  width: 100%;
  padding-top: 150%; /* Proporción 2:3 */
  overflow: hidden;
}

.movie-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.movie-card:hover .movie-image {
  transform: scale(1.1);
}

.rating-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.8);
  color: #ffd700;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
  z-index: 1;
}

.movie-info {
  padding: 15px;
}

.movie-info h3 {
  font-size: 1rem;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #fff;
}

.year {
  color: #999;
  font-size: 0.9rem;
}
</style>