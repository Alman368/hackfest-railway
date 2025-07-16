# 🚩 HackFest CTF - Real World Privilege Escalation

## 📋 **DESCRIPCIÓN**

CTF que simula una escalada de privilegios real en un sistema Linux, utilizando técnicas de RCE (Remote Code Execution) y escalada de privilegios del mundo real con **interfaz web completa**.

## 🎯 **OBJETIVO**

Obtener la flag ubicada en `/root/flag.txt` utilizando:
1. Criptoanálisis para acceder al endpoint vulnerable
2. Explotación de RCE mediante PyYAML
3. Escalada de privilegios real usando técnicas SUID
4. Exfiltración de datos a directorio web-accesible

## 🐳 **DESPLIEGUE CON DOCKER**

### Requisitos
- Docker
- Docker Compose
- Sistema Linux

### Instalación
```bash
# Clonar repositorio
git clone <repositorio>
cd hackfest

# Desplegar con Docker
sudo docker-compose up -d

# Verificar que están funcionando
curl http://localhost:5000/  # Backend API
curl http://localhost:3001/  # Frontend Web
```

### Acceso al CTF
- **🌐 Frontend Web**: http://localhost:3001 (Interfaz gráfica del CTF)
- **🔌 Backend API**: http://localhost:5000 (API para exploits directos)

### Verificación
```bash
# Comprobar que ambos servicios están activos
sudo docker ps | grep hackfest

# Ver logs si hay problemas
sudo docker logs hackfest_frontend_1
sudo docker logs hackfest_backend_1
```

## 🔧 **ESTRUCTURA DEL PROYECTO**

```
hackfest/
├── frontend/                  # React + Nginx Frontend
│   ├── src/
│   │   ├── App.js            # Componente principal React
│   │   ├── index.js          # Punto de entrada
│   │   └── index.css         # Estilos del CTF
│   ├── public/
│   │   └── index.html        # HTML principal
│   ├── package.json          # Dependencias React
│   ├── nginx.conf           # Configuración proxy Nginx
│   └── Dockerfile           # Imagen Docker frontend
├── backend/                  # Flask + Python Backend
│   ├── app.py               # Aplicación Flask vulnerable
│   ├── requirements.txt     # Dependencias Python
│   ├── Dockerfile          # Imagen Docker backend
│   ├── root/               # Directorio protegido
│   │   └── flag.txt        # Flag objetivo
│   └── static/             # Directorio web-accesible
├── docker-compose.yml      # Configuración Docker Compose
├── exploit.py              # Script de exploit completo
├── WRITEUP.md             # Solución paso a paso
└── README.md              # Este archivo
```

## 🎓 **TÉCNICAS IMPLEMENTADAS**

- **🔐 Criptoanálisis**: Descifrado de Caesar cipher
- **💻 RCE**: Explotación de PyYAML unsafe load
- **⬆️ Escalada de privilegios**: Uso de SUID binaries (python3)
- **📤 Exfiltración**: Copia de archivos a directorio web-accesible
- **🔍 Reconocimiento**: Enumeración de sistema post-explotación

## 🎮 **MODOS DE JUEGO**

### **🌐 Interfaz Web (Principiantes)**
```
1. Acceder a: http://localhost:3001
2. Navegar por las secciones:
   - 🏠 Inicio: Información del festival comprometido
   - 💻 Sistema: Reconocimiento y enumeración
   - 💡 Pistas: Mensajes cifrados Caesar
3. Usar la información para exploits manuales
```

### **🔌 API Directa (Avanzados)**
```
1. Usar comandos curl directos contra http://localhost:5000
2. Seguir el writeup para exploits paso a paso
3. Ejecutar el script exploit.py para demostración automática
```

## 🐋 **ARQUITECTURA DOCKER**

```
┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │
│   (React)       │────│    (Flask)      │
│   Port: 3001    │    │   Port: 5000    │
└─────────────────┘    └─────────────────┘
         │                       │
    ┌─────────┐              ┌─────────┐
    │  Nginx  │              │  Python │
    │ Proxy   │              │   App   │
    └─────────┘              └─────────┘
```

### **Frontend (React + Nginx)**
- **Build Stage**: Node.js para compilar React
- **Production Stage**: Nginx con proxy hacia backend
- **Features**: Interfaz moderna, terminal simulado, navegación intuitiva

### **Backend (Flask + Python)**
- **Vulnerabilidades**: PyYAML RCE, información leakage
- **Escalada Real**: SUID python3, técnicas GTFObins
- **Exfiltración**: Directorio web-accesible simulando `/var/www/html`

## 🚀 **INICIO RÁPIDO**

```bash
# 1. Desplegar CTF
sudo docker-compose up -d

# 2. Acceder vía web (principiantes)
xdg-open http://localhost:3001

# 3. O usar exploit directo (avanzados)
python3 exploit.py

# 4. Ver solución completa
cat WRITEUP.md
```

## 🏆 **FLAG FORMAT**

`HACKFEST{y4ml_rce_si_has_llegado_eres_god_freeeee}`

## 📖 **DOCUMENTACIÓN**

- **WRITEUP.md**: Solución completa paso a paso con comandos curl y Python
- **exploit.py**: Script automatizado que demuestra todo el flujo de ataque
- **Documentación de API**: Disponible en `/api/system` del backend

## ⚠️ **NOTAS DE SEGURIDAD**

- **USO EDUCATIVO ÚNICAMENTE**: Contiene vulnerabilidades intencionales
- **ENTORNO AISLADO**: Ejecutar solo en contenedores Docker
- **TÉCNICAS REALES**: Todas las vulnerabilidades son del mundo real
- **SIN ARTIFICIOS**: No hay mecanismos falsos o archivos mágicos

---

**🎯 ¡Demuestra tus habilidades de hacking real con técnicas auténticas de pentesting!**


📝 Updated Files:
✅ WRITEUP.md - Updated with correct commands
✅ exploit.py - Already has correct payload
✅ Backend containers - Running with proper configuration
The CTF is now fully functional and ready for deployment! 🚀
Each user must:
Discover the PyYAML RCE vulnerability
Perform privilege escalation using SUID python3
Copy and set proper permissions on the flag file
Access the flag (which gets deleted after first view)
This ensures every participant must complete the full challenge without shortcuts.
