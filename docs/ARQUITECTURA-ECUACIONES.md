# 🏗️ Arquitectura del Sistema de Ecuaciones - Ediprofe

## 🎯 Filosofía de Diseño

**Principio fundamental:** Usar la sintaxis estándar de `remark-math` sin transformaciones complejas.

### ✅ Ventajas de este Enfoque:

1. **Simplicidad:** Código mínimo y fácil de mantener
2. **Estándar:** Compatible con markdown estándar
3. **IA-friendly:** Copiar/pegar directo desde ChatGPT/Claude
4. **Robusto:** Menos código = menos bugs
5. **Escalable:** Fácil de extender

---

## 📦 Stack Tecnológico

```
Markdown (*.md)
       ↓
preprocessMath() → Normaliza formato
       ↓
remark() → Parser de markdown
       ↓
remarkGfm → Tablas, listas, etc.
       ↓
remarkMath → Detecta $...$ y $$...$$
       ↓
remarkRehype → Markdown AST → HTML AST
       ↓
rehypeKatex → Renderiza LaTeX con KaTeX
       ↓
rehypeStringify → HTML AST → String
       ↓
HTML Final
```

---

## 🔧 Componentes Clave

### 1. `preprocessMath()` - Normalizador Simple

**Ubicación:**
- `/lib/tabs-generator.ts`
- `/components/NotesModal.tsx`

**Función:**
```typescript
function preprocessMath(markdown: string): string {
  // Convertir $$ecuación$$ en la misma línea a formato multilínea
  return markdown.replace(/\$\$([^$]+?)\$\$/g, (match, content) => {
    if (content.includes('\n')) {
      return match; // Ya está en formato correcto
    }
    return `$$\n${content.trim()}\n$$`; // Convertir a multilínea
  });
}
```

**¿Por qué?**
- `remark-math` requiere que `$$...$$` estén en líneas separadas para display math
- Esto permite copiar/pegar ecuaciones inline y convertirlas automáticamente
- Solución simple y robusta

### 2. `markdownToHtml()` - Procesador Principal

**Ubicación:** `/lib/tabs-generator.ts`

**Función:**
```typescript
async function markdownToHtml(markdown: string): Promise<string> {
  const processedMarkdown = preprocessMath(markdown);
  
  const result = await remark()
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeKatex, {
      strict: false,
      trust: true,
      throwOnError: false
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(processedMarkdown);
    
  return result.toString();
}
```

**Configuración de `rehypeKatex`:**
- `strict: false` → Permite comandos no estándar como `\mathrm`
- `trust: true` → Permite comandos avanzados
- `throwOnError: false` → No falla si hay errores de LaTeX

### 3. `NotesModal.tsx` - Renderizador del Modal

**Proceso:**
1. Recibe markdown del bloque ```markdown```
2. Aplica `preprocessMath()` al contenido
3. Usa el mismo pipeline de `remark` que `tabs-generator.ts`
4. Renderiza HTML con estilos de modo claro/oscuro

---

## 🎨 Sistema de Estilos

### Archivo: `/app/globals.css`

#### Ecuaciones de Bloque (`.katex-display`)

**Modo Claro:**
```css
.prose .katex-display {
  padding: 1.25rem;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 0.75rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  text-align: center;
}
```

**Modo Oscuro:**
```css
.dark-mode-modal .katex-display {
  background: linear-gradient(135deg, rgb(30 41 59) 0%, rgb(15 23 42) 100%);
  border: 2px solid rgb(71 85 105);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}
```

#### Ecuaciones Inline (`.katex`)

```css
.prose .katex {
  font-size: 1.15em;
}
```

---

## 📊 Flujo de Datos

### Tabs Principales

```
content/fisica/01-introduccion.md
       ↓
extractSections() → Parsea H2, H3
       ↓
markdownToHtml() → Procesa markdown
       ↓
TabsContainer → Renderiza tabs
       ↓
MarkdownContent → Muestra HTML
```

### Modal de Notas

```
content/fisica/01-introduccion.md
       ↓
Bloque ```markdown```
       ↓
NotesModal.tsx → preprocessMath()
       ↓
remark pipeline
       ↓
MarkdownContent → Muestra HTML con estilos
```

---

## 🔒 Garantías del Sistema

### ✅ Sintaxis Soportada:

1. **Ecuaciones de bloque:**
   ```markdown
   $$
   ecuación
   $$
   ```

2. **Ecuaciones inline:**
   ```markdown
   $ecuación$
   ```

