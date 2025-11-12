# 🤖 Instrucciones para IA - Generación de Bloques Markdown con LaTeX

FORMATO DE ECUACIONES LATEX:

1. ECUACIONES DE BLOQUE (display math):
   - Usar $$ en LÍNEAS SEPARADAS
   - SIEMPRE dejar línea en blanco ANTES y DESPUÉS
   
   Formato correcto:
   
   Texto antes de la ecuación.
   
   $$
   ecuación aquí
   $$
   
   Texto después de la ecuación.

2. ECUACIONES INLINE (en línea con el texto):
   - Usar $ecuación$ sin espacios internos
   - Ejemplo: El valor de $x$ es importante.

SINTAXIS LATEX ESPECÍFICA:

Funciones trigonométricas inversas:
- Usar: \tan^{-1}, \sin^{-1}, \cos^{-1} (con \! para mejor espaciado)
- Ejemplo: $\tan^{-1}\!\left(\frac{y}{x}\right)$
- El comando \! crea un espacio negativo que mejora la apariencia

Paréntesis adaptativos:
- SIEMPRE usar \left( y \right) para paréntesis que contienen fracciones
- Ejemplo: $\left(\frac{a}{b}\right)$

Unidades:
- SIEMPRE usar \mathrm{} para unidades
- Usar \, para separar número de unidad
- Ejemplo: $5\,\mathrm{m/s}$

Vectores:
- Usar \vec{} para vectores con flecha
- Ejemplo: $\vec{v}$, $\vec{F}$
- Usar \hat{} para vectores unitarios
- Ejemplo: $\hat{i}$, $\hat{j}$

Fracciones:
- Usar \frac{numerador}{denominador}
- Para fracciones en display: \dfrac{}{} (opcional)

Espaciado:
- Usar \, para espacio pequeño (entre número y unidad)
- Usar \! para espacio negativo (después de ^{-1} en funciones inversas)
- Ejemplo número-unidad: $5\,\mathrm{m/s}$
- Ejemplo función inversa: $\tan^{-1}\!\left(\frac{y}{x}\right)$

Números decimales:
- Usar punto decimal: 3.14 (NO coma)
- Para separar miles: usar espacios: 1 500 000

REGLAS CRÍTICAS:

1. $$ SIEMPRE en líneas separadas
2. Línea en blanco ANTES de $$
3. Línea en blanco DESPUÉS de $$
4. Usar \left( \right) para paréntesis grandes
5. Usar \mathrm{} para TODAS las unidades
6. Usar \, entre número y unidad
7. Punto decimal (NO coma)
8. Funciones inversas: \tan^{-1}\! (con \!)

EJEMPLO COMPLETO:

```markdown
## Cinemática

### Movimiento Rectilíneo Uniforme

El **movimiento rectilíneo uniforme (MRU)** es aquel en el que la velocidad es constante.

#### Ecuación de posición

La posición en función del tiempo está dada por:

$$
x(t) = x_0 + vt
$$

Donde:
- $x(t)$ es la posición en el tiempo $t$ (en $\mathrm{m}$)
- $x_0$ es la posición inicial (en $\mathrm{m}$)
- $v$ es la velocidad constante (en $\mathrm{m/s}$)
- $t$ es el tiempo (en $\mathrm{s}$)

#### Ejemplo numérico

Si un auto parte de $x_0 = 5\,\mathrm{m}$ con velocidad $v = 10\,\mathrm{m/s}$:

$$
x(t) = 5 + 10t
$$

A los $t = 3\,\mathrm{s}$, la posición será:

$$
x(3) = 5 + 10(3) = 35\,\mathrm{m}
$$

---

### Vectores

Un **vector** tiene magnitud y dirección.

#### Componentes

Un vector $\vec{v}$ en el plano se expresa como:

$$
\vec{v} = v_x\,\hat{i} + v_y\,\hat{j}
$$

#### Magnitud

La magnitud del vector es:

$$
|\vec{v}| = \sqrt{v_x^2 + v_y^2}
$$

#### Dirección

El ángulo $\theta$ con respecto al eje $x$ es:

$$
\theta = \tan^{-1}\!\left(\frac{v_y}{v_x}\right)
$$

**Nota:** El comando \! crea un espacio negativo para mejor apariencia.
```

