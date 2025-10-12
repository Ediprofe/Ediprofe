# 📋 REQUERIMIENTOS FUNCIONALES - PLATAFORMA EDUCATIVA EDIPROFE

## 🎯 VISIÓN DEL PROYECTO

Crear una plataforma web educativa donde los **profesores escriben contenido en archivos de texto simples** (formato Markdown) y el sistema **automáticamente lo convierte en páginas web interactivas, elegantes y profesionales**.

### ¿Qué problema resuelve?

**Antes:** El profesor necesitaba conocimientos técnicos (HTML, CSS, JavaScript) para crear contenido web interactivo.

**Ahora:** El profesor solo escribe texto con una estructura simple, como si estuviera escribiendo en Word o Google Docs, y obtiene automáticamente:
- Páginas web profesionales
- Navegación por pestañas interactivas
- Videos embebidos
- Ejercicios organizados
- Enlaces directos a cada sección
- Diseño responsive (funciona en celular, tablet y computadora)

---

## 🌐 ESTRUCTURA DE LA PLATAFORMA: 3 NIVELES DE NAVEGACIÓN

La plataforma funciona como un **libro digital de tres niveles**:

### **📚 NIVEL 1: Página de Inicio - El Catálogo de Materias**

**¿Qué ve el estudiante?**

Cuando un estudiante entra al sitio web, ve una página de inicio con **todas las materias disponibles**, presentadas como tarjetas grandes y coloridas.

**Cada tarjeta de materia muestra:**
- Un **icono grande** que representa la materia (⚗️ para Química, 🔬 para Física, etc.)
- El **nombre de la materia** en grande
- **Cuántas unidades/lecciones** tiene disponibles
- Un **color distintivo** que identifica esa materia en toda la plataforma

**Comportamiento:**
- El estudiante hace **clic en una tarjeta** y entra a ver todas las unidades de esa materia
- Las tarjetas se organizan en una **cuadrícula responsive** (se adapta al tamaño de pantalla).
- Las tarjetas tienen un frase descriptiva corta.
- En celular se ven de **1 en 1**, en tablet de **2 en 2**, en computadora de **3 o 4**

**Ejemplo visual de lo que ve el estudiante:**
```
═══════════════════════════════════════════════════════
         🎓 PLATAFORMA EDUCATIVA EDIPROFE
═══════════════════════════════════════════════════════

    ┌─────────────────┐  ┌─────────────────┐
    │   ⚗️ QUÍMICA    │  │   🔬 FÍSICA     │
    │                 │  │                 │
    │ Aprende química │  │ Domina los      │
    │ de forma        │  │ conceptos de    │
    │                 │  │ física          │
    │                 │  │                 │
    │ 📚 12 unidades  │  │ 📚 8 unidades   │
    └─────────────────┘  └─────────────────┘

    ┌─────────────────┐  ┌─────────────────┐
    │  ➕ MATEMÁTICAS │  │ 🧪 CIENCIAS     │
    │                 │  │                 │
    │ Resuelve        │  │ Explora el      │
    │ problemas paso  │  │ mundo natural   │
    │ a paso          │  │                 │
    │                 │  │                 │
    │ 📚 15 unidades  │  │ 📚 10 unidades  │
    └─────────────────┘  └─────────────────┘
```

**URL de ejemplo:** `https://tudominio.com/`

---

### **📖 NIVEL 2: Página de Materia - El Índice de Unidades**

**¿Qué ve el estudiante?**

Cuando el estudiante hace clic en una materia (ej: Química), llega a una página que muestra **todas las unidades/temas de esa materia**, como si fuera el índice de un libro.

**Cada unidad se muestra como una tarjeta que incluye:**
- **Número de orden** visible (01, 02, 03...) para seguir una secuencia lógica
- **Título de la unidad** en grande (ej: "Separación de Mezclas")
- **Descripción breve** de qué trata la unidad (1-2 líneas)
- **Indicadores visuales** de qué contiene:
  - 📺 Cuántos videos tiene
  - 📝 Cuántos ejercicios prácticos incluye
  - 🎯 Si tiene quiz o evaluación
  - 🏆 Si tiene proyecto final

**Comportamiento:**
- Las unidades aparecen **en orden numérico** (de la 01 en adelante)
- El estudiante hace **clic en una unidad** y entra a ver todo su contenido
- Puede **ver de un vistazo** qué unidades tienen más material
- El **color de la materia** se mantiene en toda esta página

**Ejemplo visual de lo que ve el estudiante:**
```
═══════════════════════════════════════════════════════
    ⚗️ QUÍMICA - TODAS LAS UNIDADES
═══════════════════════════════════════════════════════

┌─────────────────────────────────────────────────┐
│ 01. La Materia                                  │
│ ─────────────────────────────────────────────── │
│ Propiedades físicas y químicas, estados de la  │
│ materia, cambios de estado                      │
│                                                 │
│ 📺 3 videos  📝 5 ejercicios  🎯 Quiz           │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ 02. Separación de Mezclas                       │
│ ─────────────────────────────────────────────── │
│ Métodos físicos de separación: tamizado,       │
│ filtración, destilación, decantación            │
│                                                 │
│ 📺 8 videos  📝 12 ejercicios  🎯 Quiz          │
│ 🏆 Proyecto final                               │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ 03. Estructura Atómica                          │
│ ─────────────────────────────────────────────── │
│ Modelos atómicos, partículas subatómicas,      │
│ número atómico y masa atómica                   │
│                                                 │
│ 📺 5 videos  📝 8 ejercicios  🎯 2 Quiz         │
└─────────────────────────────────────────────────┘
```

**URL de ejemplo:** `https://tudominio.com/quimica`

**Nota importante para el profesor:** La descripción de cada unidad se extrae automáticamente del archivo que subes, específicamente de una sección llamada "Descripción" que explicaremos más adelante.

---

