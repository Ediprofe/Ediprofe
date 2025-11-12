# 📐 Guía de Ecuaciones para Profesores - Ediprofe

## 🎯 Sintaxis Simple y Estándar

Esta guía te muestra cómo escribir ecuaciones matemáticas en tus archivos markdown. **La sintaxis es estándar y compatible con cualquier IA** (ChatGPT, Claude, etc.).

---

## ✅ Ecuaciones en Bloque (Display Math)

Para ecuaciones que ocupan su propia línea con estilo visual elegante:

### Formato Correcto:

```markdown
$$
\theta = \arctan\left(\frac{R_y}{R_x}\right)
$$
```

**Reglas importantes:**
1. Los `$$` deben estar en **líneas separadas**
2. Dejar **línea en blanco** antes y después
3. La ecuación va en el medio

### ✅ Ejemplo Completo:

```markdown
La magnitud del vector resultante es:

$$
|\vec{R}| = \sqrt{R_x^2 + R_y^2}
$$

Y la dirección con respecto al eje $x$ se obtiene con:

$$
\theta = \arctan\left(\frac{R_y}{R_x}\right)
$$

Por lo tanto, el vector tiene una magnitud de $11.3\,\mathrm{u}$.
```

### 🎨 Resultado Visual:

Las ecuaciones de bloque se mostrarán con:
- ✨ Fondo con gradiente elegante
- 📦 Borde redondeado
- 🎯 Centrado automático
- 🌓 Adaptación a modo claro/oscuro

---

## ✅ Ecuaciones Inline (En Línea)

Para ecuaciones dentro del texto:

### Formato:

```markdown
El valor de $x$ es importante en la ecuación $E = mc^2$.
```

**Reglas:**
- Usar un solo `$` al inicio y al final
- Sin espacios después del primer `$` ni antes del último `$`

### ✅ Ejemplos:

```markdown
La velocidad es $v = 5\,\mathrm{m/s}$.
El ángulo $\theta = 45^\circ$ es importante.
La fuerza $F = ma$ determina la aceleración.
```

---

## 📝 Comandos LaTeX Recomendados

### Funciones Trigonométricas Inversas

✅ **Usar:**
```latex
\arctan    → arcotangente
\arcsin    → arcoseno
\arccos    → arcocoseno
```

❌ **Evitar:**
```latex
\tan^{-1}  → NO usar
\sin^{-1}  → NO usar
\cos^{-1}  → NO usar
```

### Vectores

```latex
\vec{v}           → Vector v con flecha
\hat{i}           → Vector unitario i
|\vec{v}|         → Magnitud del vector
```

### Fracciones

```latex
\frac{a}{b}       → Fracción simple
\dfrac{a}{b}      → Fracción grande (display)
```

### Raíces

```latex
\sqrt{x}          → Raíz cuadrada
\sqrt[3]{x}       → Raíz cúbica
```

### Paréntesis Adaptativos

```latex
\left( ... \right)     → Paréntesis que se ajustan
\left[ ... \right]     → Corchetes que se ajustan
\left\{ ... \right\}   → Llaves que se ajustan
```

### Unidades

```latex
\mathrm{kg}       → Kilogramos
\mathrm{m/s}      → Metros por segundo
\mathrm{N}        → Newtons
```

### Texto en Ecuaciones

```latex
\text{si } x > 0  → Texto normal en ecuaciones
```

---

## 🤖 Copiar y Pegar desde IA

Cuando uses ChatGPT, Claude u otra IA para generar contenido:

### ✅ Prompt Recomendado:

```
Genera contenido de física usando markdown con ecuaciones LaTeX.
Usa esta sintaxis:

- Ecuaciones de bloque: $$ en líneas separadas
- Ecuaciones inline: $ecuación$
- Funciones inversas: \arctan, \arcsin, \arccos
- Vectores: \vec{} y \hat{}
- Paréntesis: \left( \right)
- Unidades: \mathrm{}

Ejemplo:
$$
\theta = \arctan\left(\frac{R_y}{R_x}\right)
$$
```

### ✅ Lo que Funciona Directamente:

