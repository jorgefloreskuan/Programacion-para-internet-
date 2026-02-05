# 🎮 Adivina el Número (Dark Arcade Style)

Un minijuego de lógica clásico desarrollado con JavaScript, diseñado con una estética moderna de tipo "Arcade Oscuro" con colores neón.

<img width="1920" height="1041" alt="image" src="https://github.com/user-attachments/assets/d38df819-ea45-4f4f-b55d-9750d5e52277" />


## 🕹️ ¿En qué consiste?

El sistema elige un número aleatorio entre el **1 y el 100**. Tu misión es adivinar cuál es ese número en un máximo de **10 intentos**.

El juego te ayudará dándote pistas después de cada intento:
* 🟢 **¡Correcto!** Ganaste el juego.
* 🔴 **¡Incorrecto!** El juego te dirá si el número secreto es **mayor** o **menor** que el que escribiste.

## ✨ Características

* **Interfaz Dark Arcade:** Diseño moderno con fondo oscuro (`#0f172a`) y acentos neón (Violeta, Verde, Cian).
* **Lógica en Tiempo Real:** Feedback inmediato sobre si tu número es muy alto o muy bajo.
* **Historial de Intentos:** Muestra los números que ya probaste para que no los repitas.
* **Contador de Vidas:** Tienes un límite de 10 intentos antes del "Game Over".
* **Reinicio:** Botón para comenzar una nueva partida sin recargar la página.

## 🛠️ Tecnologías Utilizadas

* **HTML5:** Estructura semántica.
* **CSS3:** Flexbox, sombras, transiciones y tipografía 'Poppins' de Google Fonts.
* **JavaScript (ES6):** Manipulación del DOM, condicionales, bucles y generación de números aleatorios (`Math.random`).

## 🚀 Cómo jugar

1.  **Descarga** el proyecto o clona el repositorio.
2.  Abre el archivo `index.html` en tu navegador.
3.  Escribe un número en la casilla violeta.
4.  Presiona **"Probar suerte"** o la tecla Enter.
5.  ¡Sigue las pistas hasta ganar!

## 📂 Estructura de Archivos

```text
├── index.html      # Estructura del juego
├── styles.css      # Estilos visuales (Tema Dark Arcade)
├── script.js       # Lógica del juego
└── README.md       # Este archivo
