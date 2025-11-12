# 📚 Índice de Documentación - Ediprofe

## 🎯 Guías por Audiencia

### Para IAs que Generan Contenido
📄 **[PROMPT-IA-GENERACION-CONTENIDO.md](./PROMPT-IA-GENERACION-CONTENIDO.md)**
- Prompt completo para ChatGPT/Claude/Gemini
- Sintaxis exacta de ecuaciones LaTeX
- Ejemplos de formato correcto
- Checklist de validación
- **USO:** Copiar y pegar al solicitar contenido educativo

### Para Profesores/Creadores de Contenido
📄 **[GUIA-ECUACIONES-PROFESORES.md](./GUIA-ECUACIONES-PROFESORES.md)**
- Guía simple para escribir ecuaciones
- Sintaxis básica de markdown
- Comandos LaTeX esenciales
- Errores comunes y soluciones
- **USO:** Referencia rápida al crear contenido manualmente

### Para Desarrolladores
📄 **[ARQUITECTURA-ECUACIONES.md](./ARQUITECTURA-ECUACIONES.md)**
- Arquitectura del sistema de ecuaciones
- Stack tecnológico completo
- Flujo de procesamiento
- Decisiones de diseño
- **USO:** Entender cómo funciona el sistema

📄 **[RESUMEN-SOLUCION-FINAL.md](./RESUMEN-SOLUCION-FINAL.md)**
- Resumen ejecutivo de la solución
- Comparación antes/después
- Lecciones aprendidas
- Solución de problemas comunes
- **USO:** Onboarding rápido para nuevos desarrolladores

---

## 📖 Documentación Técnica Adicional

### LaTeX y Renderizado
📄 **[LATEX_GUIDELINES.md](./LATEX_GUIDELINES.md)**
- Comandos LaTeX soportados por KaTeX
- Mejores prácticas
- Comandos a evitar
- Sintaxis correcta vs incorrecta

📄 **[MATH_RENDERING_SOLUTION.md](./MATH_RENDERING_SOLUTION.md)**
- Solución técnica detallada
- Implementación de `preprocessMath`
- Casos de prueba
- Garantías del sistema

### Sistema de Ecuaciones (Histórico)
📄 **[SISTEMA-ECUACIONES.md](./SISTEMA-ECUACIONES.md)**
- Documentación histórica del sistema
- Primera implementación
- **NOTA:** Algunas partes pueden estar obsoletas

---

## 🗂️ Estructura de Archivos del Proyecto

```
/
├── app/                          # Next.js App Router
│   ├── globals.css              # Estilos globales (incluye .katex-display)
│   ├── layout.tsx               # Layout principal (importa katex.min.css)
│   └── [materia]/[unidad]/      # Rutas dinámicas
│
├── components/                   # Componentes React
│   ├── NotesModal.tsx           # Modal de notas (usa preprocessMath)
│   ├── MarkdownContent.tsx      # Renderizador de HTML
│   └── TabsContainer.tsx        # Contenedor de pestañas
│
├── lib/                         # Lógica de negocio
│   ├── tabs-generator.ts        # Procesador de markdown (usa preprocessMath)
│   └── markdown.ts              # Utilidades de markdown
│
├── content/                     # Contenido educativo
│   └── fisica/                  # Contenido de física
│       └── 01-introduccion.md   # Ejemplo de contenido
│
└── docs/                        # Documentación (este directorio)
    ├── PROMPT-IA-GENERACION-CONTENIDO.md
    ├── GUIA-ECUACIONES-PROFESORES.md
    ├── ARQUITECTURA-ECUACIONES.md
    ├── RESUMEN-SOLUCION-FINAL.md
    ├── LATEX_GUIDELINES.md
    └── MATH_RENDERING_SOLUTION.md
```

---

## 🔄 Flujo de Trabajo

### 1. Generar Contenido con IA

```
1. Abrir: PROMPT-IA-GENERACION-CONTENIDO.md
2. Copiar el prompt completo
3. Pegar en ChatGPT/Claude/Gemini
4. Especificar tema deseado
5. Validar con checklist
6. Copiar resultado a archivo .md
```

### 2. Crear Contenido Manualmente

