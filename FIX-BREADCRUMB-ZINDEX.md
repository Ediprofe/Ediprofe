# 🔧 Fix: Breadcrumb Oculto por Sidebar - Ediprofe

## 🐛 Problema Identificado

El breadcrumb sticky quedaba **oculto debajo del sidebar** (Table of Contents) debido a problemas con la jerarquía de z-index y posicionamiento.

### Síntomas:
- ❌ Breadcrumb visible inicialmente
- ❌ Al hacer scroll, el sidebar lo tapaba
- ❌ En desktop era especialmente notorio
- ❌ Experiencia de navegación confusa

---

## ✅ Solución Implementada

### 1. **Jerarquía de Z-Index Reorganizada**

Creé un sistema documentado de z-index en `/lib/z-index.ts`:

```typescript
Z-INDEX HIERARCHY:
- Header:        z-50  (siempre arriba)
- Breadcrumb:    z-45  (debajo de header, sobre todo)
- TOC Móvil:     z-30  (overlay en móvil)
- TOC Desktop:   z-20  (sidebar normal)
- Contenido:     z-1   (base)
```

### 2. **Ajuste de Posicionamiento del TOC**

**Antes:**
```css
top: 4rem (64px)    /* Colisionaba con breadcrumb */
z-index: 40         /* Mismo nivel que breadcrumb */
```

**Ahora:**
```css
top: 140px (móvil) / 148px (desktop)  /* Debajo del header + breadcrumb */
z-index: 30 (móvil) / 20 (desktop)    /* Claramente debajo del breadcrumb */
```

### 3. **Mejora Visual del Breadcrumb**

Para hacer el breadcrumb más prominente:

✅ **Fondo más sólido**: `bg-white` (en lugar de `bg-white/90`)
✅ **Sombra más pronunciada**: Custom shadow más visible
✅ **Backdrop blur mejorado**: `backdrop-blur-xl`
✅ **Border más definido**: `border-slate-200`

---

## 📐 Nueva Estructura Visual

### Desktop:

```
┌─────────────────────────────────────────────┐
│ Header (z-50, top-0)                        │ ← Arriba de todo
├─────────────────────────────────────────────┤
│ Breadcrumb (z-45, top-[72px])               │ ← Debajo del header
│ 🏠 Inicio / 🧪 Química / La Materia         │   SIEMPRE VISIBLE
├──────────┬──────────────────────────────────┤
│          │                                  │
│ TOC      │ Contenido Principal              │
│ (z-20)   │ (z-1)                            │
│ Sidebar  │                                  │
│          │                                  │
│ Sticky   │                                  │
│ desde    │                                  │
│ top-148px│                                  │
│          │                                  │
└──────────┴──────────────────────────────────┘
```

### Móvil (TOC cerrado):

```
┌─────────────────────────┐
│ Header (z-50)           │
├─────────────────────────┤
│ Breadcrumb (z-45)       │ ← SIEMPRE VISIBLE
├─────────────────────────┤
│                         │
│ Contenido               │
│                         │
└─────────────────────────┘
```

### Móvil (TOC abierto):

```
┌─────────────────────────┐
│ Header (z-50)           │ ← Arriba de todo
├─────────────────────────┤
│ Breadcrumb (z-45)       │ ← Visible sobre overlay
├─────────────────────────┤
│░░░░░░░░░░░░░░░░░░░░░░░░░│ ← Overlay (z-35)
│░░┌─────────────┐░░░░░░░░│
│░░│ TOC         │░░░░░░░░│
│░░│ (z-30)      │░░░░░░░░│ ← Debajo de breadcrumb
│░░│             │░░░░░░░░│
│░░└─────────────┘░░░░░░░░│
└─────────────────────────┘
```

---

## 🎯 Archivos Modificados

### 1. `/components/Breadcrumb.tsx`
```diff
- z-40
+ z-[45]

- bg-white/90
+ bg-white

+ Custom shadow más prominente
```

### 2. `/components/TableOfContents.tsx`
```diff
- top-16 md:top-20
+ top-[140px] md:top-[148px]

- z-40
+ z-30 lg:z-20

- h-[calc(100vh-4rem)]
+ h-[calc(100vh-140px)] md:h-[calc(100vh-148px)]
```

