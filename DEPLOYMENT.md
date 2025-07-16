# 🚀 Hackfest CTF - Guía de Despliegue Monolito

## 📋 Estructura del Monolito

```
hackfest/
├── frontend/          # React + Vite (build → dist/)
├── backend/           # Flask (sirve API + frontend estático)
├── Dockerfile         # Multi-stage: Node.js build + Python runtime
├── requirements.txt   # Dependencias Python
├── railway.json       # Configuración Railway
└── docker-compose.local.yml  # Testing local
```

## 🧪 Testing Local

### Opción 1: Docker Compose (Recomendado)
```bash
# Build y ejecutar
docker-compose -f docker-compose.local.yml up --build

# Acceder a la aplicación
open http://localhost:3000
```

### Opción 2: Docker directo
```bash
# Build del Dockerfile
docker build -t hackfest-monolith .

# Ejecutar el contenedor
docker run -p 3000:5000 -e PORT=5000 hackfest-monolith

# Acceder a la aplicación
open http://localhost:3000
```

### Opción 3: Desarrollo separado (para debugging)
```bash
# Terminal 1: Backend
cd backend
pip install -r requirements.txt
python app.py

# Terminal 2: Frontend
cd frontend
npm install
npm run build  # Para probar el build estático
# o
npm run dev    # Para desarrollo con hot reload
```

## 🚀 Despliegue en Railway

### Setup en Railway
1. **Crear proyecto**: [Railway Dashboard](https://railway.app/dashboard)
2. **Conectar GitHub**: Deploy from GitHub repository
3. **Auto-deploy**: Railway detecta `Dockerfile` automáticamente
4. **URL generada**: `https://tu-proyecto.up.railway.app`

### Comandos Git
```bash
# Añadir todos los cambios
git add .

# Commit con el monolito
git commit -m "Configure monolith for Railway deployment"

# Push para trigger deploy
git push origin main
```

### Variables de Entorno (Railway)
```
PORT=5000  # (Auto configurado por Railway)
```

## 🌐 URLs del Monolito

Una vez desplegado, tendrás una sola URL que sirve:

### Frontend (React)
- `/` - Home page con eventos
- `/event/1` - Detalle de evento
- *Cualquier ruta del frontend* → React Router

### Backend API (Flask)
- `/api/festival` - Info del festival
- `/api/artists` - Lista de artistas
- `/api/hints` - Pistas cifradas
- `/config` - **Endpoint vulnerable** (PyYAML RCE)
- `/robots.txt` - Archivo robots
- `/api/status` - Health check
- `/uploads/<filename>` - Archivos exfiltrados

## 🔍 Testing CTF

```bash
# Health check
curl https://tu-proyecto.up.railway.app/api/status

# Endpoint vulnerable
curl -X POST \
  -H "Content-Type: application/x-yaml" \
  -d "test: value" \
  https://tu-proyecto.up.railway.app/config

# Pistas del CTF
curl https://tu-proyecto.up.railway.app/api/hints
```

## ⚡ Características del Monolito

✅ **Frontend React** servido estáticamente desde Flask
✅ **Backend Flask** con todos los endpoints del CTF
✅ **Un solo contenedor** - fácil de desplegar
✅ **Un solo dominio** - sin CORS issues
✅ **React Router** funciona correctamente
✅ **Build optimizado** con multi-stage Docker
✅ **Configuración Railway** incluida

## 🚨 Endpoints CTF Principales

1. **`/api/hints`** - Pistas cifradas Caesar (VII = 7)
2. **`/config`** - Vulnerabilidad PyYAML RCE
3. **`/api/system`** - Info del sistema para escalada
4. **`/uploads/<filename>`** - Directorio de exfiltración

¡Tu CTF está listo para ser hackeado! 🎯