```
1. Consultar: GUIA-ECUACIONES-PROFESORES.md
2. Seguir sintaxis de ecuaciones
3. Usar comandos LaTeX recomendados
4. Verificar formato correcto
5. Probar en desarrollo
```

### 3. Desarrollar/Mantener Sistema

```
1. Leer: ARQUITECTURA-ECUACIONES.md
2. Entender: preprocessMath() en tabs-generator.ts
3. Modificar si es necesario
4. Actualizar documentación
5. Probar cambios
```

---

## 🎯 Decisiones de Diseño Clave

### 1. Simplicidad sobre Complejidad
**Decisión:** Usar `preprocessMath` simple (10 líneas) en vez de `normalizeMathSyntax` complejo (120+ líneas)

**Razón:** Menos código = menos bugs, más fácil de mantener

**Archivo:** `lib/tabs-generator.ts`, `components/NotesModal.tsx`

### 2. Sintaxis Estándar de remark-math
**Decisión:** Usar sintaxis estándar de `remark-math` sin transformaciones complejas

**Razón:** Compatible con IAs, fácil de documentar, robusto

**Referencia:** [remark-math docs](https://github.com/remarkjs/remark-math)

### 3. Estilos CSS Centralizados
**Decisión:** Todos los estilos de ecuaciones en `app/globals.css`

**Razón:** Un solo lugar para mantener, fácil de modificar

**Archivo:** `app/globals.css` (líneas 444-495)

### 4. Documentación por Audiencia
**Decisión:** Documentación separada para IAs, profesores y desarrolladores

**Razón:** Cada audiencia necesita información diferente

**Archivos:** Ver sección "Guías por Audiencia"

---

## 🚨 Problemas Comunes y Soluciones

### Problema 1: Ecuaciones sin estilos visuales
**Síntoma:** Ecuaciones se ven pero sin borde/fondo

**Causa:** `$$` no están en líneas separadas

**Solución:** 
```markdown
❌ $$E = mc^2$$

✅ 
$$
E = mc^2
$$
```

**Referencia:** GUIA-ECUACIONES-PROFESORES.md

### Problema 2: Error "Cannot find module katex"
**Síntoma:** Error al iniciar servidor

**Solución:**
```bash
rm -rf .next
npm run dev
```

**Referencia:** RESUMEN-SOLUCION-FINAL.md

### Problema 3: Ecuación muestra código crudo
**Síntoma:** Se ve `\theta = \arctan(...)` en rojo

**Causa:** Sintaxis LaTeX incorrecta o no está dentro de `$...$` o `$$...$$`

**Solución:** Verificar sintaxis en LATEX_GUIDELINES.md

### Problema 4: IA genera \tan^{-1}
**Síntoma:** IA usa `\tan^{-1}` en vez de `\arctan`

**Solución:** Usar PROMPT-IA-GENERACION-CONTENIDO.md que especifica usar `\arctan`

---

## 📝 Convenciones de Código

### Nombres de Funciones
- `preprocessMath()` - Preprocesa markdown antes de remark
- `markdownToHtml()` - Convierte markdown a HTML
- `extractSections()` - Extrae secciones del markdown

### Estructura de Markdown
```markdown
## Sección (H2)

### Pestaña (H3)

Contenido de la pestaña...

---

### Otra Pestaña (H3)

Más contenido...
```

### Bloques de Código
- Markdown educativo: Dentro de ` ```markdown ``` `
- Código de programación: Dentro de ` ```python ``` `, ` ```javascript ``` `, etc.

---

## 🔧 Stack Tecnológico

### Frontend
- **Next.js 15.5.4** - Framework React
- **React 18** - Biblioteca UI
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos

### Procesamiento de Markdown
- **remark** - Parser de markdown
- **remark-gfm** - GitHub Flavored Markdown
- **remark-math** - Detecta expresiones matemáticas
- **remark-rehype** - Convierte markdown a HTML
- **rehype-katex** - Renderiza LaTeX con KaTeX
- **rehype-stringify** - Convierte HTML AST a string

### Renderizado de Ecuaciones
- **KaTeX 0.16.x** - Renderizador LaTeX rápido
- **katex.min.css** - Estilos de KaTeX

---

## 📊 Métricas de Calidad

### Código
- ✅ Simplicidad: 10 líneas vs 120+ anteriores
- ✅ Cobertura: Todos los casos de uso cubiertos
- ✅ Mantenibilidad: Código fácil de entender
- ✅ Escalabilidad: Fácil de extender

### Documentación
- ✅ Completa: 7 documentos
- ✅ Organizada: Por audiencia
- ✅ Actualizada: Noviembre 2025
- ✅ Ejemplos: Múltiples ejemplos en cada guía

### Usuario
- ✅ IA-friendly: Compatible con copiar/pegar
- ✅ Intuitivo: Sintaxis estándar
- ✅ Visual: Estilos elegantes
- ✅ Responsive: Funciona en móvil

---

## 🎓 Recursos Externos

### remark-math
- **Docs:** https://github.com/remarkjs/remark-math
- **Uso:** Detectar expresiones matemáticas en markdown

### KaTeX
- **Docs:** https://katex.org/docs/supported.html
- **Uso:** Lista completa de comandos soportados

### Next.js
- **Docs:** https://nextjs.org/docs
- **Uso:** Framework y App Router

### Tailwind CSS
- **Docs:** https://tailwindcss.com/docs
- **Uso:** Clases de utilidad y prose

---

## 🔄 Proceso de Actualización

### Agregar Nueva Funcionalidad

1. **Evaluar necesidad**
   - ¿Es realmente necesario?
   - ¿Agrega complejidad innecesaria?

2. **Diseñar solución**
   - Preferir simplicidad
   - Usar estándares cuando sea posible

3. **Implementar**
   - Escribir código limpio
   - Agregar comentarios si es necesario

4. **Documentar**
   - Actualizar documentación relevante
   - Agregar ejemplos

5. **Probar**
   - Casos normales
   - Casos edge
   - Verificar visual

### Actualizar Documentación

1. **Identificar cambios**
   - ¿Qué cambió?
   - ¿Qué documentos afecta?

2. **Actualizar archivos**
   - Mantener consistencia
   - Actualizar ejemplos

3. **Verificar obsoletos**
   - Eliminar información vieja
   - Marcar como histórico si es relevante

4. **Actualizar README-DOCUMENTACION.md**
   - Este archivo
   - Fecha de última actualización

---

## ✅ Estado de la Documentación

| Documento | Estado | Última Actualización | Audiencia |
|-----------|--------|---------------------|-----------|
| PROMPT-IA-GENERACION-CONTENIDO.md | ✅ Actual | Nov 2025 | IA |
| GUIA-ECUACIONES-PROFESORES.md | ✅ Actual | Nov 2025 | Profesores |
| ARQUITECTURA-ECUACIONES.md | ✅ Actual | Nov 2025 | Desarrolladores |
| RESUMEN-SOLUCION-FINAL.md | ✅ Actual | Nov 2025 | Todos |
| LATEX_GUIDELINES.md | ✅ Actual | Nov 2025 | Profesores/Dev |
| MATH_RENDERING_SOLUTION.md | ✅ Actual | Nov 2025 | Desarrolladores |
| SISTEMA-ECUACIONES.md | ⚠️ Histórico | Anterior | Referencia |
| README-DOCUMENTACION.md | ✅ Actual | Nov 2025 | Todos |

---

## 🚀 Quick Start

### Para Generar Contenido
1. Abrir `PROMPT-IA-GENERACION-CONTENIDO.md`
2. Copiar prompt
3. Usar con IA
4. Validar resultado

### Para Entender el Sistema
1. Leer `RESUMEN-SOLUCION-FINAL.md`
2. Leer `ARQUITECTURA-ECUACIONES.md`
3. Explorar código en `lib/tabs-generator.ts`

### Para Solucionar Problemas
1. Consultar sección "Problemas Comunes" arriba
2. Revisar `RESUMEN-SOLUCION-FINAL.md`
3. Verificar sintaxis en `LATEX_GUIDELINES.md`

---

**Mantenedor:** Equipo Ediprofe  
**Última actualización:** Noviembre 2025  
**Versión:** 1.0  
**Estado:** ✅ PRODUCCIÓN