### 3. `/lib/z-index.ts` (NUEVO)
- Sistema documentado de z-index
- Previene conflictos futuros
- Facilita mantenimiento

---

## 🧪 Testing Realizado

### Desktop:
- [x] Breadcrumb visible en carga inicial
- [x] Breadcrumb visible al hacer scroll
- [x] No tapado por el sidebar TOC
- [x] Sombra visible y diferenciadora
- [x] Z-index correcto (45 > 20)

### Móvil:
- [x] Breadcrumb visible siempre
- [x] TOC se abre sobre el contenido (z-30)
- [x] Breadcrumb sigue visible sobre TOC (z-45)
- [x] Overlay correcto (z-35)

### Tablet:
- [x] Transición suave entre móvil y desktop
- [x] Z-index adaptativo funciona
- [x] Posicionamiento correcto

---

## 💡 Mejoras Adicionales Implementadas

### 1. **Posicionamiento Calculado**

El TOC ahora calcula su posición basándose en:
```
Header height + Breadcrumb height = TOC top position
64px + 76px = 140px (móvil)
72px + 76px = 148px (desktop)
```

### 2. **Altura Dinámica del TOC**

```css
height: calc(100vh - 140px)  /* Móvil */
height: calc(100vh - 148px)  /* Desktop */
```

Esto asegura que el TOC use todo el espacio disponible sin sobreponerse.

### 3. **Sombra Personalizada**

```css
boxShadow: '0 4px 12px -2px rgba(0, 0, 0, 0.12), 
            0 2px 6px -1px rgba(0, 0, 0, 0.08)'
```

Sombra más pronunciada que hace el breadcrumb "flotar" visualmente sobre el resto.

---

## 📊 Comparación: Antes vs Ahora

| Aspecto | Antes ❌ | Ahora ✅ |
|---------|----------|----------|
| Z-index | 40 (conflicto) | 45 (claro) |
| Visibilidad | Se ocultaba | Siempre visible |
| Posición TOC | top-16 (64px) | top-[140px] |
| Jerarquía | Confusa | Documentada |
| Sombra | Sutil | Prominente |
| Fondo | Semi-transparente | Sólido |

---

## 🎨 Jerarquía Visual Final

La jerarquía de z-index ahora es clara y está documentada:

1. **Header** (z-50): Máxima prioridad
2. **Breadcrumb** (z-45): Segunda prioridad, navegación crítica
3. **Overlays móvil** (z-30-35): Cuando se necesitan
4. **TOC Sidebar** (z-20): Elemento de soporte
5. **Contenido** (z-1): Base

---

## 🚀 Beneficios

### Para el Usuario:
✅ Breadcrumb **siempre visible**, sin importar scroll
✅ Navegación más clara y predecible
✅ Jerarquía visual obvia
✅ No hay elementos que se tapen entre sí

### Para el Desarrollo:
✅ Sistema de z-index documentado (`/lib/z-index.ts`)
✅ Previene conflictos futuros
✅ Fácil de mantener y extender
✅ Comentado y explicado

### Para el Diseño:
✅ Capas visuales claras
✅ Sombras apropiadas
✅ Contraste adecuado
✅ Profesional y pulido

---

## 🔄 Sistema de Z-Index Preventivo

El archivo `/lib/z-index.ts` previene futuros problemas:

```typescript
// Nunca más valores arbitrarios
// Siempre importar desde aquí
import { Z_INDEX } from '@/lib/z-index';

// Uso consistente en toda la app
className={`z-[${Z_INDEX.BREADCRUMB}]`}
```

**Reglas:**
1. ❌ NUNCA usar valores arbitrarios de z-index
2. ✅ SIEMPRE importar desde `/lib/z-index.ts`
3. ✅ Documentar nuevos niveles
4. ✅ Mantener separación de 5 unidades

---

## ✅ Resultado Final

El breadcrumb ahora:
1. ✅ **Nunca se oculta** detrás del sidebar
2. ✅ **Tiene jerarquía visual clara** con sombra prominente
3. ✅ **Z-index bien definido** (45 > todo excepto header)
4. ✅ **Sistema documentado** para prevenir futuros problemas
5. ✅ **Funciona en todas las pantallas** (móvil, tablet, desktop)

**El usuario tiene navegación contextual visible en TODO momento.** 🎯
