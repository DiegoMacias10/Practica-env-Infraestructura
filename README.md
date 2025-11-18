# Trabajo GitHub - Infraestructura

Proyecto de práctica para demostrar el uso de variables de entorno en una aplicación React + Vite con backend FastAPI.

## 🚀 Tecnologías

- **Frontend**: React 19.2.0 + Vite 7.2.2
- **Backend**: FastAPI (Python)
- **Lenguaje**: JavaScript (JSX)

## 📋 Requisitos Previos

- Node.js 18+ y npm
- Python 3.9+ y pip
- Git

## 🔧 Instalación

### Frontend

1. **Instalar dependencias:**
```bash
npm install
```

2. **Crear archivo `.env` en la raíz del proyecto:**
```env
VITE_SHOW_PLACEHOLDERS=true
VITE_SERVER_URL=http://localhost:3000/login
```

3. **Ejecutar en modo desarrollo:**
```bash
npm run dev
```

El frontend estará disponible en: **http://localhost:5173**

### Backend

El backend se encuentra en la carpeta `../Practica-env-Infraestructura-backend/`

1. **Navegar a la carpeta del backend:**
```bash
cd ../Practica-env-Infraestructura-backend
```

2. **Crear entorno virtual (recomendado):**
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

3. **Instalar dependencias:**
```bash
pip install -r requirements.txt
```

4. **Ejecutar servidor:**
```bash
python -m uvicorn main.py --reload --port 3000
```

El backend estará disponible en: **http://localhost:3000**

## 📝 Variables de Entorno

### Frontend (`.env`)

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `VITE_SHOW_PLACEHOLDERS` | Mostrar/ocultar placeholders en los campos del formulario | `false` |
| `VITE_SERVER_URL` | URL del endpoint de login del backend | `http://localhost:3000/login` |

**Ejemplo de `.env`:**
```env
VITE_SHOW_PLACEHOLDERS=true
VITE_SERVER_URL=http://localhost:3000/login
```

> ⚠️ **Importante**: El archivo `.env` no se commitea al repositorio. Crea tu propio `.env` basándote en `.env.example` si existe.

## 🎯 Uso

1. **Iniciar el backend** (puerto 3000)
2. **Iniciar el frontend** (puerto 5173)
3. **Abrir el navegador** en `http://localhost:5173`
4. **Completar el formulario de login:**
   - Email: cualquier email válido
   - Contraseña: mínimo 3 caracteres
5. **Hacer clic en "Iniciar Sesión"**

El formulario enviará una petición POST al backend configurado en `VITE_SERVER_URL`.

## 🔌 Endpoints del Backend

- `GET /` - Ruta raíz
- `GET /health` - Verificar estado del servidor
- `POST /login` - Autenticación de usuarios
- `POST /register` - Registro de usuarios

Documentación interactiva disponible en:
- **Swagger UI**: http://localhost:3000/docs
- **ReDoc**: http://localhost:3000/redoc

## 🌿 Ramas del Proyecto

- `master` - Rama principal
- `feature/env_var_placeholder` - Implementación de variable para placeholders
- `feature/env_var_server` - Implementación de variable para URL del servidor

## 📦 Scripts Disponibles

```bash
npm run dev      # Iniciar servidor de desarrollo
npm run build    # Construir para producción
npm run preview  # Previsualizar build de producción
npm run lint     # Ejecutar ESLint
```

## 🏗️ Estructura del Proyecto

```
Practica-env-Infraestructura/
  ├── src/
  │   ├── components/
  │   │   ├── LoginForm.jsx      # Componente principal del formulario
  │   │   └── LoginForm.css       # Estilos del formulario
  │   ├── App.jsx
  │   ├── main.jsx
  │   └── index.css
  ├── public/
  ├── .env                        # Variables de entorno (NO commitear)
  ├── .env.example                # Plantilla de variables (si existe)
  ├── .gitignore
  ├── package.json
  ├── vite.config.js
  └── README.md
```

## 🔒 Seguridad

- ⚠️ Esta es una aplicación de demostración con validación básica
- ⚠️ En producción, implementar:
  - Base de datos real
  - Hash de contraseñas (bcrypt)
  - JWT tokens
  - Autenticación robusta
  - Validación de entrada más estricta

## 🐛 Solución de Problemas

### El frontend no se conecta al backend

1. Verifica que el backend esté corriendo en el puerto 3000
2. Verifica la variable `VITE_SERVER_URL` en tu archivo `.env`
3. Verifica la consola del navegador para errores de CORS
4. Asegúrate de que el backend tenga CORS configurado correctamente

### Los placeholders no aparecen

1. Verifica que `VITE_SHOW_PLACEHOLDERS=true` en tu archivo `.env`
2. Reinicia el servidor de desarrollo (`npm run dev`)

## 📚 Recursos

- [Documentación de Vite](https://vite.dev/)
- [Documentación de React](https://react.dev/)
- [Documentación de FastAPI](https://fastapi.tiangolo.com/)

## 👥 Contribución

Este proyecto es parte de una práctica académica sobre el uso de variables de entorno en aplicaciones web.