3. **Comandos LaTeX:**
   - Funciones: `\arctan`, `\arcsin`, `\arccos`
   - Vectores: `\vec{}`, `\hat{}`
   - Fracciones: `\frac{}{}`, `\dfrac{}{}`
   - Raíces: `\sqrt{}`, `\sqrt[n]{}`
   - Paréntesis: `\left(`, `\right)`
   - Unidades: `\mathrm{}`
   - Texto: `\text{}`

### ✅ Características:

- ✨ Estilos visuales elegantes
- 🌓 Modo claro/oscuro
- 📱 Responsive
- 🎯 Centrado automático
- 🔄 Compatible con copiar/pegar de IA

---

## 🚫 Lo que NO Hacemos

### ❌ Transformaciones Complejas:

- No convertimos `\tan^{-1}` a `\arctan` automáticamente
- No procesamos `\(...\)` (sintaxis alternativa)
- No manejamos comandos de espaciado manual (`\!`, `\,`)

### ¿Por qué?

1. **Simplicidad:** Menos código = menos bugs
2. **Estándar:** Usar sintaxis estándar de `remark-math`
3. **Mantenibilidad:** Fácil de entender y modificar
4. **IA-friendly:** Las IAs ya generan sintaxis correcta

---

## 📝 Convenciones de Código

### Nombres de Funciones:

- `preprocessMath()` → Preprocesa markdown antes de remark
- `markdownToHtml()` → Convierte markdown a HTML
- `cleanMarkdownLinks()` → Limpia enlaces de markdown

### Estructura de Archivos:

```
/lib/tabs-generator.ts       → Lógica de procesamiento
/components/NotesModal.tsx   → UI del modal
/app/globals.css             → Estilos globales
/content/fisica/*.md         → Contenido markdown
```

---

## 🧪 Testing

### Casos de Prueba:

1. **Ecuación de bloque simple:**
   ```markdown
   $$
   E = mc^2
   $$
   ```

2. **Ecuación inline:**
   ```markdown
   La energía $E = mc^2$ es importante.
   ```

3. **Ecuaciones complejas:**
   ```markdown
   $$
   \theta = \arctan\left(\frac{R_y}{R_x}\right)
   $$
   ```

4. **Múltiples ecuaciones:**
   ```markdown
   $$
   x = 5
   $$

   $$
   y = 10
   $$
   ```

### Verificación Visual:

- ✅ Ecuaciones de bloque con borde y fondo
- ✅ Centrado automático
- ✅ Modo claro/oscuro funciona
- ✅ Responsive en móvil

---

## 🔄 Proceso de Actualización

### Si necesitas agregar soporte para nueva sintaxis:

1. **Evaluar:** ¿Es sintaxis estándar de `remark-math`?
2. **Decidir:** ¿Vale la pena la complejidad?
3. **Implementar:** Agregar en `preprocessMath()` si es necesario
4. **Documentar:** Actualizar guías
5. **Probar:** Verificar casos edge

### Principio: KISS (Keep It Simple, Stupid)

- Preferir sintaxis estándar
- Evitar transformaciones complejas
- Documentar bien las decisiones

---

## 📚 Referencias

- **remark-math:** https://github.com/remarkjs/remark-math
- **rehype-katex:** https://github.com/remarkjs/remark-math/tree/main/packages/rehype-katex
- **KaTeX:** https://katex.org/docs/supported.html
- **remark:** https://github.com/remarkjs/remark

---

## 🎓 Lecciones Aprendidas

### 1. Simplicidad > Complejidad

Intentamos implementar un sistema complejo de `normalizeMathSyntax` que:
- Protegía expresiones con placeholders
- Convertía múltiples sintaxis
- Manejaba casos edge complejos

**Resultado:** Bugs, mantenimiento difícil, código complejo.

**Solución:** Simplificar a `preprocessMath()` que solo normaliza el formato.

### 2. Usar Estándares

`remark-math` tiene una sintaxis estándar bien documentada. Usarla directamente es mejor que inventar la nuestra.

### 3. IA-Friendly

Las IAs modernas (ChatGPT, Claude) ya generan markdown con sintaxis correcta. No necesitamos transformaciones complejas.

### 4. Documentar para Usuarios

La mejor solución técnica es inútil si los usuarios no saben cómo usarla. Por eso creamos `GUIA-ECUACIONES-PROFESORES.md`.

---

**Última actualización:** Noviembre 2025  
**Versión:** 2.0 (Simplificada)  
**Estado:** ✅ Producción
