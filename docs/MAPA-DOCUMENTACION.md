# 🗺️ Mapa de Documentación - Ediprofe

## 📍 Empezar Aquí

```
┌─────────────────────────────────────────────────────────────┐
│  ¿Qué necesitas hacer?                                      │
└─────────────────────────────────────────────────────────────┘
                              │
                ┌─────────────┼─────────────┐
                │             │             │
                ▼             ▼             ▼
        ┌───────────┐  ┌───────────┐  ┌───────────┐
        │ Generar   │  │ Escribir  │  │ Entender  │
        │ Contenido │  │ Ecuaciones│  │ el Código │
        │ con IA    │  │ Manual    │  │           │
        └───────────┘  └───────────┘  └───────────┘
              │              │              │
              ▼              ▼              ▼
    ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
    │ PROMPT-IA-  │  │ GUIA-       │  │ ARQUITECTURA│
    │ GENERACION- │  │ ECUACIONES- │  │ -ECUACIONES │
    │ CONTENIDO   │  │ PROFESORES  │  │ .md         │
    └─────────────┘  └─────────────┘  └─────────────┘
```

---

## 🎯 Por Objetivo

### 🤖 Generar Contenido con IA

**Archivo:** `PROMPT-IA-GENERACION-CONTENIDO.md`

**Contenido:**
- ✅ Prompt completo listo para copiar
- ✅ Sintaxis exacta de ecuaciones
- ✅ Ejemplos completos
- ✅ Checklist de validación
- ✅ Errores comunes

**Uso:**
```
1. Abrir archivo
2. Copiar prompt
3. Pegar en ChatGPT/Claude/Gemini
4. Especificar tema
5. Validar resultado
```

---

### 📝 Escribir Contenido Manualmente

**Archivo:** `GUIA-ECUACIONES-PROFESORES.md`

**Contenido:**
- ✅ Sintaxis simple de ecuaciones
- ✅ Comandos LaTeX básicos
- ✅ Ejemplos paso a paso
- ✅ Errores comunes y soluciones
- ✅ Plantillas listas para usar

**Uso:**
```
1. Consultar sintaxis
2. Copiar plantilla
3. Escribir contenido
4. Verificar formato
5. Probar en navegador
```

---

### 🔧 Desarrollar/Mantener

**Archivos:**
- `ARQUITECTURA-ECUACIONES.md` - Cómo funciona
- `RESUMEN-SOLUCION-FINAL.md` - Qué se hizo
- `MATH_RENDERING_SOLUTION.md` - Detalles técnicos

**Uso:**
```
1. Leer ARQUITECTURA para entender
2. Ver RESUMEN para contexto
3. Consultar MATH_RENDERING para detalles
4. Modificar código
5. Actualizar documentación
```

---

## 👥 Por Audiencia

### Para IAs (ChatGPT/Claude/Gemini)

```
📄 PROMPT-IA-GENERACION-CONTENIDO.md
   │
   ├─ Prompt completo
   ├─ Sintaxis exacta
   ├─ Reglas críticas
   ├─ Ejemplos
   └─ Checklist
```

### Para Profesores/Creadores

```
📄 GUIA-ECUACIONES-PROFESORES.md
   │
   ├─ Sintaxis simple
   ├─ Comandos básicos
   ├─ Ejemplos prácticos
   ├─ Errores comunes
   └─ Plantillas

📄 LATEX_GUIDELINES.md
   │
   ├─ Comandos completos
   ├─ Mejores prácticas
   └─ Referencia rápida
```

### Para Desarrolladores

```
📄 ARQUITECTURA-ECUACIONES.md
   │
   ├─ Stack tecnológico
   ├─ Flujo de datos
   ├─ Decisiones de diseño
   └─ Lecciones aprendidas

📄 RESUMEN-SOLUCION-FINAL.md
   │
   ├─ Qué se hizo
   ├─ Por qué
   ├─ Comparación antes/después
   └─ Solución de problemas

📄 MATH_RENDERING_SOLUTION.md
   │
   ├─ Implementación detallada
   ├─ Casos de prueba
   └─ Garantías del sistema
```