### **Nivel 3: Página de Unidad Individual**
- **Esta es la página más importante del sistema**
- Muestra el contenido completo de una unidad con sistema de tabs automático
- Componentes principales:
  1. **Header de la unidad:**
     - Título principal
     - Enlaces a recursos externos (Playlist YouTube, PDF Drive)
     - Breadcrumb de navegación (Química > Separación de Mezclas)
  
  2. **Sidebar lateral fijo (Tabla de Contenidos):**
     - Lista de todas las lecciones principales (H2)
     - Sub-items expandibles con las subsecciones (H3)
     - Links directos a cada tab
     - Scroll suave al hacer clic
     - Highlight del item activo
  
  3. **Área de contenido principal:**
     - Cada lección (H2) se renderiza como una sección
     - Sistema de tabs horizontales con scroll
     - Tabs generados automáticamente:
       - 📖 **Teoría:** Contenido principal del H2
       - 🎬 **Videos:** Si hay videos en el H2
       - 📝 **Ejercicio 1, 2, 3...:** Por cada H3 detectado
       - 🔬 **Actividades, Laboratorios, etc.**
     - Contenido renderizado según el tipo de tab

**Ejemplo visual:**
```
┌─────────────────────────────────────────────────────────────────┐
│  Química > Separación de Mezclas    [📺 Playlist] [📄 PDF]      │
├──────────────┬──────────────────────────────────────────────────┤
│              │                                                  │
│ 📋 CONTENIDO │  🧪 Método 1: Tamizado                          │
│              │  ┌────────────────────────────────────────────┐ │
│ 1. Tamizado  │  │ 📖 Teoría │ 🎬 Videos │ 📝 Ejercicio 1    │ │
│   📝 Ejer. 1 │  └────────────────────────────────────────────┘ │
│   🔬 Activ.  │                                                  │
│              │  El tamizado es un método físico que separa...  │
│ 2. Filtración│                                                  │
│   📝 Ejer. 2 │  **Conceptos clave:**                           │
│   🎮 Simul.  │  - Granulometría: ...                           │
│              │  - Porosidad del tamiz: ...                     │
│ 3. Destilación│                                                 │
│   📝 Ejer. 4 │                                                  │
│   🔬 Invest. │  [Scroll automático al hacer clic en TOC]       │
│   🎯 Quiz    │                                                  │
│              │                                                  │
└──────────────┴──────────────────────────────────────────────────┘
```

**URL:** `https://dominio.com/quimica/separacion-de-mezclas`

**URLs con enlaces directos:**
- `https://dominio.com/quimica/separacion-de-mezclas#tamizado`
- `https://dominio.com/quimica/separacion-de-mezclas#tamizado-ejercicio-1`
- `https://dominio.com/quimica/separacion-de-mezclas#filtracion-videos`

---

## 📝 FORMATO DE ENTRADA: ESTRUCTURA MARKDOWN

### 🎯 Reglas Simples (Lo Más Importante)

**El sistema es muy simple:**

