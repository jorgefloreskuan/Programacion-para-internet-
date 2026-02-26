<template>
  <div class="search-container">
    <input
      type="text"
      v-model="searchQuery"
      @input="handleSearch"
      :placeholder="placeholder"
      class="search-input"
    />
    <span v-if="searchQuery" class="clear-btn" @click="clearSearch">✕</span>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'SearchBar',
  props: {
    placeholder: {
      type: String,
      default: 'Buscar películas o series...'
    }
  },
  emits: ['search'],
  setup(props, { emit }) {
    const searchQuery = ref('')
    let searchTimeout = null

    const handleSearch = () => {
      clearTimeout(searchTimeout)
      searchTimeout = setTimeout(() => {
        emit('search', searchQuery.value)
      }, 500) // Espera 500ms después de que el usuario deje de escribir
    }

    const clearSearch = () => {
      searchQuery.value = ''
      emit('search', '')
    }

    return {
      searchQuery,
      handleSearch,
      clearSearch
    }
  }
}
</script>

<style scoped>
.search-container {
  margin: 20px 0;
  position: relative;
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 15px 45px 15px 20px;
  font-size: 1.1rem;
  border: none;
  border-radius: 50px;
  background-color: #333;
  color: #fff;
  transition: all 0.3s;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
}

.search-input:focus {
  outline: none;
  background-color: #404040;
  box-shadow: 0 2px 20px rgba(229, 9, 20, 0.3);
}

.search-input::placeholder {
  color: #999;
  font-style: italic;
}

.clear-btn {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
  transition: color 0.3s;
}

.clear-btn:hover {
  color: #e50914;
}
</style>