# 🎓 Ediprofe Platform

Plataforma educativa interactiva construida con **Next.js 15.5**, que convierte archivos Markdown en páginas web con sistema de tabs automático.

## ✨ Características

- ✅ **Arquitectura de 3 niveles**: Catálogo → Índice de unidades → Contenido con tabs
- ✅ **Generación automática de tabs** desde H2/H3 en Markdown
- ✅ **Sistema de videos inteligente**: YouTube embebido, TikTok con botón discreto
- ✅ **Tabla de contenidos lateral** con scroll spy y navegación suave
- ✅ **Completamente estático (SSG)** con rutas generadas en build-time
- ✅ **Diseño responsive** mobile-first con Tailwind CSS
- ✅ **TypeScript estricto** con tipos completos
- ✅ **SEO optimizado** con metadata dinámica

## 🚀 Tecnologías

- **Next.js 15.5** (App Router)
- **React 18.3**
- **TypeScript 5.5**
- **Tailwind CSS 3.4**
- **Remark/Unified** para procesar Markdown
- **Gray-matter** para frontmatter
- **Rehype-highlight** para syntax highlighting

## 📦 Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo con Turbopack
npm run dev -- --turbo

# 3. Abrir navegador en http://localhost:3000
```

## 📁 Estructura del Proyecto

```
/
├─ app/                           # App Router de Next.js
│  ├─ page.tsx                    # Nivel 1: Catálogo de materias
│  ├─ [materia]/
│  │  ├─ page.tsx                 # Nivel 2: Lista de unidades
│  │  └─ [unidad]/
│  │     └─ page.tsx              # Nivel 3: Contenido con tabs
│  ├─ layout.tsx                  # Layout raíz
│  └─ globals.css                 # Estilos globales
│
├─ content/                       # 📝 TUS ARCHIVOS MARKDOWN
│  ├─ quimica/
│  │  ├─ 01-la-materia.md
│  │  └─ 02-separacion-mezclas.md
│  ├─ fisica/
│  ├─ matematicas/
│  └─ ciencias/
│
├─ lib/                           # Lógica de negocio
│  ├─ markdown.ts                 # Parser de Markdown
│  ├─ tabs-generator.ts           # Generador de tabs
│  └─ content-utils.ts            # Utilidades
│
├─ components/                    # Componentes React
│  ├─ TabsSystem.tsx              # Sistema de tabs interactivo
│  ├─ VideoEmbed.tsx              # Embedder de videos
│  └─ TableOfContents.tsx         # Tabla de contenidos
│
├─ types/
│  └─ content.ts                  # Tipos TypeScript
│
├─ next.config.js                 # Configuración de Next.js
├─ tailwind.config.ts             # Configuración de Tailwind
└─ tsconfig.json                  # Configuración de TypeScript
```

## 📝 Cómo Crear Contenido

### Paso 1: Crear Carpeta de Materia

```bash
mkdir content/tu-materia
```

### Paso 2: Configurar la Materia

Edita `types/content.ts` y agrega tu materia:

```typescript
export const SUBJECT_CONFIG = {
  // ... otras materias
  'tu-materia': {
    name: 'Tu Materia',
    icon: '📚',  // Emoji que prefieras
    color: 'materia-tu-color',
    description: 'Descripción breve',
  },
};
```

### Paso 3: Crear Archivo Markdown

Crea `content/tu-materia/01-primera-unidad.md`:

```markdown
---
title: "Título de la Unidad"
description: "Descripción breve"
author: "Tu Nombre"
duration: "45 min"
difficulty: "basico"
tags: ["tag1", "tag2"]
---

## 🧪 Primera Sección (H2)

video: https://youtu.be/VIDEO_ID
video: https://vt.tiktok.com/TIKTOK_URL

Contenido introductorio que aparecerá en la tab "📖 Teoría".

### ✏️ Ejercicio 1 (H3)

Este contenido aparecerá en una nueva tab llamada "✏️ Ejercicio 1".

### 🔬 Actividad Práctica

Otra tab con este nombre exacto.

## ⚗️ Segunda Sección

Contenido de la segunda sección...

### 📝 Quiz

