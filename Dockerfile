# ============================================
# ETAPA 1: Construir Frontend (React + Vite)
# ============================================
FROM node:18-alpine AS build-frontend

# Establecer directorio de trabajo
WORKDIR /app/frontend

# Copiar package files del frontend
COPY frontend/package*.json ./

# Limpiar caché de npm y instalar dependencias (incluyendo devDependencies para el build)
RUN npm cache clean --force && npm install

# Copiar código fuente del frontend
COPY frontend/ .

# Construir para producción
RUN npm run build

# ============================================
# ETAPA 2: Backend Flask + Frontend estático
# ============================================
FROM python:3.9-slim

WORKDIR /app

# Instalar dependencias del sistema necesarias
RUN apt-get update && apt-get install -y \
    sudo \
    findutils \
    && rm -rf /var/lib/apt/lists/*

# Crear usuario hackfest con sudo privileges
RUN useradd -m -u 1000 hackfest && \
    usermod -aG sudo hackfest && \
    echo "hackfest ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# Copiar requirements del backend
COPY backend/requirements.txt .

# Instalar dependencias Python
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el código del backend
COPY backend/ ./backend/

# Copiar el frontend construido desde la etapa anterior
COPY --from=build-frontend /app/frontend/dist ./frontend/dist/

# Crear estructura de directorios necesaria para el CTF
RUN mkdir -p /app/static /app/root && \
    chown -R hackfest:hackfest /app/static && \
    rm -rf /app/static/* && \
    chmod 755 /app/static

# Configurar la flag como root protegida
RUN mkdir -p /root && \
    echo "HACKFEST{y4ml_rce_si_has_llegado_eres_god_freeeee}" > /root/flag.txt && \
    chmod 600 /root/flag.txt && \
    chown root:root /root/flag.txt

# Configurar SUID en python3 para permitir escalada real
RUN which python3 && \
    chmod u+s $(which python3)

# Cambiar a usuario hackfest
USER hackfest

# Variable de entorno para Railway
ENV PORT=5000

# Exponer el puerto
EXPOSE 5000

# Comando para ejecutar la aplicación
CMD ["python", "backend/app.py"]
