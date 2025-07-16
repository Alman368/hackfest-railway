from flask import Flask, request, jsonify, render_template_string, send_from_directory, Response
from flask_cors import CORS
import yaml
import os
import base64
import time
import random
import string

app = Flask(__name__)
CORS(app)

# Función de cifrado Caesar para las pistas
def caesar_cipher(text, shift):
    result = ""
    for char in text:
        if char.isalpha():
            ascii_offset = 65 if char.isupper() else 97
            result += chr((ord(char) - ascii_offset + shift) % 26 + ascii_offset)
        else:
            result += char
    return result

# Mensajes cifrados con Caesar (shift=7) que dan pistas sobre la vulnerabilidad
ENCRYPTED_HINTS = [
    "WFFHTS CLYZPVU MPCL MVBY VUL OHZ RUVDU PZZBLZ",
    "BUZHML SVHKLY HSSVDZ HYIPAYHYF WFAOVU LELJBAPVU",
    "JOLJR MVY VIQLJA HWWSF AHNZ PU FHTS WHYZLYZ"
]

# Datos ficticios del festival
FESTIVAL_DATA = {
    "name": "HackFest Málaga 2025",
    "dates": "15-17 Julio 2025",
    "location": "Puerto de Málaga",
    "artists": [
        {"name": "ElectroHack", "genre": "Electronic", "day": "Viernes"},
        {"name": "CyberPunk Band", "genre": "Rock", "day": "Sábado"},
        {"name": "Data Breach", "genre": "Indie", "day": "Domingo"}
    ],
    "tickets_sold": 25847,
    "status": "COMPROMETIDO - DATOS EN RIESGO"
}

@app.route('/')
def index():
    return jsonify({
        "festival": FESTIVAL_DATA,
        "warning": "⚠️ SISTEMA COMPROMETIDO ⚠️",
        "countdown": "06:23:45",
        "threat": "Los datos personales serán filtrados si no se resuelve la brecha de seguridad"
    })

@app.route('/api/festival')
def festival_info():
    return jsonify(FESTIVAL_DATA)

@app.route('/api/artists')
def artists():
    return jsonify(FESTIVAL_DATA["artists"])

@app.route('/api/tickets')
def tickets():
    return jsonify({
        "available": random.randint(50, 200),
        "sold": FESTIVAL_DATA["tickets_sold"],
        "warning": "⚠️ Los datos de compra pueden estar comprometidos"
    })

@app.route('/api/hints')
def get_hints():
    """Endpoint que devuelve pistas cifradas con Caesar"""
    return jsonify({
        "encrypted_messages": ENCRYPTED_HINTS,
        "note": "Estos mensajes parecen estar en un formato extraño... Quizás haya un patrón.",
        "cryptic_hint": "El festival fue fundado en el año... VII... Y los romanos sabían de códigos secretos."
    })

