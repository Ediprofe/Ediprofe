# 🚀 Guía de Deploy - Ediprofe Platform

## Estrategia de Deploy: Sitio Estático (SSG)

Tu plataforma está configurada para generar un sitio completamente estático usando **Static Site Generation (SSG)** de Next.js.

### ¿Por qué sitio estático?

✅ **Rendimiento máximo**: Las páginas se pre-generan en el build  
✅ **Sin servidor**: Puede hostearse en cualquier CDN (Vercel, Netlify, GitHub Pages)  
✅ **Costo cero**: No necesitas servidor Node.js corriendo  
✅ **Ultra rápido**: Los usuarios reciben HTML pre-renderizado  
✅ **SEO perfecto**: Todo el contenido está en el HTML desde el inicio  

### Flujo de trabajo

```
1. Editas contenido markdown en /content/
2. git add . && git commit -m "Nuevo contenido"
3. git push
4. El servicio de hosting detecta el push
5. Se ejecuta automáticamente: npm run build
6. Se genera el sitio estático en /out/
7. Se despliega automáticamente
```

---

## 🏗️ Build del sitio estático

### Comando de build

```bash
npm run build
```

Este comando:
1. Lee todos los archivos markdown de `/content/`
2. Procesa cada archivo (frontmatter, markdown → HTML, ecuaciones matemáticas)
3. Genera todas las páginas HTML estáticas
4. Optimiza imágenes, CSS y JavaScript
5. Crea el directorio `/out/` con todo el sitio listo

### Estructura del build

```
out/
├── index.html              # Página principal
├── matematicas.html        # Índice de matemáticas
├── matematicas/
│   ├── 01-numeros-enteros.html
│   └── 02-ecuaciones-primer-grado.html
├── fisica.html
├── fisica/
│   └── ...
├── _next/                  # Assets optimizados
└── ...
```

---

## 🌐 Opciones de Hosting

### 1. **Vercel** (Recomendado ⭐)

La forma más simple. Vercel es la empresa que creó Next.js.

**Setup:**
1. Conecta tu repositorio de GitHub a Vercel
2. Vercel detecta automáticamente que es Next.js
3. Cada `git push` dispara un deploy automático

**Configuración:**
- Build Command: `npm run build`
- Output Directory: `out`
- Framework Preset: Next.js

**Ventajas:**
- Deploy automático en cada push
- Preview URLs para cada PR
- CDN global incluido
- SSL/HTTPS gratis
- Dominio personalizado gratis

**URL:** https://vercel.com

---

### 2. **Netlify**

Alternativa popular a Vercel.

**Setup:**
1. Conecta tu repo de GitHub
2. Configura:
   - Build command: `npm run build`
   - Publish directory: `out`

**Ventajas:**
- Deploy automático
- CDN global
- SSL gratis
- Formularios y funciones serverless

**URL:** https://netlify.com

---

### 3. **GitHub Pages**

Hosting gratis directamente desde tu repositorio.

**Setup:**
1. Crea archivo `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

2. En tu repo de GitHub: Settings → Pages → Source: `gh-pages` branch

**URL:** Tu sitio estará en `https://tuusuario.github.io/ediprofe`

---

### 4. **Cloudflare Pages**

**Setup:**
1. Conecta tu repo
2. Build command: `npm run build`
3. Output directory: `out`

**Ventajas:**
- CDN ultra rápido de Cloudflare
- SSL gratis
- Deploy automático

**URL:** https://pages.cloudflare.com

---

## ⚡ Rendimiento

### En Desarrollo (`npm run dev`)

- ✅ **Caché en memoria**: Las unidades se cachean 60 segundos
- ✅ **Hot reload**: Cambios en código se reflejan inmediatamente
- ⚠️ **Lento la primera carga**: Normal, procesa markdown on-demand

### En Producción (después de `npm run build`)

- ✅ **Todo pre-generado**: 0ms de procesamiento de markdown
- ✅ **HTML estático**: Servido directamente desde CDN
- ✅ **Carga instantánea**: < 1 segundo carga inicial
- ✅ **Sin servidor**: No hay Node.js corriendo

---

## 📊 Métricas esperadas en producción

Con sitio estático bien optimizado:

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 2.5s
- **Total Blocking Time**: < 200ms
- **Lighthouse Score**: 90-100 en Performance

---

## 🔄 Actualizando contenido

### Flujo simple:

```bash
# 1. Edita un archivo markdown
vim content/matematicas/03-fracciones.md

# 2. Prueba localmente
npm run dev
# Visita http://localhost:3000/matematicas/03-fracciones

# 3. Si se ve bien, sube los cambios
git add content/matematicas/03-fracciones.md
git commit -m "✨ Agregar lección de fracciones"
git push

# 4. ¡Listo! El sitio se reconstruye automáticamente
```

### Tiempos:
- **Vercel/Netlify**: 1-3 minutos desde push hasta deploy
- **GitHub Pages**: 3-5 minutos

---

## 🐛 Troubleshooting

### El build falla

```bash
# Prueba el build localmente primero
npm run build

# Si hay errores, revisa:
# - Sintaxis de markdown válida
# - Frontmatter correcto en todos los .md
# - No hay imports de módulos que no existen
```

### Página no se actualiza

```bash
# Limpia el caché local y rebuilds
rm -rf .next out
npm run build
```

### Contenido no se ve en producción

Verifica que:
1. Los archivos están en `/content/` del repo
2. El commit incluye los archivos nuevos
3. El build fue exitoso (revisa logs en tu servicio de hosting)

---

## 🎯 Siguiente paso

1. **Haz tu primer deploy**:
   - Ve a Vercel.com
   - Conecta tu repo de GitHub
   - Click en "Deploy"

2. **Obtén tu URL**:
   - Recibirás una URL tipo `https://ediprofe.vercel.app`

3. **Configura dominio personalizado** (opcional):
   - En Vercel: Settings → Domains
   - Agrega `www.ediprofe.com`

---

## 📚 Referencias

- [Next.js Static Exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)

---

**¡Tu sitio está listo para producción!** 🎉
