# Solución: Problema de Acceso con Datos Móviles

## Problema
El sitio ediprofe.com funciona con WiFi pero NO con datos móviles (4G).

## Causa Probable
**Bloqueo o problema de DNS del operador móvil**

Los operadores móviles a veces:
- Bloquean ciertos dominios
- Tienen DNS lentos o corruptos
- Filtran tráfico de manera agresiva

## Soluciones Implementadas en el Código

1. Middleware con headers optimizados
2. Headers HTTP adicionales en vercel.json
3. Configuración de DNS prefetch
4. robots.txt para mejor indexación

## Soluciones para Usuarios (Tú y Estudiantes)

### Solución 1: Cambiar DNS en el Móvil (MÁS EFECTIVA)

#### Android:
1. Ajustes → Conexiones → Más redes de conexión
2. DNS privado → Nombre de host del proveedor de DNS privado
3. Escribir: `dns.google` o `one.one.one.one`
4. Guardar

#### iPhone:
1. Ajustes → WiFi/Celular → Configurar DNS
2. Manual → Eliminar servidores actuales
3. Agregar servidor: `8.8.8.8` y `8.8.4.4` (Google)
4. O: `1.1.1.1` y `1.0.0.1` (Cloudflare)
5. Guardar

### Solución 2: Usar VPN (TEMPORAL)

Apps gratuitas confiables:
- **Cloudflare WARP** (recomendado)
- Proton VPN
- TunnelBear

### Solución 3: Limpiar Caché del Navegador

1. Chrome móvil → ⋮ → Historial
2. Borrar datos de navegación
3. Seleccionar "Todo el tiempo"
4. Marcar: Caché e imágenes
5. Borrar datos

### Solución 4: Probar con Otro Navegador

Si usas Chrome, probar:
- Firefox
- Brave
- Opera

## Soluciones a Nivel de Dominio (Para Ti)

### Opción A: Usar Cloudflare como Proxy (RECOMENDADO)

**Ventajas**:
- Mejora DNS global
- Protección DDoS
- Caché adicional
- Gratis

**Pasos**:
1. Crear cuenta en cloudflare.com
2. Agregar sitio: ediprofe.com
3. Cambiar nameservers en tu registrador de dominio
4. Activar proxy (nube naranja) en registros DNS
5. Esperar propagación (24-48h)

### Opción B: Verificar Configuración DNS Actual

En tu registrador de dominio, asegurar:
```
Tipo: A
Nombre: @
Valor: 76.76.21.21 (IP de Vercel)
TTL: 300

Tipo: CNAME
Nombre: www
Valor: cname.vercel-dns.com
TTL: 300
```

### Opción C: Agregar Dominio Alternativo

Registrar un dominio adicional como respaldo:
- ediprofe.net
- ediprofe.app
- ediprofe.co

## Diagnóstico

### Para verificar si es problema de DNS:

**Desde móvil con datos**:
```
1. Abrir navegador
2. Ir a: https://dns.google/query?name=ediprofe.com
3. Si no carga o da error → Problema de DNS
```

**Desde PC**:
```bash
# Verificar DNS
nslookup ediprofe.com 8.8.8.8

# Verificar conectividad
ping ediprofe.com

# Trazar ruta
traceroute ediprofe.com
```

## Operadores Móviles Problemáticos Comunes

En Latinoamérica, estos operadores suelen tener problemas:
- Claro (a veces bloquea dominios nuevos)
- Movistar (DNS lentos)
- Tigo (filtrado agresivo)

## Recomendación Final

**Para ti**: Implementar Cloudflare como proxy (Opción A)
**Para estudiantes**: Cambiar DNS en el móvil (Solución 1)

## Monitoreo

Herramientas para verificar disponibilidad:
- https://downforeveryoneorjustme.com/ediprofe.com
- https://www.isitdownrightnow.com/ediprofe.com
- https://uptimerobot.com (monitoreo 24/7 gratis)

---

**Última actualización**: 2025-10-24
**Estado**: Cambios implementados en código, pendiente configuración DNS
