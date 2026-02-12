# 💰 Billetera Pro - Control de Gastos Personal

Aplicación web Full Stack para la gestión de finanzas personales. Permite registrar ingresos y gastos, visualizar el balance en tiempo real y analizar la distribución del dinero mediante gráficos interactivos.

El proyecto está construido con una arquitectura ligera utilizando **Node.js** y almacenamiento en archivos JSON, desplegado en la nube.

🔗 https://control-de-gastos-nmtf.onrender.com/

---

## 🚀 Características Principales

* **Registro de Movimientos:** Agrega ingresos y gastos con descripción, monto y fecha.
* **Balance en Tiempo Real:** Cálculo automático de saldo total, ingresos y gastos.
* **Visualización de Datos:** Gráfica de dona (Chart.js) que se actualiza dinámicamente.
* **Persistencia de Datos:** Los datos se guardan en un archivo `transacciones.json` (base de datos ligera).
* **Diseño Responsivo:** Interfaz moderna y adaptada a móviles usando **Bootstrap 5**.
* **Gestión de Fechas:** Ordenamiento cronológico de las transacciones.

## 🛠️ Tecnologías Utilizadas

### Backend
* **Node.js**: Entorno de ejecución.
* **Express**: Framework para manejar el servidor y las rutas API.
* **File System (fs)**: Módulo nativo para lectura/escritura de datos JSON.
* **Cors**: Para gestión de seguridad en peticiones HTTP.

### Frontend
* **HTML5 / CSS3**: Estructura y estilos.
* **Bootstrap 5**: Framework de diseño para la interfaz de usuario.
* **Chart.js**: Librería para la generación de gráficos estadísticos.
* **JavaScript (Vanilla)**: Lógica del cliente y consumo de API (Fetch).

---

## 🔧 Instalación y Ejecución Local

Si deseas correr este proyecto en tu computadora:

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/TU_USUARIO/TU_REPO.git](https://github.com/TU_USUARIO/TU_REPO.git)
    cd TU_REPO
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Iniciar el servidor:**
    ```bash
    npm start
    ```
    *O alternativamente: `node server.js`*

4.  **Abrir en el navegador:**
    Visita `http://localhost:3000`

---

## 📡 Endpoints de la API

La aplicación cuenta con una API RESTful interna:

| Método | Endpoint              | Descripción                          |
| :----- | :-------------------- | :----------------------------------- |
| `GET`  | `/api/transacciones`  | Obtiene todas las transacciones.     |
| `POST` | `/api/transacciones`  | Crea un nuevo ingreso o gasto.       |
| `DELETE`| `/api/transacciones/:id` | Elimina una transacción por su ID. |

---

## ☁️ Notas sobre el Despliegue (Render)

Este proyecto está desplegado en el **Plan Gratuito (Free Tier)** de Render.

> **⚠️ Nota Importante sobre los Datos:**
> Debido a que el sistema de archivos en el plan gratuito de Render es **efímero** (temporal), el archivo `transacciones.json` se reiniciará cada vez que el servidor entre en modo de suspensión (aprox. 15 minutos de inactividad) o se redespliegue.
>
> Para persistencia permanente en producción, se recomendaría conectar una base de datos como MongoDB Atlas.

---