GENERA AHORA EL CONTENIDO PARA: [ESPECIFICAR TEMA]
```

---

## ✅ CHECKLIST DE VALIDACIÓN

Antes de usar el contenido generado, verifica:

### Estructura
- [ ] Todo el contenido está dentro de \`\`\`markdown\`\`\`
- [ ] Hay H2 (##) para secciones principales
- [ ] Hay H3 (###) para subsecciones/pestañas
- [ ] Hay H4 (####) para subtítulos si es necesario

### Ecuaciones de Bloque
- [ ] Los $$ están en líneas separadas
- [ ] Hay línea en blanco ANTES de $$
- [ ] Hay línea en blanco DESPUÉS de $$
- [ ] No hay espacios extra dentro de $$

### Ecuaciones Inline
- [ ] Usan $ecuación$ (un solo $)
- [ ] No hay espacios después del primer $
- [ ] No hay espacios antes del último $

### Sintaxis LaTeX
- [ ] Funciones inversas: \tan^{-1}\! (con \!)
- [ ] Paréntesis grandes: \left( \right)
- [ ] Unidades: \mathrm{m}, \mathrm{kg}, etc.
- [ ] Separación número-unidad: \,
- [ ] Vectores: \vec{v}, \hat{i}
- [ ] Punto decimal (NO coma)

---

## 📐 REFERENCIA RÁPIDA DE COMANDOS LATEX

### Funciones Trigonométricas

```latex
\sin(x), \cos(x), \tan(x)           → Funciones básicas
\sin^{-1}\!(x), \cos^{-1}\!(x)      → Funciones inversas
\tan^{-1}\!\left(\frac{y}{x}\right) → Arcotangente con fracción
```

### Operadores Matemáticos

```latex
\frac{a}{b}              → Fracción
\dfrac{a}{b}             → Fracción grande (display)
\sqrt{x}                 → Raíz cuadrada
\sqrt[n]{x}              → Raíz n-ésima
x^2                      → Potencia
x_i                      → Subíndice
```

### Vectores

```latex
\vec{v}                  → Vector con flecha
\hat{i}, \hat{j}         → Vectores unitarios
|\vec{v}|                → Magnitud
\vec{v} \cdot \vec{w}    → Producto punto
\vec{v} \times \vec{w}   → Producto cruz
```

### Paréntesis y Delimitadores

```latex
\left( \right)           → Paréntesis adaptativos
\left[ \right]           → Corchetes adaptativos
\left\{ \right\}         → Llaves adaptativas
\left| \right|           → Valor absoluto
```

### Unidades (SIEMPRE con \mathrm)

```latex
\mathrm{m}               → metros
\mathrm{kg}              → kilogramos
\mathrm{s}               → segundos
\mathrm{m/s}             → metros por segundo
\mathrm{m/s^2}           → metros por segundo cuadrado
\mathrm{N}               → newtons
\mathrm{J}               → joules
\mathrm{W}               → watts
```

### Espaciado

```latex
\,                       → Espacio pequeño (número-unidad)
\!                       → Espacio negativo (después de ^{-1})
\quad                    → Espacio medio
\qquad                   → Espacio grande
```

### Símbolos Griegos

```latex
\alpha, \beta, \gamma, \delta, \epsilon
\theta, \lambda, \mu, \pi, \sigma, \omega
\Omega, \Delta, \Sigma, \Phi
```

### Relaciones y Operadores

```latex
=, \neq, \approx, \equiv
<, >, \leq, \geq
\pm, \mp
\times, \cdot, \div
\rightarrow, \Rightarrow
```

### Texto en Ecuaciones

```latex
\text{texto normal}      → Texto en ecuaciones
\mathrm{texto}           → Texto en romano (para unidades)
```

---

## ❌ ERRORES COMUNES A EVITAR

### Error 1: $$ en la misma línea

❌ **INCORRECTO:**
```markdown
$$\theta = \tan^{-1}\!\left(\frac{y}{x}\right)$$
```

✅ **CORRECTO:**
```markdown
$$
\theta = \tan^{-1}\!\left(\frac{y}{x}\right)
$$
```

### Error 2: Sin líneas en blanco

❌ **INCORRECTO:**
```markdown
La ecuación es:
$$
E = mc^2
$$
Donde $E$ es energía.
```

✅ **CORRECTO:**
```markdown
La ecuación es:

$$
E = mc^2
$$

Donde $E$ es energía.
```

### Error 3: Paréntesis sin \left \right

❌ **INCORRECTO:**
```latex
$$(\frac{a}{b})^2$$
```

✅ **CORRECTO:**
```latex
$$
\left(\frac{a}{b}\right)^2
$$
```

### Error 4: Unidades sin \mathrm

❌ **INCORRECTO:**
```latex
$v = 5 m/s$
```

✅ **CORRECTO:**
```latex
$v = 5\,\mathrm{m/s}$
```

### Error 5: Coma decimal

❌ **INCORRECTO:**
```latex
$3,14$
```

✅ **CORRECTO:**
```latex
$3.14$
```

### Error 6: Olvidar \! después de ^{-1}

❌ **INCORRECTO:**
```latex
$\tan^{-1}\left(\frac{y}{x}\right)$
```

✅ **CORRECTO:**
```latex
$\tan^{-1}\!\left(\frac{y}{x}\right)$
```

---

## 📝 PLANTILLA COMPLETA

```markdown
## [Título de Sección]

