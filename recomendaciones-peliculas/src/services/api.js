import axios from 'axios'

// IMPORTANTE: Regístrate en https://www.themoviedb.org/ para obtener tu API key
// Luego reemplaza 'TU_API_KEY_AQUI' con tu clave real
const API_KEY = '94ee4a5be7e627bff9f3a99c1d81165e'
const BASE_URL = 'https://api.themoviedb.org/3'

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'es-ES'
  }
})

// Obtener populares (películas o series)
export const getPopulares = (tipo, pagina = 1) => {
  return api.get(`/${tipo}/popular`, {
    params: { page: pagina }
  })
}

// Obtener detalles de una película o serie
export const getDetalle = (tipo, id) => {
  return api.get(`/${tipo}/${id}`)
}

// Búsqueda de contenido
export const buscar = (query, pagina = 1) => {
  return api.get('/search/multi', {
    params: {
      query,
      page: pagina
    }
  })
}

// Obtener recomendaciones
export const getRecomendaciones = (tipo, id) => {
  return api.get(`/${tipo}/${id}/recommendations`)
}