@app.route('/hints')
def hints():
    """Endpoint comprometido que devuelve pistas del atacante"""
    # Pistas realistas del atacante con Caesar VII (7)
    attacker_hints = {
        "hints": [
            {
                "id": 1,
                "title": "Mensaje Interceptado del Atacante #1",
                "content": "Ol lunz jvykpun pz jvtwslatl. Zwajphs jvumpn lhkly xbpjrs tlvlk.",
                "difficulty": "Básico",
                "hint": "🔑 Clave encontrada en números romanos: VII",
                "decoded": "Tu web festiva es completamente vulnerable. Acceso admin logrado rapido."
            },
            {
                "id": 2,
                "title": "Comunicación del Atacante #2",
                "content": "Phts jvumpn vwlu pz hjjlzzpilu. Zluk wvzaz khjhtluz uva zlj.",
                "difficulty": "Básico",
                "hint": "🔑 Misma clave romana VII - El atacante es consistente",
                "decoded": "Yaml config open es accessible. Puedo ejecutar comandos sin seguridad."
            },
            {
                "id": 3,
                "title": "Instrucciones del Atacante #3",
                "content": "Bzl w`aovu3 zpk mvy yvva ljhsavul. Hss jhzl pz johpulk uva.",
                "difficulty": "Intermedio",
                "hint": "🔑 VII (7) - Busca binarios con permisos especiales",
                "decoded": "Use python3 suid for root escalation. Todo data es comprometido ahora."
            },
            {
                "id": 4,
                "title": "Mensaje Final del Atacante",
                "content": "Mshz pz pu zhapack mlskly. Mlaypun pz dhpabuzl. Phbz jvtwslatl.",
                "difficulty": "Avanzado",
                "hint": "🔑 Clave VII - ¿Dónde guarda la evidencia?",
                "decoded": "Flag es en static folder. Festival es vulnerable. Chaos completo."
            }
        ],
        "note": "💀 Mensajes dejados por ShadowByte Collective",
        "cryptic_hint": "El número romano VII es la clave para descifrar toda la comunicación",
        "warning": "Estos mensajes fueron interceptados del canal de comunicación del atacante"
    }

    return jsonify(attacker_hints)

@app.route('/api/decrypt', methods=['POST'])
def decrypt_caesar():
    """Endpoint para ayudar a descifrar mensajes Caesar (pista para los estudiantes)"""
    data = request.get_json()
    message = data.get('message', '')
    shift = data.get('shift', 0)

    try:
        decrypted = caesar_cipher(message, -shift)
        return jsonify({"decrypted": decrypted})
    except:
        return jsonify({"error": "Error en el descifrado"}), 400

@app.route('/config', methods=['POST'])
def config():
    """
    🚨 VULNERABILIDAD PRINCIPAL: PyYAML RCE
    Este endpoint acepta configuración YAML y la procesa sin safe_load
    """
    content_type = request.headers.get('Content-Type', '')
    data = request.data

    if not data:
        return jsonify({
            "error": "No se proporcionó configuración",
            "expected_format": "YAML configuration data",
            "content_type": "application/x-yaml or text/yaml"
        }), 400

    # Si no es YAML, dar pista sobre el formato esperado
    if 'yaml' not in content_type.lower():
        return jsonify({
            "error": "Formato de configuración no válido",
            "expected": "Content-Type: application/x-yaml",
            "received": content_type,
            "hint": "Este endpoint procesa configuraciones en formato YAML"
        }), 415

    try:
        # 🚨 VULNERABILIDAD: usa yaml.load sin safe_load
        # Esto permite ejecución de código arbitrario a través de YAML malicioso
        config = yaml.load(data, Loader=yaml.UnsafeLoader)

        # Log de la configuración (solo para mostrar que se procesó)
        print(f"Configuración cargada: {config}")

        response = jsonify({
            "status": "Configuración cargada correctamente",
            "config_type": str(type(config)),
            "parser": "PyYAML",
            "loader": "UnsafeLoader",
            "warning": "Sistema actualizado... ¿todo bien?"
        })

        # Header que revela información sobre el parser
        response.headers['X-Parser'] = 'PyYAML/5.4.1'
        response.headers['X-Config-Format'] = 'YAML'

        return response, 200

    except yaml.YAMLError as e:
        return jsonify({
            "error": f"Error YAML: {str(e)}",
            "parser": "PyYAML",
            "hint": "Syntax error en YAML. Verificar indentación y formato.",
            "example": "key: value"
        }), 400
    except Exception as e:
        return jsonify({
            "error": f"Error procesando configuración: {str(e)}",
            "parser": "PyYAML UnsafeLoader",
            "hint": "Error durante deserialización de objetos Python"
        }), 500

@app.route('/robots.txt')
def robots():
    """Archivo robots.txt que puede revelar rutas interesantes"""
    robots_content = """User-agent: *
Disallow: /admin/
Disallow: /config
Disallow: /api/internal/
Disallow: /.git/
Disallow: /backup/

# Festival website - Please crawl responsibly
"""
    return robots_content, 200, {'Content-Type': 'text/plain'}