Preguntas de evaluación...
```

## 🎯 Reglas de Parseo

| Elemento | Resultado | Notas |
|----------|-----------|-------|
| `## Título` (H2) | Nueva sección | Crea un bloque separado |
| `### Nombre` (H3) | Nueva tab | El nombre es EXACTAMENTE el del H3 |
| `video: URL` después de H2 | Tab "🎬 Videos" | Automática si hay videos |
| Contenido antes del primer H3 | Tab "📖 Teoría" | Por defecto |
| YouTube URL | Iframe responsive | Embebido completo |
| TikTok URL | Botón "Ver en TikTok" | Link externo |

## 🎨 Colores por Materia

Agrega colores personalizados en `tailwind.config.ts`:

```typescript
colors: {
  'materia-quimica': '#8B5CF6',
  'materia-fisica': '#3B82F6',
  'materia-matematicas': '#EF4444',
  'materia-tu-materia': '#TU_COLOR',  // Agrega aquí
}
```

## 🏗️ Build para Producción

```bash
# Generar sitio estático
npm run build

# Servir localmente
npm start

# O deployar en Vercel
vercel --prod
```

## 🌐 Deployment

### Opción 1: Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deployar
vercel
```

### Opción 2: Netlify

```bash
# Instalar Netlify CLI
npm i -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod --dir=.next
```

### Opción 3: Export Estático

Para hosting estático tradicional, cambia `next.config.js`:

```javascript
const nextConfig = {
  output: 'export',
  // ...resto de la config
}
```

Luego:

```bash
npm run build
# Los archivos estarán en /out/
```

## 🧪 Ejemplos Incluidos

El proyecto incluye 2 unidades de química de ejemplo:

1. **La Materia y sus Propiedades** (`content/quimica/01-la-materia.md`)
   - Introducción a la materia
   - Estados de la materia
   - Propiedades físicas y químicas
   - Incluye ejercicios, actividades y videos

2. **Separación de Mezclas** (`content/quimica/02-separacion-mezclas.md`)
   - Métodos de separación (tamizado, filtración, etc.)
   - Cada método es una sección con tabs
   - Experimentos prácticos
   - Tabla comparativa

## 🔧 Características Técnicas

### Server Components por Defecto

- Las páginas usan Server Components para SSG
- Solo `TabsSystem`, `VideoEmbed` y `TableOfContents` son Client Components
- Mejor performance y SEO

### Generación Estática

```typescript
// generateStaticParams genera todas las rutas en build-time
export async function generateStaticParams() {
  return generateAllRouteParams();  // Todas las combinaciones materia/unidad
}
```

### Metadata Dinámica

```typescript
// generateMetadata crea meta tags específicos por página
export async function generateMetadata({ params }): Promise<Metadata> {
  const unit = await getFullUnit(params.materia, params.unidad);
  return {
    title: `${unit.metadata.title} - Ediprofe`,
    description: unit.metadata.description,
    keywords: unit.metadata.tags,
  };
}
```

### Tipos Seguros

Todo está tipado con TypeScript:

```typescript
interface Unit {
  slug: string;
  metadata: ContentMetadata;
  sections: Section[];
  materia: string;
  // ...
}
```

## 📚 Scripts Disponibles

```bash
npm run dev          # Desarrollo normal
npm run dev -- --turbo  # Desarrollo con Turbopack (más rápido)
npm run build        # Build de producción
npm run start        # Servir build localmente
npm run lint         # Linter ESLint
```

## 🐛 Troubleshooting

### Error: "Cannot find module 'fs'"

Es normal verlo en el editor. `fs` solo funciona en server-side, que es donde lo usamos.

### Errores de TypeScript en componentes

Asegúrate de instalar todas las dependencias:

```bash
npm install
```

### Las tabs no aparecen

Verifica que tu Markdown tenga:
- H2 (`##`) para secciones
- H3 (`###`) para tabs
- Contenido entre ellos

### Videos no se muestran

- **YouTube:** Asegúrate que la URL sea válida (youtu.be o youtube.com/watch)
- **TikTok:** Verifica que empiece con `https://vt.tiktok.com/`

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu rama de features (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

MIT License - puedes usar este proyecto libremente.

## 👨‍💻 Autor

**Prof. Edilberto Suárez**

---

## 🎯 Próximas Características

- [ ] Dark mode
- [ ] Búsqueda global
- [ ] Sistema de progreso por usuario
- [ ] Exportar a PDF
- [ ] Comentarios por sección
- [ ] Quiz interactivos con puntuación
- [ ] Soporte para LaTeX/Math equations

---

**¿Preguntas?** Abre un Issue en GitHub o contáctame directamente.

**¡Gracias por usar Ediprofe!** 🎓✨