---

## 📚 Estructura Completa

```
/docs/
│
├── 📍 ÍNDICES
│   ├── README-DOCUMENTACION.md      ← ÍNDICE PRINCIPAL
│   ├── MAPA-DOCUMENTACION.md        ← Este archivo
│   └── RESUMEN-PARA-USUARIO.md      ← Resumen ejecutivo
│
├── 🤖 PARA IA
│   └── PROMPT-IA-GENERACION-CONTENIDO.md
│
├── 👨‍🏫 PARA PROFESORES
│   ├── GUIA-ECUACIONES-PROFESORES.md
│   └── LATEX_GUIDELINES.md
│
├── 👨‍💻 PARA DESARROLLADORES
│   ├── ARQUITECTURA-ECUACIONES.md
│   ├── RESUMEN-SOLUCION-FINAL.md
│   └── MATH_RENDERING_SOLUTION.md
│
└── 📜 HISTÓRICO
    └── SISTEMA-ECUACIONES.md
```

---

## 🔄 Flujos de Trabajo

### Flujo 1: Generar Contenido con IA

```
Inicio
  │
  ▼
Abrir: PROMPT-IA-GENERACION-CONTENIDO.md
  │
  ▼
Copiar prompt completo
  │
  ▼
Pegar en IA (ChatGPT/Claude/Gemini)
  │
  ▼
Especificar tema deseado
  │
  ▼
IA genera contenido
  │
  ▼
Validar con checklist
  │
  ├─ ✅ Correcto → Usar contenido
  │
  └─ ❌ Errores → Consultar GUIA-ECUACIONES-PROFESORES.md
                  y corregir manualmente
```

### Flujo 2: Escribir Contenido Manualmente

```
Inicio
  │
  ▼
Abrir: GUIA-ECUACIONES-PROFESORES.md
  │
  ▼
Consultar sintaxis y ejemplos
  │
  ▼
Escribir contenido en .md
  │
  ▼
Verificar formato
  │
  ├─ Ecuaciones: $$ en líneas separadas
  ├─ Comandos: \arctan (NO \tan^{-1})
  └─ Estructura: H2 y H3 correctos
  │
  ▼
Probar en navegador
  │
  ├─ ✅ Se ve bien → Listo
  │
  └─ ❌ Problemas → Consultar sección
                    "Solución de Problemas"
```

### Flujo 3: Entender/Modificar Sistema

```
Inicio
  │
  ▼
Leer: RESUMEN-SOLUCION-FINAL.md
  │
  ▼
Entender contexto y decisiones
  │
  ▼
Leer: ARQUITECTURA-ECUACIONES.md
  │
  ▼
Entender implementación
  │
  ▼
Explorar código:
  ├─ lib/tabs-generator.ts
  └─ components/NotesModal.tsx
  │
  ▼
¿Necesitas modificar?
  │
  ├─ Sí → Modificar código
  │        │
  │        ▼
  │        Actualizar documentación
  │        │
  │        ▼
  │        Probar cambios
  │
  └─ No → Listo
```

---

## 🚨 Solución Rápida de Problemas

```
┌─────────────────────────────────────────┐
│ ¿Qué problema tienes?                   │
└─────────────────────────────────────────┘
                │
    ┌───────────┼───────────┐
    │           │           │
    ▼           ▼           ▼
┌────────┐  ┌────────┐  ┌────────┐
│Ecuación│  │ Error  │  │ IA no  │
│sin     │  │ de     │  │genera  │
│estilos │  │módulo  │  │bien    │
└────────┘  └────────┘  └────────┘
    │           │           │
    ▼           ▼           ▼
Verificar   rm -rf     Usar
$$ en       .next      PROMPT-IA-
líneas      npm run    GENERACION-
separadas   dev        CONTENIDO.md
```

**Detalles en:** `RESUMEN-SOLUCION-FINAL.md` sección "Solución de Problemas"

---

## 📖 Lectura Recomendada por Nivel

### Nivel 1: Usuario Básico (Solo usar)
1. `QUICK-START.md` (raíz)
2. `PROMPT-IA-GENERACION-CONTENIDO.md`
3. `GUIA-ECUACIONES-PROFESORES.md`