### [Título de Subsección]

[Introducción al tema con texto explicativo]

#### [Subtítulo conceptual]

[Explicación del concepto]

[Si hay ecuación importante:]

$$
ecuación
$$

[Explicación de la ecuación]

Donde:
- $variable_1$ es [descripción] (en $\mathrm{unidad}$)
- $variable_2$ es [descripción] (en $\mathrm{unidad}$)

#### Ejemplo numérico

[Planteamiento del problema]

Datos:
- $variable_1 = valor\,\mathrm{unidad}$
- $variable_2 = valor\,\mathrm{unidad}$

Solución:

$$
paso_1
$$

$$
paso_2
$$

Por lo tanto, el resultado es $resultado\,\mathrm{unidad}$.

---

### [Siguiente Subsección]

[Contenido de la siguiente subsección...]
```

---

## 🎯 EJEMPLOS POR TIPO DE CONTENIDO

### Ejemplo 1: Definición con Ecuación

```markdown
### Velocidad

La **velocidad** es la razón de cambio de la posición con respecto al tiempo.

$$
v = \frac{\Delta x}{\Delta t}
$$

Donde:
- $v$ es la velocidad (en $\mathrm{m/s}$)
- $\Delta x$ es el desplazamiento (en $\mathrm{m}$)
- $\Delta t$ es el intervalo de tiempo (en $\mathrm{s}$)
```

### Ejemplo 2: Fórmula con Vectores

```markdown
### Fuerza Resultante

La **fuerza resultante** es la suma vectorial de todas las fuerzas:

$$
\vec{F}_R = \vec{F}_1 + \vec{F}_2 + \cdots + \vec{F}_n
$$

Su magnitud se calcula como:

$$
|\vec{F}_R| = \sqrt{F_x^2 + F_y^2}
$$

Y su dirección:

$$
\theta = \tan^{-1}\!\left(\frac{F_y}{F_x}\right)
$$
```

### Ejemplo 3: Problema Resuelto

```markdown
### Ejemplo: Caída Libre

Un objeto se deja caer desde una altura de $h = 20\,\mathrm{m}$. ¿Con qué velocidad llega al suelo?

**Datos:**
- $h = 20\,\mathrm{m}$
- $v_0 = 0\,\mathrm{m/s}$ (parte del reposo)
- $g = 10\,\mathrm{m/s^2}$

**Solución:**

Usamos la ecuación:

$$
v^2 = v_0^2 + 2gh
$$

Sustituyendo:

$$
v^2 = 0 + 2(10)(20) = 400
$$

$$
v = \sqrt{400} = 20\,\mathrm{m/s}
$$

Por lo tanto, el objeto llega al suelo con una velocidad de $20\,\mathrm{m/s}$.
```

---

## 🚀 PROMPT MÍNIMO (Versión Corta)

```
Genera contenido educativo en markdown con ecuaciones LaTeX.

REGLAS:
- Contenido dentro de ```markdown```
- $$ en líneas separadas con líneas en blanco antes/después
- Funciones inversas: \tan^{-1}\! (con \!)
- Paréntesis: \left( \right)
- Unidades: \mathrm{m}, \mathrm{kg}, etc.
- Separación: número\,\mathrm{unidad}
- Punto decimal (NO coma)
- Vectores: \vec{v}, \hat{i}

EJEMPLO:
$$
\theta = \tan^{-1}\!\left(\frac{v_y}{v_x}\right)
$$

TEMA: [especificar]
```

---

## 📊 TABLA DE REFERENCIA RÁPIDA

| Elemento | Sintaxis | Ejemplo |
|----------|----------|---------|
| Ecuación de bloque | `$$` en líneas separadas | Ver arriba |
| Ecuación inline | `$...$` | `$E = mc^2$` |
| Función inversa | `\tan^{-1}\!` | `$\tan^{-1}\!(x)$` |
| Paréntesis grande | `\left( \right)` | `$\left(\frac{a}{b}\right)$` |
| Unidad | `\mathrm{}` | `$5\,\mathrm{m/s}$` |
| Vector | `\vec{}` | `$\vec{F}$` |
| Vector unitario | `\hat{}` | `$\hat{i}$` |
| Fracción | `\frac{}{}` | `$\frac{a}{b}$` |
| Raíz | `\sqrt{}` | `$\sqrt{x}$` |
| Potencia | `^` | `$x^2$` |
| Subíndice | `_` | `$x_0$` |

---

**Última actualización:** Noviembre 2025  
**Versión:** 1.0  
**Estado:** ✅ PRODUCCIÓN
