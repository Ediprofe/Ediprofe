# Diagnostico de Problemas de Conectividad - Ediprofe

## Problema Reportado

Error: ERR_CONNECTION_TIMED_OUT - ediprofe.com ha tardado demasiado tiempo en responder

Afecta a:
- Redes moviles (datos celulares)
- Algunos estudiantes en escritorio
- NO afecta: Red de casa, red del colegio

## Posibles Causas

### 1. Problema de DNS (Mas probable)
El dominio ediprofe.com no resuelve correctamente en algunas redes.

Como verificar:
- nslookup ediprofe.com
- ping ediprofe.com

Solucion:
- Verificar configuracion DNS en Vercel
- Asegurar que los registros A/CNAME esten correctos
- Considerar usar Cloudflare DNS

### 2. Problema de Region del Servidor
Vercel puede estar sirviendo desde una region lejana.

Solucion aplicada:
- Configurado region iad1 (US East) en vercel.json
- Esto mejora latencia para Latinoamerica

### 3. Firewall/ISP Bloqueando
Algunos proveedores de internet bloquean ciertos dominios o IPs.

### 4. Cache Corrupto
Cache del navegador o DNS local corrupto.

## Mejoras Implementadas

- Configuracion de Vercel optimizada
- Headers HTTP mejorados
- Pagina de error offline.html
- Optimizacion de build
- Region configurada para mejor latencia

## Pasos para Resolver

1. Hacer push de los cambios
2. Esperar rebuild en Vercel (2-3 minutos)
3. Probar desde diferentes redes
4. Pedir a estudiantes que limpien cache DNS

## Comandos de Diagnostico

Para administrador:
- npm run build:static
- npx serve out
- nslookup ediprofe.com

Para estudiantes:
- ipconfig /flushdns (Windows)
- sudo dscacheutil -flushcache (Mac)

## Soluciones Temporales

1. Cambiar DNS a Google (8.8.8.8) o Cloudflare (1.1.1.1)
2. Usar VPN
3. Limpiar cache del navegador

Ultima actualizacion: 2025-10-24