### Nivel 2: Usuario Avanzado (Crear contenido)
1. Todo de Nivel 1
2. `LATEX_GUIDELINES.md`
3. `RESUMEN-PARA-USUARIO.md`

### Nivel 3: Desarrollador (Mantener/Modificar)
1. Todo de Nivel 2
2. `ARQUITECTURA-ECUACIONES.md`
3. `RESUMEN-SOLUCION-FINAL.md`
4. `MATH_RENDERING_SOLUTION.md`

---

## 🎯 Atajos Rápidos

| Necesito... | Archivo | Sección |
|-------------|---------|---------|
| Generar contenido con IA | PROMPT-IA-GENERACION-CONTENIDO.md | Prompt completo |
| Escribir ecuación | GUIA-ECUACIONES-PROFESORES.md | Sintaxis básica |
| Ver ejemplo completo | PROMPT-IA-GENERACION-CONTENIDO.md | Ejemplo completo |
| Solucionar error | RESUMEN-SOLUCION-FINAL.md | Solución de problemas |
| Entender el código | ARQUITECTURA-ECUACIONES.md | Stack tecnológico |
| Ver qué cambió | RESUMEN-SOLUCION-FINAL.md | Comparación antes/después |
| Comandos LaTeX | LATEX_GUIDELINES.md | Comandos completos |

---

## 🔍 Búsqueda Rápida

### ¿Cómo escribo...?

- **Ecuación de bloque:** `GUIA-ECUACIONES-PROFESORES.md` → "Ecuaciones en Bloque"
- **Ecuación inline:** `GUIA-ECUACIONES-PROFESORES.md` → "Ecuaciones Inline"
- **Vector:** `LATEX_GUIDELINES.md` → "Vectores"
- **Fracción:** `LATEX_GUIDELINES.md` → "Fracciones"
- **Función inversa:** `GUIA-ECUACIONES-PROFESORES.md` → "Funciones Trigonométricas Inversas"

### ¿Por qué...?

- **Usar \arctan:** `ARQUITECTURA-ECUACIONES.md` → "Decisiones de Diseño"
- **$$ en líneas separadas:** `ARQUITECTURA-ECUACIONES.md` → "Causa raíz"
- **Simplicidad:** `RESUMEN-SOLUCION-FINAL.md` → "Lecciones Aprendidas"

### ¿Cómo funciona...?

- **preprocessMath:** `ARQUITECTURA-ECUACIONES.md` → "Componentes Clave"
- **remark-math:** `ARQUITECTURA-ECUACIONES.md` → "Stack Tecnológico"
- **Estilos CSS:** `ARQUITECTURA-ECUACIONES.md` → "Sistema de Estilos"

---

## ✅ Estado de Documentos

| Documento | Estado | Audiencia | Prioridad |
|-----------|--------|-----------|-----------|
| README-DOCUMENTACION.md | ✅ Actual | Todos | 🔴 Alta |
| PROMPT-IA-GENERACION-CONTENIDO.md | ✅ Actual | IA | 🔴 Alta |
| GUIA-ECUACIONES-PROFESORES.md | ✅ Actual | Profesores | 🔴 Alta |
| ARQUITECTURA-ECUACIONES.md | ✅ Actual | Desarrolladores | 🟡 Media |
| RESUMEN-SOLUCION-FINAL.md | ✅ Actual | Todos | 🟡 Media |
| LATEX_GUIDELINES.md | ✅ Actual | Profesores/Dev | 🟢 Baja |
| MATH_RENDERING_SOLUTION.md | ✅ Actual | Desarrolladores | 🟢 Baja |
| RESUMEN-PARA-USUARIO.md | ✅ Actual | Usuario | 🟡 Media |
| MAPA-DOCUMENTACION.md | ✅ Actual | Todos | 🟢 Baja |
| SISTEMA-ECUACIONES.md | ⚠️ Histórico | Referencia | ⚪ Info |

---

**Última actualización:** Noviembre 2025  
**Versión:** 1.0  
**Mantenedor:** Equipo Ediprofe