La mayoría de las IAs generan markdown compatible. Solo asegúrate de:
1. Los `$$` estén en líneas separadas
2. Usar `\arctan` en vez de `\tan^{-1}`
3. Dejar líneas en blanco antes/después de ecuaciones de bloque

---

## ❌ Errores Comunes y Soluciones

### Error 1: Ecuación en la misma línea

❌ **Incorrecto:**
```markdown
$$\theta = \arctan\left(\frac{R_y}{R_x}\right)$$
```

✅ **Correcto:**
```markdown
$$
\theta = \arctan\left(\frac{R_y}{R_x}\right)
$$
```

### Error 2: Sin líneas en blanco

❌ **Incorrecto:**
```markdown
La ecuación es:
$$
E = mc^2
$$
Donde $E$ es energía.
```

✅ **Correcto:**
```markdown
La ecuación es:

$$
E = mc^2
$$

Donde $E$ es energía.
```

### Error 3: Funciones inversas

❌ **Incorrecto:**
```latex
\tan^{-1}(x)
```

✅ **Correcto:**
```latex
\arctan(x)
```

---

## 📚 Ejemplos Completos

### Ejemplo 1: Cinemática

```markdown
## Movimiento Rectilíneo Uniforme

La posición de un objeto en MRU está dada por:

$$
x(t) = x_0 + vt
$$

Donde:
- $x_0$ es la posición inicial
- $v$ es la velocidad constante
- $t$ es el tiempo

Si $x_0 = 5\,\mathrm{m}$ y $v = 10\,\mathrm{m/s}$, entonces:

$$
x(t) = 5 + 10t
$$
```

### Ejemplo 2: Vectores

```markdown
## Suma de Vectores

Dados dos vectores $\vec{A}$ y $\vec{B}$:

$$
\vec{R} = \vec{A} + \vec{B}
$$

La magnitud del vector resultante es:

$$
|\vec{R}| = \sqrt{R_x^2 + R_y^2}
$$

Y su dirección:

$$
\theta = \arctan\left(\frac{R_y}{R_x}\right)
$$
```

### Ejemplo 3: Energía

```markdown
## Conservación de Energía

La energía total del sistema es:

$$
E_{\text{total}} = E_{\text{cinética}} + E_{\text{potencial}}
$$

Donde:

$$
E_{\text{cinética}} = \frac{1}{2}mv^2
$$

$$
E_{\text{potencial}} = mgh
$$

Por lo tanto:

$$
E_{\text{total}} = \frac{1}{2}mv^2 + mgh
$$
```

---

## 🔧 Solución de Problemas

### Si una ecuación no se muestra:

1. **Verificar sintaxis:**
   - ¿Los `$$` están en líneas separadas?
   - ¿Hay líneas en blanco antes/después?

2. **Verificar comandos:**
   - ¿Usas `\arctan` en vez de `\tan^{-1}`?
   - ¿Los paréntesis están balanceados?

3. **Verificar el bloque markdown:**
   - La ecuación debe estar dentro del bloque ```markdown```
   - Ver la sección "Suma y resta de vectores" como ejemplo

### Si el estilo no se aplica:

- Recargar la página (Cmd+R o Ctrl+R)
- Verificar que la ecuación esté en formato de bloque (no inline)
- Asegurarse de que los `$$` estén en líneas separadas

---

## 🎓 Resumen para Profesores

### ✅ Sintaxis Básica:

```markdown
Ecuación de bloque:

$$
ecuación aquí
$$

Ecuación inline: $ecuación$
```

### ✅ Comandos Esenciales:

- `\arctan`, `\arcsin`, `\arccos` → Funciones inversas
- `\vec{}`, `\hat{}` → Vectores
- `\frac{}{}` → Fracciones
- `\sqrt{}` → Raíces
- `\left( \right)` → Paréntesis adaptativos
- `\mathrm{}` → Unidades

### ✅ Reglas de Oro:

1. `$$` en líneas separadas para ecuaciones de bloque
2. Líneas en blanco antes y después
3. Usar `\arctan` en vez de `\tan^{-1}`
4. Compatible con copiar/pegar de IA

---

**¿Dudas?** Consulta los ejemplos en `/content/fisica/01-introduccion.md`

**Última actualización:** Noviembre 2025
