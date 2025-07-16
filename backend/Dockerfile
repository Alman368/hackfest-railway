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

# Copiar requirements primero para aprovechar el cache de Docker
COPY requirements.txt .

# Instalar dependencias Python (incluyendo la versión vulnerable de PyYAML)
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el código de la aplicación
COPY . .

# Crear estructura de directorios
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

# Exponer el puerto
EXPOSE 5000

# Comando para ejecutar la aplicación
CMD ["python", "app.py"]
