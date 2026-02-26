# 🎬 App de Recomendaciones de Películas y Series

Una aplicación web moderna para descubrir películas y series populares, buscar contenido y ver detalles completos. Construida con Vue.js y la API de TMDB.

![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?logo=vue.js)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)
![TMDB API](https://img.shields.io/badge/TMDB-API-01D277?logo=the-movie-database)
![License](https://img.shields.io/badge/license-MIT-blue)

## ✨ Características

- 🎯 **Descubre contenido popular**: Películas y series más populares del momento
- 🔍 **Búsqueda avanzada**: Encuentra cualquier película o serie por título
- 📱 **Diseño responsive**: Funciona perfectamente en móviles, tablets y desktop
- ⭐ **Calificaciones**: Visualiza las calificaciones de TMDB
- 📺 **Detalles completos**: Sinopsis, géneros, año, productoras y más
- 🎨 **Interfaz moderna**: Diseño oscuro con acentos en rojo (estilo Netflix)
- 🚀 **Carga rápida**: Lazy loading de imágenes y paginación

## 🛠️ Tecnologías Utilizadas

- **Vue.js 3** - Framework progresivo de JavaScript
- **Vue Router 4** - Navegación entre páginas
- **Axios** - Peticiones HTTP a la API
- **Vite** - Build tool y servidor de desarrollo
- **TMDB API** - Fuente de datos de películas y series

## 📸 Capturas de Pantalla

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/3c9c5af2-0dd2-4137-9b38-371010d1d525" />



## 🚀 Demo en Vivo

🔗 https://recomendaciones-peliculas-y-series.onrender.com/peliculas 

## 📋 Prerrequisitos

- Node.js (v14 o superior)
- NPM o Yarn
- Cuenta en [TMDB](https://www.themoviedb.org/) (para API Key)

## 🔧 Instalación

Sigue estos pasos para tener el proyecto en local:

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/tu-repositorio.git

# Entrar al directorio
cd tu-repositorio

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Edita .env y agrega tu API Key de TMDB

# Ejecutar en modo desarrollo
npm run dev