@app.route('/api/status')
def system_status():
    """Status del sistema que puede revelar información técnica"""
    return jsonify({
        "status": "operational",
        "version": "1.0.0",
        "framework": "Flask/Python",
        "health_check": "passing",
        "warnings": [
            "Some dependencies may have known security advisories",
            "Data parsing subsystem configured for maximum compatibility",
            "Deserialization module operating in legacy mode"
        ],
        "note": "All configuration endpoints require proper content-type headers"
    })

@app.route('/api/admin')
def admin_panel():
    """Panel de administración ficticio"""
    return jsonify({
        "status": "Panel administrativo del festival",
        "access": "Requiere autenticación de administrador",
        "message": "Acceso restringido - Credenciales comprometidas",
        "last_admin_activity": "Sistema de gestión implementado usando librerías Python estándar",
        "system_note": "Procesador de configuraciones habilitado para administradores"
    })

@app.route('/api/logs')
def system_logs():
    """Logs del sistema que pueden dar pistas"""
    fake_logs = [
        "2025-01-08 10:30:15 - INFO: Festival management system deployed",
        "2025-01-08 11:45:22 - WARNING: Dependency vulnerability scan completed",
        "2025-01-08 12:10:33 - ERROR: Security module failed to initialize properly",
        "2025-01-08 14:20:45 - ALERT: Unauthorized object instantiation detected",
        "2025-01-08 15:30:12 - WARNING: Unsafe deserialization pattern identified",
        "2025-01-08 16:45:30 - CRITICAL: Remote execution vector compromised",
        "2025-01-08 17:15:45 - ERROR: Configuration parser operating in unsafe mode"
    ]

    return jsonify({
        "logs": fake_logs,
        "pattern": "Multiple security warnings detected in data processing subsystem",
        "recommendation": "Review all external data input endpoints and parsing libraries"
    })

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    """
    Endpoint para servir archivos exfiltrados.
    Mecanismo one-shot: el archivo se elimina después de ser entregado
    para obligar a cada atacante a realizar su propia escalada.
    """
    upload_folder = os.path.join(os.path.dirname(__file__), 'static')
    os.makedirs(upload_folder, exist_ok=True)

    full_path = os.path.join(upload_folder, filename)

    if not os.path.exists(full_path):
        return jsonify({
            "error": "Archivo no encontrado",
            "hint": "¿Has exfiltrado algún dato aquí?",
            "directory": "/uploads/",
            "note": "Este directorio simula un servidor web accesible"
        }), 404

    # Leer contenido y devolverlo; luego eliminar para one-shot delivery
    try:
        with open(full_path, 'rb') as f:
            data = f.read()
        # Eliminar el archivo inmediatamente después de leerlo
        try:
            os.remove(full_path)
        except Exception:
            pass  # Si falla la eliminación no afecta la respuesta

        return Response(data, mimetype='text/plain')
    except Exception as e:
        return jsonify({
            "error": f"No se pudo leer el archivo: {str(e)}",
            "note": "Posible problema de permisos o concurrencia"
        }), 500

@app.route('/api/system')
def system_info():
    """
    Endpoint que revela información del sistema que puede ayudar en la escalada
    """
    return jsonify({
        "os": "Linux ubuntu 5.4.0-74-generic",
        "python_version": "3.9.2",
        "user": "www-data",
        "groups": ["www-data", "sudo"],
        "writable_dirs": ["/tmp", "/var/www/html", "./static"],
        "interesting_files": ["/etc/passwd", "/etc/shadow", "/root/flag.txt"],
        "suid_binaries": ["/usr/bin/sudo", "/usr/bin/find", "/usr/bin/python3"],
        "hint": "Algunos binarios pueden tener permisos especiales... 🔍"
    })

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