1. **`## Título`** (H2 con dos #) = Crea una **SUBUNIDAD** (sección grande)
2. **`### Nombre`** (H3 con tres ###) = Crea una **PESTAÑA** dentro de esa subunidad
3. **El nombre que pongas en el H3 ES el nombre de la pestaña** (sin cambios, sin detección automática)
4. **Si pones ícono en el H3, aparece en la pestaña. Si no lo pones, no aparece.**
5. **Todo lo que escribas debajo del H3** (texto, videos, enlaces) va dentro de esa pestaña
6. **Para embeber videos, usa el prefijo `video:`** antes del enlace

**Ejemplo ultra-simple:**

```markdown
## Mi Tema Principal

### Primera Pestaña

video: https://youtu.be/ABC123
video: https://vt.tiktok.com/ZSB123

Contenido de la primera pestaña...

### Segunda Pestaña  

Contenido de la segunda pestaña sin video...
```

Resultado: Una subunidad con 2 pestañas llamadas exactamente "Primera Pestaña" y "Segunda Pestaña". La primera tiene un video embebido de YouTube + opción TikTok discreta.

---

### Reglas de Escritura Detalladas

Los profesores subirán archivos `.md` con la siguiente estructura:

```markdown
---
title: "Separación de Mezclas"
description: "Métodos físicos y químicos para separar mezclas"
---

# Separación de Mezclas

[Playlist](https://youtube.com/playlist?list=PLvciGh3Wfg79aeFuQjc_uTRlO0tbBfaq8)
[PDF](https://drive.google.com/drive/folders/1IFK_fajTjTI7XGdSh7XVemZp-dJ_HNeZ)

## 🎬 Método 1: Tamizado

video: https://youtu.be/ZB3H8VlNBWY
video: https://vt.tiktok.com/ZSBJDCbPR/

El tamizado es un método físico que separa **partículas sólidas** de diferentes tamaños...

**Conceptos clave:**
- **Granulometría:** Clasificación de partículas según su tamaño
- **Porosidad del tamiz:** Tamaño de las aberturas de la malla

### ✏️ Ejercicio 1: Selección de tamiz

**Problema:** Tienes una mezcla de arroz (7mm) y lentejas (5mm). ¿Qué tamaño usarías?

**Opciones:**
- a) Malla de 8mm
- b) Malla de 6mm ✅
- c) Malla de 4mm

**Explicación:** La malla de 6mm permite que las lentejas pasen...

### 🧪 Actividad Práctica

**Materiales:**
- Arena fina
- Grava pequeña
- Tamiz de construcción

**Procedimiento:**
1. Mezclar arena y grava
2. Verter sobre el tamiz
3. Observar la separación

## 🎬 Método 2: Filtración

video: https://youtu.be/ugGqsxTNGnM

La filtración separa **sólidos insolubles** de líquidos...

### ✏️ Ejercicio 2: Identificar componentes

**Problema:** Al filtrar arena en agua, ¿qué obtienes?

**Respuestas:**
- Residuo: Arena
- Filtrado: Agua limpia
```

### 📁 Ubicación del Archivo = Materia Automática

**Pregunta importante:** ¿Por qué NO hay un campo `categoria` en los metadatos?

**Respuesta:** Porque **la materia se detecta automáticamente** según la carpeta donde guardas el archivo:

```
content/
  quimica/
    01-la-materia.md          ← Automáticamente es de Química
    02-separacion-mezclas.md  ← Automáticamente es de Química
  
  fisica/
    01-cinematica.md          ← Automáticamente es de Física
    02-dinamica.md            ← Automáticamente es de Física
  
  matematicas/
    01-algebra.md             ← Automáticamente es de Matemáticas
  
  ciencias/
    01-el-agua.md             ← Automáticamente es de Ciencias
```

**Ventajas de este sistema:**
- ✅ **Más simple:** El profesor no tiene que recordar escribir la categoría
- ✅ **Sin errores:** No puede poner por error "quimica" en un archivo que está en `/fisica/`
- ✅ **Organización visual:** Solo con ver la carpeta sabes de qué materia es
- ✅ **Movible:** Si quieres mover una unidad de materia, solo mueves el archivo de carpeta

**Regla práctica:**
- Archivo en `/content/quimica/` → Aparece en la materia Química
- Archivo en `/content/fisica/` → Aparece en la materia Física
- Y así sucesivamente

---

## 🎨 CÓMO FUNCIONAN LAS PESTAÑAS (TABS)

### Sistema Simple y Directo

El sistema es **extremadamente simple**: **Lo que escribes es lo que aparece**.

### Regla de Oro

```
## (H2) = Abre una NUEVA SUBUNIDAD (sección grande)
### (H3) = Crea una PESTAÑA (tab) dentro de esa subunidad
```

---

### ¿Qué Aparece en Cada Pestaña?

**El nombre de la pestaña es EXACTAMENTE el título H3 que escribiste.**

**Ejemplos:**

| Tú escribes en el H3 | Aparece en la pestaña |
|---------------------|----------------------|
| `### Ejercicio 1` | **Ejercicio 1** |
| `### 📝 Ejercicio 1` | **📝 Ejercicio 1** |
| `### Actividad Práctica` | **Actividad Práctica** |
| `### 🔬 Lab Virtual` | **🔬 Lab Virtual** |
| `### Cualquier Texto` | **Cualquier Texto** |

**👉 Regla:** Si quieres un ícono en la pestaña, **ponlo tú en el título H3**. Si no pones ícono, no aparece.

---

### ¿Qué Contenido Va Dentro de Cada Pestaña?

**Todo lo que escribas debajo del H3** se embebe en esa pestaña, incluyendo:

#### 1. **Videos Embebidos (YouTube + TikTok opcional)**

Para indicar que quieres embeber un video, **debes usar el prefijo `video:` antes del enlace**:

```markdown
### 🎬 Tutorial Completo

video: https://youtu.be/ABC123
video: https://vt.tiktok.com/ZSBJDCbPR/

En este video aprenderás el proceso completo de tamizado.
```

**Resultado:** 
- El video de YouTube se **embebe directamente** en la pestaña (reproductor completo visible)
- El video de TikTok aparece en un **sitio discreto** (ícono o botón pequeño) que dice "Ver en TikTok"
- **Ambos videos son EL MISMO contenido** - subes el mismo video en ambas plataformas, solo que TikTok es opcional para ver en esa red social

**⚠️ REGLAS IMPORTANTES:**

1. **Usa el prefijo `video:`** para indicar que es el video relacionado con la pestaña
2. **YouTube va primero**, TikTok va justo debajo (si lo tienes)
3. **TikTok es completamente opcional** - si no subes a TikTok, solo pon el de YouTube
4. **El prefijo `video:` es obligatorio** - sin él, el sistema lo trata como hipervínculo normal

**Ejemplo solo con YouTube:**
```markdown
video: https://youtu.be/ABC123
```

**Ejemplo con YouTube + TikTok:**
```markdown
video: https://youtu.be/ABC123
video: https://vt.tiktok.com/ZSBJDCbPR/
```

---

#### 2. **Enlaces/Hipervínculos Normales**

Para enlaces que **NO son el video embebido principal**, usa el formato estándar de Markdown (sin prefijo `video:`):

```markdown
### Recursos Adicionales

Consulta también estos recursos:
- [Video complementario en YouTube](https://youtu.be/OTRO_VIDEO)
- [Playlist completa](https://youtube.com/playlist?list=ABC)
- [Ver otro ejemplo en TikTok](https://vt.tiktok.com/OTRO_TIKTOK)

video: https://youtu.be/VIDEO_PRINCIPAL
video: https://vt.tiktok.com/VIDEO_PRINCIPAL

Este es el video principal embebido arriba. Los links anteriores son hipervínculos normales.
```

**Resultado:**
- Los 3 primeros links son **hipervínculos clickeables normales** (texto con enlace)
- El video con prefijo `video:` se **embebe** (reproductor de YouTube visible)
- El TikTok con prefijo `video:` aparece como **botón discreto** relacionado con el video embebido
- **El sistema diferencia por el prefijo `video:`** - con prefijo = embeber/botón discreto, sin prefijo = hipervínculo

**⚠️ DIFERENCIA CLAVE:**
- `video: https://youtu.be/ABC` → **Embebe el video** de YouTube y muestra TikTok discreto
- `[Ver video](https://youtu.be/ABC)` → **Hipervínculo normal** clickeable

---

#### 3. **Texto Simple**

Todo el texto que escribas se renderiza tal cual:

```markdown
### Conceptos Clave

El tamizado separa partículas según su **tamaño**.

**Puntos importantes:**
- Usa mallas de diferentes calibres
- Es un método físico
```

**Resultado:** La pestaña "Conceptos Clave" muestra el texto formateado con negritas y lista.

---

#### 4. **Enlaces/Hipervínculos**

Los enlaces en formato Markdown se convierten en links clickeables:

```markdown
### Recursos Adicionales

Consulta este [Simulador de PhET](https://phet.colorado.edu/es/simulation/...).

También puedes descargar [Material en PDF](https://drive.google.com/...).
```

**Resultado:** La pestaña "Recursos Adicionales" muestra los textos con enlaces clickeables.

---

#### 5. **Mezcla de Todo**

Puedes combinar videos, texto, enlaces, todo en una misma pestaña:

```markdown
### 🎯 Ejercicio Completo

**Mira primero este video:**

video: https://youtu.be/ABC123

**Luego resuelve:**
¿Qué tamiz usarías para separar arena de grava?

**Opciones:**
- a) Tamiz de 1mm
- b) Tamiz de 5mm ✅
- c) Tamiz de 10mm

**Recursos:**
- [Ver simulador](https://example.com/sim)
- [Descargar guía](https://drive.google.com/...)
```

**Resultado:** La pestaña "🎯 Ejercicio Completo" muestra TODO: video embebido, pregunta, opciones, y enlaces.

---

## 📐 REGLAS DE FORMATO MARKDOWN

### Formato de Texto

| Quieres | Escribe | Se ve como |
|---------|---------|------------|
| Texto en negrita | `**texto**` | **texto** |
| Texto en cursiva | `*texto*` | *texto* |
| Título principal | `# Título` | (Muy grande) |
| Tema principal | `## Tema` | (Grande, crea sección) |
| Sub-tema | `### Subtema` | (Mediano, crea pestaña) |

### Listas

**Lista con viñetas:**
```markdown
- Primer elemento
- Segundo elemento
- Tercer elemento
```

**Lista numerada:**
```markdown
1. Primer paso
2. Segundo paso
3. Tercer paso
```

### Enlaces

**Enlace externo:**
```markdown
[Texto que se verá](https://url.com)
```

**Ejemplo:**
```markdown
[Ver video en YouTube](https://youtube.com/watch?v=abc123)
```
Se convierte en un enlace clickeable: [Ver video en YouTube](https://youtube.com/watch?v=abc123)

---

## 📺 CÓMO INCLUIR VIDEOS

### Formato Correcto: prefijo `video:`

**REGLA FUNDAMENTAL:** Para que un video se embeba (YouTube) o aparezca discreto (TikTok), **DEBES usar el prefijo `video:`** antes del enlace.

### Videos de YouTube (se embeben)

**Opción 1: Justo después del `##` (se embebe en pestaña Videos)**
```markdown
## Tema Principal

video: https://youtu.be/ABC123
video: https://youtube.com/watch?v=XYZ789

Contenido del tema...
```

**Resultado:** Crea pestaña "🎬 Videos (2)" con los videos embebidos (reproductores visibles)

**Opción 2: Dentro de un sub-tema (se embebe en esa pestaña)**
```markdown
### Ejercicio 1

Mira este video tutorial:

video: https://youtu.be/ABC123

Ahora intenta resolver...
```

**Resultado:** El video se embebe directamente dentro del Ejercicio 1

---

### Videos de TikTok (botón discreto)

Los videos de TikTok **NO se embeben**. En lugar de eso, aparecen como un **botón o ícono discreto** que lleva al video externo.

**IMPORTANTE:** El video de TikTok debe ir **justo debajo** del video de YouTube correspondiente, ya que es el **mismo video** subido en ambas plataformas:

```markdown
## Tema Principal

video: https://youtu.be/ABC123
video: https://vt.tiktok.com/ZSBJDCbPR/

Contenido...
```

**Resultado:** 
- YouTube se embebe (reproductor visible)
- TikTok aparece como botón discreto "🎵 Ver en TikTok" debajo o al lado
- El estudiante puede elegir dónde ver el mismo contenido

**Si no subes a TikTok:**
```markdown
video: https://youtu.be/ABC123
```
Solo aparece el video de YouTube embebido, sin opción TikTok.

---

### Diferencia: Video Embebido vs Hipervínculo

| Formato | Resultado | Cuándo usar |
|---------|-----------|-------------|
| `video: https://youtu.be/ABC` | Video **embebido** (reproductor visible) | Video principal de la pestaña |
| `video: https://vt.tiktok.com/ABC` | Botón **discreto** "Ver en TikTok" | Mismo video, opción TikTok |
| `[Ver video](https://youtu.be/ABC)` | **Hipervínculo** clickeable normal | Video complementario/adicional |
| `[Ver en TikTok](https://vt.tiktok.com/ABC)` | **Hipervínculo** clickeable normal | TikTok adicional diferente |

---
```

### Enlaces a Simuladores

```markdown
### Simulador Virtual

Practica con este simulador interactivo:
[Simulador PhET - Separación de Mezclas](https://phet.colorado.edu/es/simulation/...)

**Instrucciones:**
1. Haz clic en el enlace
2. Selecciona el tipo de mezcla
3. Experimenta con diferentes métodos
```

---

## 📋 EJEMPLO VISUAL PASO A PASO

### Lo que el Profesor Escribe:

```markdown
## 🧪 Método 1: Tamizado

### 📖 Teoría

El **tamizado** separa partículas por tamaño usando mallas.

**Conceptos:**
- Granulometría
- Porosidad del tamiz

### 🎬 Videos Explicativos

video: https://youtu.be/ZB3H8VlNBWY
video: https://vt.tiktok.com/ZSBJDCbPR/

Este video muestra el proceso completo de tamizado.

### 📝 Ejercicio 1

video: https://youtu.be/TUTORIAL_EJERCICIO

**Pregunta:** ¿Qué tamiz usar para separar arena y grava?

**Opciones:**
- a) 1mm
- b) 5mm ✅

Consulta el [simulador aquí](https://example.com/sim).

### 🔬 Laboratorio

**Materiales:** Arena, grava, tamiz

**Procedimiento:**
1. Mezcla los materiales
2. Tamiza la mezcla
3. Observa resultados
```

---

### Lo que el Estudiante Ve:

```
═══════════════════════════════════════════════════════
🧪 Método 1: Tamizado
───────────────────────────────────────────────────────
┌────────────────────────────────────────────────────┐
│ 📖 Teoría │ 🎬 Videos │ 📝 Ejercicio 1 │ 🔬 Laboratorio │
└────────────────────────────────────────────────────┘
      ↑ 4 pestañas = 4 títulos H3 que escribiste

[Cuando hace clic en "📖 Teoría"]
─────────────────────────────────────
El **tamizado** separa partículas por tamaño usando mallas.

**Conceptos:**
• Granulometría
• Porosidad del tamiz

[Cuando hace clic en "🎬 Videos Explicativos"]
─────────────────────────────────────
┌────────────────────────────────────────┐
│ [VIDEO DE YOUTUBE EMBEBIDO]            │
│ (Reproductor completo de YouTube)      │
│                                        │
│              🎬 Ver en TikTok ← discreto │
└────────────────────────────────────────┘

Este video muestra el proceso completo de tamizado.

[Cuando hace clic en "📝 Ejercicio 1"]
─────────────────────────────────────
┌────────────────────────────────────────┐
│ [VIDEO TUTORIAL EMBEBIDO]              │
│ (Reproductor de YouTube)               │
└────────────────────────────────────────┘

**Pregunta:** ¿Qué tamiz usar para separar arena y grava?

**Opciones:**
• a) 1mm
• b) 5mm ✅

Consulta el simulador aquí ← Link clickeable que abre https://example.com/sim

[Cuando hace clic en "🔬 Laboratorio"]
─────────────────────────────────────
**Materiales:** Arena, grava, tamiz

**Procedimiento:**
1. Mezcla los materiales
2. Tamiza la mezcla
3. Observa resultados
```

---

### 🎯 Puntos Clave de Este Ejemplo

1. **Un H2** (`## 🧪 Método 1: Tamizado`) = **Una subunidad/sección**
2. **Cuatro H3** = **Cuatro pestañas**
3. **El nombre de cada H3** (incluyendo íconos) = **El nombre exacto de la pestaña**
4. **YouTube debajo de H3** = Se embebe en esa pestaña
5. **TikTok debajo de H3** = Se muestra como link
6. **Todo el contenido debajo de H3** = Va dentro de esa pestaña

---

## ✅ CHECKLIST PARA EL PROFESOR

Antes de subir un archivo, verifica:

### Estructura Básica
- [ ] ¿Tiene metadatos al inicio entre `---`?
- [ ] ¿Tiene título principal con `#` (solo uno)?
- [ ] ¿Los temas principales usan `##`?
- [ ] ¿Los ejercicios/actividades usan `###`?

### Contenido
- [ ] ¿Los videos están justo después del `##`?
- [ ] ¿Los textos importantes están en **negrita**?
- [ ] ¿Las listas usan guiones `-` o números `1.`?
- [ ] ¿Los enlaces están en formato `[texto](url)`?

### Calidad
- [ ] ¿La descripción explica bien de qué trata?
- [ ] ¿Cada tema tiene contenido teórico?
- [ ] ¿Hay ejercicios o actividades prácticas?
- [ ] ¿Los URLs de videos funcionan?

---

## 📦 EJEMPLO COMPLETO DE ARCHIVO LISTO PARA SUBIR

```markdown
---
title: "Separación de Mezclas"
description: "Aprende los métodos físicos para separar mezclas heterogéneas: tamizado, filtración, destilación y decantación"
---

# Separación de Mezclas

[Playlist Completa](https://youtube.com/playlist?list=PLvciGh3Wfg79aeFuQjc_uTRlO0tbBfaq8)
[Material en PDF](https://drive.google.com/drive/folders/1IFK_fajTjTI7XGdSh7XVemZp-dJ_HNeZ)

## 🎬 Método 1: Tamizado

video: https://youtu.be/ZB3H8VlNBWY
video: https://vt.tiktok.com/ZSBJDCbPR/

El **tamizado** es un método físico que separa partículas sólidas de diferentes tamaños mediante el uso de mallas o tamices.

**Conceptos clave:**
- **Granulometría:** Clasificación de partículas según su tamaño
- **Porosidad del tamiz:** Tamaño de las aberturas de la malla
- **Fracción granulométrica:** Rango de tamaños retenidos o que pasan

**Aplicaciones en la vida real:**
- Construcción: separar arena de grava
- Cocina: tamizar harina para eliminar grumos
- Minería: clasificar minerales por tamaño
- Reciclaje: separar plásticos de diferentes tamaños

### ✏️ Ejercicio 1: Selección de tamiz

**Situación:** Tienes una mezcla de arroz (7mm de diámetro) y lentejas (5mm de diámetro). 
Necesitas separarlos usando un tamiz.

**Pregunta:** ¿Qué tamaño de malla usarías y por qué?

**Opciones:**
- a) Malla de 8mm
- b) Malla de 6mm ✅
- c) Malla de 4mm

**Explicación:** 
La malla de 6mm es la correcta porque:
- Las lentejas (5mm) **pasan** a través de la malla
- El arroz (7mm) **queda retenido** en la malla
- Es el tamaño intermedio perfecto entre ambas medidas

### 🧪 Actividad Práctica

**Objetivo:** Observar el proceso de tamizado con materiales caseros

**Materiales necesarios:**
- Arena fina
- Grava pequeña
- Tamiz o colador de cocina
- Dos recipientes

**Procedimiento paso a paso:**
1. Mezcla arena y grava en un recipiente
2. Coloca el tamiz sobre el segundo recipiente
3. Vierte la mezcla sobre el tamiz
4. Agita suavemente con movimientos circulares
5. Observa cómo la arena pasa y la grava queda retenida
6. Compara ambos recipientes

**Preguntas de reflexión:**
- ¿Qué pasaría si usamos un tamiz de malla más grande?
- ¿Y si usamos uno de malla más pequeña?
- ¿Qué otros materiales podrías separar con este método?

**💡 Dato curioso:** Este mismo principio se usa en las minas de oro para separar pepitas grandes de arena.

---

## 🎬 Método 2: Filtración

video: https://youtu.be/ugGqsxTNGnM
video: https://youtu.be/Ik9pq76xC4s

La **filtración** es un proceso que separa sólidos insolubles de líquidos usando un medio poroso (papel filtro, tela, membrana).

**Conceptos fundamentales:**
- **Residuo:** Material sólido que queda retenido en el filtro
- **Filtrado:** Líquido que atraviesa el filtro
- **Filtración por gravedad:** El líquido pasa por su propio peso
- **Filtración al vacío:** Se acelera el proceso con bomba de vacío

**Ejemplos cotidianos:**
- Filtro de café
- Purificadores de agua
- Filtros de aire acondicionado
- Filtros de mascarillas

### ✏️ Ejercicio 2: Identificar componentes

**Situación:** Filtras una mezcla de arena en agua usando papel filtro.

**Preguntas:**
1. ¿Qué queda en el papel filtro y cómo se llama?
2. ¿Qué pasa a través del filtro y cómo se llama?
3. ¿Por qué la arena no atraviesa el papel filtro?

**Respuestas:**
1. **Residuo:** La arena queda retenida en el papel filtro
2. **Filtrado:** El agua limpia pasa a través del filtro
3. **Explicación:** Las partículas de arena son más grandes que los poros microscópicos del papel filtro, por eso quedan atrapadas

### 🎮 Simulador Virtual

Practica el proceso de filtración en este simulador interactivo:

[Simulador PhET - Filtración](https://phet.colorado.edu/es/simulation/filter-simulation)

**Características del simulador:**
- Experimenta con diferentes tipos de mezclas
- Observa el proceso a nivel microscópico
- Prueba distintos tipos de filtros
- Mide velocidades de filtración

**Actividades sugeridas:**
1. Filtra arena en agua y observa el resultado
2. Intenta filtrar sal en agua (¿qué sucede?)
3. Compara la velocidad de filtración con diferentes filtros
4. Identifica qué mezclas se pueden separar por filtración

---

## 🎬 Método 3: Destilación

video: https://youtu.be/e30igE4CNdA

La **destilación** es una técnica que separa líquidos miscibles aprovechando sus diferentes puntos de ebullición.

**Principio:** 
- Cada líquido hierve a una temperatura específica
- Al calentar la mezcla, el líquido con menor punto de ebullición se evapora primero
- Los vapores se enfrían y condensan en otro recipiente
- Obtenemos los líquidos separados

**Aplicaciones industriales:**
- Destilación de petróleo para obtener gasolina, diesel, etc.
- Producción de bebidas alcohólicas
- Desalinización de agua de mar
- Fabricación de perfumes

### ✏️ Ejercicio 4: Cálculo de punto de ebullición

**Datos:** Una mezcla contiene agua (p.e. 100°C) y alcohol etílico (p.e. 78°C)

**Pregunta:** Si calientas la mezcla gradualmente:
1. ¿Qué líquido se evapora primero?
2. ¿A qué temperatura aproximada?
3. ¿Cómo sabes cuándo empieza a destilar el segundo líquido?

**Respuestas:**
1. El alcohol etílico se evapora primero
2. Alrededor de los 78°C
3. Cuando el termómetro marca cerca de 100°C, comienza a destilar el agua

### 🔍 Desafío de Investigación

**Tema:** Destilación fraccionada del petróleo

**Tareas:**
1. Investiga qué es una torre de destilación fraccionada
2. Dibuja un esquema mostrando los diferentes productos
3. Indica a qué temperaturas se obtiene cada fracción
4. Explica por qué es importante este proceso para la industria

**Recursos sugeridos:**
- Video educativo: [Ver torre de destilación](https://youtube.com/...)
- Lectura: [Refinación del petróleo - PDF](https://drive.google.com/...)

**Entrega:** Informe de 1 página con esquema y explicación

### 🎯 Quiz de Autoevaluación

**Instrucciones:** Responde las siguientes preguntas para verificar tu comprensión.

**1.** ¿Cuál es la diferencia principal entre destilación simple y fraccionada?

**2.** Si tienes una mezcla de agua (100°C), alcohol (78°C) y acetona (56°C), 
¿en qué orden se destilarán?

**3.** ¿Por qué no puedes destilar una mezcla de aceite y agua si el aceite 
se descompone a 150°C y el agua hierve a 100°C?

**4.** Dibuja un montaje de destilación simple etiquetando todas las partes.

### 🏆 Proyecto Final Integrador

**Título:** Diseña un Proceso de Separación Completo

**Objetivo:** Aplicar todos los métodos aprendidos para separar una mezcla compleja

**Escenario:**
Tienes una mezcla que contiene:
- Arena (sólido grande)
- Sal (sólida soluble)
- Aceite (líquido inmiscible con agua)
- Agua

**Tareas:**
1. Diseña un proceso de separación usando los 4 métodos estudiados
2. Indica el orden correcto de las operaciones
3. Explica por qué elegiste ese orden
4. Dibuja un diagrama de flujo del proceso
5. Predice qué obtendrás en cada paso

**Criterios de evaluación:**
- Orden lógico del proceso (30%)
- Justificación científica (30%)
- Claridad del diagrama (20%)
- Predicción de resultados (20%)

**Entrega:** Informe de 2-3 páginas + diagrama
```

---

## 🚀 PROCESO DE SUBIDA Y PUBLICACIÓN

### ¿Cómo Sube el Profesor el Contenido?

#### Sistema Simple (Recomendado para empezar)**

1. **Crear el archivo:**
   - Abre un editor de texto (Bloc de notas, VS Code, Sublime Text)
   - Escribe el contenido siguiendo el formato explicado
   - Guarda con nombre `02-separacion-de-mezclas.md`
     - El número (02) indica el orden
     - Usa guiones en vez de espacios
     - Extensión `.md` al final

2. **Subir a la plataforma:**
   - Entra a la carpeta de contenido del proyecto
   - Copia tu archivo `.md` a la carpeta correspondiente:
     - `/content/quimica/` para química
     - `/content/fisica/` para física
     - `/content/matematicas/` para matemáticas
     - `/content/ciencias/` para ciencias

3. **Publicar:**
   - El sistema detecta el archivo automáticamente
   - En 2-5 minutos aparece en la web
   - ¡Listo! Los estudiantes ya pueden verlo


---

## 🎯 COMPORTAMIENTO ESPERADO DEL SISTEMA

### Lo Que el Sistema Hace Automáticamente

| El profesor escribe | El sistema automáticamente |
|--------------------|----------------------------|
| `##` (H2) | Crea una nueva subunidad/sección |
| `###` (H3) | Crea una nueva pestaña |
| `### 📝 Ejercicio 1` | Crea pestaña llamada "📝 Ejercicio 1" (exacto) |
| `### Actividad` | Crea pestaña llamada "Actividad" (sin ícono) |
| `video: URL_YOUTUBE` | Embebe el video de YouTube en esa pestaña |
| `video: URL_TIKTOK` (después de YouTube) | Muestra botón discreto "Ver en TikTok" |
| `[texto](url)` | Crea hipervínculo clickeable normal |
| `**texto**` | Lo muestra en **negrita** |
| `- item` | Crea lista con viñetas |
| Archivos con números `01-`, `02-` | Los ordena automáticamente |
| Cada H3 | Genera enlace directo compartible |

### Lo Que NO Necesita Hacer el Profesor

❌ **NO** necesita escribir HTML  
❌ **NO** necesita escribir CSS  
❌ **NO** necesita configurar las pestañas manualmente  
❌ **NO** necesita programar nada  
❌ **NO** necesita crear la tabla de contenidos (se genera sola)  
❌ **NO** necesita preocuparse por responsive (funciona automáticamente)  
❌ **NO** necesita detectar qué tipo de contenido es (ejercicio, quiz, etc.) - solo escribe el título  

### Lo Que SÍ Debe Hacer el Profesor

✅ Escribir contenido educativo de calidad  
✅ Usar `##` para crear subunidades y `###` para crear pestañas  
✅ **Poner íconos en los H3** si quiere que aparezcan en las pestañas (ej: `### 📝 Ejercicio 1`)  
✅ **Usar el prefijo `video:`** antes de URLs de YouTube/TikTok para embeber  
✅ Poner el video de TikTok justo debajo del de YouTube (es el mismo video)  
✅ Usar `**negritas**` para conceptos importantes  
✅ Revisar que los enlaces funcionen antes de publicar  

---

## 📊 EJEMPLOS DE CASOS DE USO

### Caso 1: Lección Simple

**El profesor quiere:**
- 3 temas principales
- 1 ejercicio por tema
- Sin videos

**Escribe:**
```markdown
## Tema 1
Contenido teórico...
### Ejercicio 1
Problema y solución...

## Tema 2
Contenido teórico...
### Ejercicio 2
Problema y solución...

## Tema 3
Contenido teórico...
### Ejercicio 3
Problema y solución...
```

**Resultado:**
- 3 secciones
- Cada una con 2 pestañas (Teoría + Ejercicio)
- 6 pestañas en total

---

### Caso 2: Lección Rica con Multimedia

**El profesor quiere:**
- 2 temas
- Videos en cada tema
- Múltiples ejercicios
- Actividad práctica
- Quiz final

**Escribe:**
```markdown
## Tema 1
https://youtu.be/VIDEO1
https://youtu.be/VIDEO2
Contenido teórico...

### Ejercicio 1
...
### Ejercicio 2
...
### Actividad Práctica
...

## Tema 2
https://youtu.be/VIDEO3
Contenido teórico...

### Ejercicio 3
...
### Quiz
...
```

**Resultado:**
- 2 secciones
- Tema 1: 5 pestañas (Teoría + Videos + 3 ejercicios/actividades)
- Tema 2: 3 pestañas (Teoría + Videos + Ejercicio + Quiz)
- 8 pestañas totales

---

### Caso 3: Unidad Completa de Evaluación

**El profesor quiere:**
- Resumen de la unidad
- Ejercicios de repaso
- Quiz de autoevaluación
- Proyecto final

**Escribe:**
```markdown
## Resumen de la Unidad
Repaso de conceptos principales...

### Ejercicios de Repaso
Problemas variados...

### Quiz de Autoevaluación
10 preguntas de opción múltiple...

### Proyecto Final
Trabajo integrador...
```

**Resultado:**
- 1 sección
- 4 pestañas (Resumen + 3 subsecciones)
- Perfecta para cierre de unidad

---

## 🎓 RESUMEN EJECUTIVO PARA EL PROFESOR

### En Pocas Palabras

1. **Escribes texto simple** en un archivo `.md`
2. **Usas `##` para temas** principales y `###` para pestañas
3. **Usas el prefijo `video:`** antes de URLs de YouTube/TikTok para embeber
4. **Subes el archivo** a la carpeta correcta
5. **El sistema hace toda la magia** automáticamente
6. **Los estudiantes ven** una página web profesional e interactiva

**Nota:** El mismo video se sube a YouTube (embebido) y TikTok (botón discreto opcional)

### Tiempo Estimado

- ✅ Lección simple: **10-15 minutos**
- ✅ Lección completa: **30-45 minutos**
- ✅ Unidad extensa: **1-2 horas**

### Comparación con Método Anterior

| Aspecto | Antes (Manual) | Ahora (Automático) |
|---------|---------------|-------------------|
| **Conocimientos requeridos** | HTML, CSS, JavaScript | Solo escribir texto |
| **Tiempo de creación** | 4-6 horas por unidad | 30-60 minutos |
| **Mantenimiento** | Difícil, requiere programador | Fácil, editar texto |
| **Resultado visual** | Depende de habilidad | Profesional siempre |
| **Responsive** | Hay que programarlo | Automático |
| **Pestañas interactivas** | Hay que codificarlas | Automáticas |

### Beneficios para el Profesor

✅ **Enfócate en el contenido**, no en la tecnología  
✅ **Actualizaciones rápidas**: cambia un texto y listo  
✅ **Reutilizable**: copia y adapta de un año a otro  
✅ **Consistente**: todos los cursos se ven profesionales  
✅ **Compartible**: los estudiantes pueden enviar links directos  
✅ **Accesible**: funciona en cualquier dispositivo  

---

## 🎯 CASOS ESPECIALES Y PREGUNTAS FRECUENTES

### ¿Necesito poner a qué materia pertenece el archivo?

**NO.** El sistema detecta la materia **automáticamente** por la carpeta:

```
Si guardas el archivo en:
- /content/quimica/    → Es de Química
- /content/fisica/     → Es de Física  
- /content/matematicas/→ Es de Matemáticas
- /content/ciencias/   → Es de Ciencias
```

**Por eso NO incluyes `categoria` en el frontmatter.** La estructura de carpetas ya define la materia.

---

### ¿Qué pasa si no pongo videos?

No hay problema. La pestaña "Videos" simplemente no se crea. El estudiante verá:
- Teoría
- Ejercicio 1
- Ejercicio 2
- etc.

---

### ¿Puedo tener un tema sin ejercicios?

Sí, perfectamente. Si solo escribes:

```markdown
## Tema Principal
Contenido teórico explicativo...
```

El estudiante verá solo una pestaña: "Teoría"

---

### ¿Puedo mezclar videos de YouTube y TikTok?

Sí, el sistema los detecta automáticamente:

```markdown
## Tema
https://youtu.be/VIDEO1
https://vt.tiktok.com/TIKTOK1
https://youtu.be/VIDEO2
```

Resultado: Pestaña "Videos (3)" con 2 embeds de YouTube y 1 botón de TikTok

---

### ¿Puedo agregar imágenes?

Por ahora, el sistema soporta texto, videos y enlaces. Para imágenes:

**Opción temporal:**
- Súbelas a Google Drive
- Comparte el link
- Ponlo como enlace: `[Ver diagrama](URL)`

**Opción futura:**
El sistema soportará sintaxis: `![descripción](url-imagen.jpg)`

---

### ¿Qué pasa si cometo un error en el formato?

El sistema es **tolerante a errores**:
- Si olvidas cerrar `**negritas**`, el texto se ve normal
- Si una URL no funciona, simplemente no se embebe
- Si mezclas `##` y `###`, se organiza lo mejor posible

**Recomendación:** Usa un editor con preview de Markdown (VS Code, Typora, etc.)

---

### ¿Puedo editar una unidad después de publicarla?

Sí, totalmente:
1. Abre el archivo `.md` original
2. Haz los cambios que necesites
3. Guarda el archivo
4. Los cambios aparecen en 2-5 minutos

**Ventaja:** Los estudiantes que ya compartieron un enlace directo a un ejercicio específico NO se rompe el link.

---

### ¿Cómo organizo múltiples unidades de una materia?

Usa números al inicio del nombre del archivo:

```
content/quimica/
  01-la-materia.md
  02-separacion-de-mezclas.md
  03-estructura-atomica.md
  04-tabla-periodica.md
  05-enlace-quimico.md
```

El sistema los ordena automáticamente por número.

---

### ¿Qué pasa si dos profesores suben archivos con el mismo nombre?

Cada archivo debe tener un nombre **único** dentro de su materia. 

**Buena práctica:** Incluye el número y un nombre descriptivo:
- `01-introduccion.md`
- `02-conceptos-basicos.md`
- `03-aplicaciones.md`

---

### ¿Puedo copiar contenido de un año a otro?

Sí, es una de las grandes ventajas:
1. Copia el archivo `.md` completo
2. Haz los ajustes necesarios
3. Guarda con nuevo nombre si es necesario
4. Súbelo a la plataforma

**Tip:** Puedes crear una "biblioteca" de ejercicios y actividades para reutilizar.

---

### ¿Los estudiantes pueden descargar el contenido?

Pueden:
- Copiar y pegar el texto
- Ver los videos directamente
- Imprimir la página completa
- Compartir enlaces directos

No pueden (por seguridad):
- Descargar videos embebidos (van a YouTube)
- Editar contenido

---

## 🎓 PRÓXIMOS PASOS PARA EL PROFESOR

### Para Empezar

1. **Revisa el ejemplo completo** de archivo que aparece en este documento
2. **Copia esa plantilla** como punto de partida
3. **Reemplaza el contenido** con tu tema
4. **Guarda** con nombre descriptivo y número
5. **Sube** a la plataforma
6. **Comparte** el link con tus estudiantes

### Mejores Prácticas

✅ **Mantén una estructura consistente** en todas tus unidades  
✅ **Usa negritas** para conceptos clave que quieres que se destaquen  
✅ **Incluye ejercicios variados** (no solo preguntas de opción múltiple)  
✅ **Agrega actividades prácticas** cuando sea posible  
✅ **Vincula recursos externos** (simuladores, videos complementarios)  
✅ **Revisa los enlaces** antes de publicar  

### Recursos de Apoyo

- **Plantilla de archivo:** (incluida en este documento)
- **Editor recomendado:** VS Code con extensión Markdown Preview
- **Generador de slugs:** (en caso de querer personalizar URLs)
- **Banco de simuladores:** PhET, Geogebra, etc.

---

## 📧 SOPORTE Y CONTACTO

### ¿Necesitas Ayuda?

**Para problemas técnicos:**
- El archivo no aparece en la web
- Los videos no se embeben
- Los enlaces no funcionan

**Para dudas de formato:**
- ¿Cómo estructuro este contenido específico?
- ¿Puedo hacer X cosa?
- No sé si mi archivo está bien formateado

**Para sugerencias:**
- Me gustaría que el sistema tuviera X función
- Sería útil poder hacer Y cosa
- Encontré algo que se podría mejorar

---

## 🚀 CONCLUSIÓN

### La Promesa del Sistema

Este sistema está diseñado para que **cualquier profesor**, sin importar su nivel técnico, pueda crear contenido web educativo de alta calidad simplemente **escribiendo texto con formato simple**.

### Lo que Logras con Este Sistema

✅ **Independencia tecnológica:** No dependes de un programador para cada cambio  
✅ **Velocidad de creación:** 10-60 minutos por unidad completa  
✅ **Calidad profesional:** Todos tus cursos se ven consistentes y modernos  
✅ **Experiencia de estudiante mejorada:** Navegación intuitiva y contenido organizado  
✅ **Actualización fácil:** Editar es tan simple como cambiar un texto  
✅ **Escalabilidad:** Puedes crear cientos de unidades sin complicarte  

### Tu Única Responsabilidad

**Enfócate en lo que haces mejor:** Crear contenido educativo de calidad.

El sistema se encarga del resto: diseño, interactividad, responsive, organización, navegación.

---

**Fecha de creación:** 11 de octubre de 2025  
**Versión:** 1.0 - Especificaciones Funcionales  
**Dirigido a:** Profesores y creadores de contenido educativo  
**Sistema actual de referencia:** http://localhost:4321/prueba-tabs-automatico

