# 🤖 Prompt para IA - Generación de Contenido Ediprofe

## 📋 Instrucciones para ChatGPT/Claude/Gemini

Usa este prompt cuando necesites generar contenido educativo para Ediprofe:

---

## 🎯 PROMPT COMPLETO

```
Genera contenido educativo de [MATERIA] sobre [TEMA] en formato markdown.

ESTRUCTURA REQUERIDA:

1. El contenido debe ir dentro de bloques ```markdown```
2. Cada sección debe tener un H2 (##) como título
3. Cada subsección debe tener un H3 (###) como título de pestaña
4. Incluir ecuaciones LaTeX cuando sea necesario

SINTAXIS DE ECUACIONES:

Ecuaciones de bloque (display):
$$
ecuación aquí
$$

Ecuaciones inline: $ecuación$

COMANDOS LATEX OBLIGATORIOS:
- Funciones inversas: \arctan, \arcsin, \arccos (NUNCA \tan^{-1})
- Vectores: \vec{v}, \hat{i}, \hat{j}
- Fracciones: \frac{numerador}{denominador}
- Raíces: \sqrt{expresión}
- Paréntesis adaptativos: \left( \right), \left[ \right], \left\{ \right\}
- Unidades: \mathrm{kg}, \mathrm{m/s}, \mathrm{N}
- Texto en ecuaciones: \text{texto aquí}

REGLAS CRÍTICAS:
1. Los $$ SIEMPRE en líneas separadas
2. Línea en blanco ANTES y DESPUÉS de cada ecuación de bloque
3. NUNCA usar \tan^{-1}, usar \arctan
4. NUNCA usar comandos de espaciado manual (\!, \,, \:, \;)
5. Usar \left( y \right) para paréntesis que contienen fracciones

EJEMPLO DE FORMATO CORRECTO:

```markdown
## Cinemática

### Movimiento Rectilíneo Uniforme

El **movimiento rectilíneo uniforme (MRU)** es aquel en el que un objeto se desplaza en línea recta con velocidad constante.

#### Ecuación de posición

La posición de un objeto en MRU está dada por:

$$
x(t) = x_0 + vt
$$

Donde:
- $x(t)$ es la posición en el tiempo $t$
- $x_0$ es la posición inicial
- $v$ es la velocidad constante (en $\mathrm{m/s}$)
- $t$ es el tiempo (en $\mathrm{s}$)

#### Ejemplo

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

Un **vector** es una magnitud que tiene módulo, dirección y sentido.

#### Componentes de un vector

Un vector $\vec{v}$ en el plano se puede expresar como:

$$
\vec{v} = v_x\,\hat{i} + v_y\,\hat{j}
$$

#### Magnitud de un vector

La magnitud del vector $\vec{v}$ es:

$$
|\vec{v}| = \sqrt{v_x^2 + v_y^2}
$$

#### Dirección de un vector

El ángulo $\theta$ que forma con el eje $x$ es:

$$
\theta = \arctan\left(\frac{v_y}{v_x}\right)
$$

**Nota:** Usar \arctan, NO \tan^{-1}
```
```

GENERA AHORA EL CONTENIDO PARA: [ESPECIFICAR TEMA]
```

---

## ✅ Checklist de Validación

Antes de usar el contenido generado, verifica:

- [ ] Todo el contenido está dentro de ```markdown```
- [ ] Hay H2 (##) para secciones principales
- [ ] Hay H3 (###) para pestañas/subsecciones
- [ ] Las ecuaciones de bloque tienen $$ en líneas separadas
- [ ] Hay líneas en blanco antes/después de ecuaciones de bloque
- [ ] Se usa \arctan en vez de \tan^{-1}
- [ ] Se usa \arcsin en vez de \sin^{-1}
- [ ] Se usa \arccos en vez de \cos^{-1}
- [ ] Las unidades usan \mathrm{}
- [ ] Los vectores usan \vec{} o \hat{}
- [ ] Los paréntesis grandes usan \left( \right)

---

## ❌ Errores Comunes a Evitar

### Error 1: $$ en la misma línea
```markdown
❌ INCORRECTO:
$$\theta = \arctan\left(\frac{y}{x}\right)$$

✅ CORRECTO:
$$
\theta = \arctan\left(\frac{y}{x}\right)
$$
```

### Error 2: Sin líneas en blanco
```markdown
❌ INCORRECTO:
La ecuación es:
$$
E = mc^2
$$
Donde $E$ es energía.

✅ CORRECTO:
La ecuación es:

$$
E = mc^2
$$

Donde $E$ es energía.
```

### Error 3: Funciones inversas incorrectas
```markdown
❌ INCORRECTO:
$$\theta = \tan^{-1}(x)$$

✅ CORRECTO:
$$
\theta = \arctan(x)
$$
```

### Error 4: Paréntesis sin \left \right
```markdown
❌ INCORRECTO:
$$(\frac{a}{b})^2$$

✅ CORRECTO:
$$
\left(\frac{a}{b}\right)^2
$$
```

### Error 5: Unidades sin \mathrm
```markdown
❌ INCORRECTO:
$v = 5 m/s$

✅ CORRECTO:
$v = 5\,\mathrm{m/s}$
```

---

## 📝 Plantilla de Sección Completa

```markdown
## [Título de Sección]

### [Título de Pestaña 1]

[Introducción al tema]

#### [Subtítulo conceptual]

[Explicación del concepto]

[Si hay ecuación de bloque:]

$$
ecuación
$$

[Explicación de la ecuación]

Donde:
- $variable_1$ es [descripción]
- $variable_2$ es [descripción]

#### Ejemplo

[Planteamiento del ejemplo]

[Si hay cálculos:]

$$
paso_1
$$

$$
paso_2
$$

[Resultado final]

---

### [Título de Pestaña 2]

[Contenido de la siguiente pestaña...]
```

---

## 🎨 Elementos de Formato Permitidos

### Texto
- **Negrita:** `**texto**`
- *Cursiva:* `*texto*`
- ***Negrita y cursiva:*** `***texto***`

### Listas
```markdown
- Item 1
- Item 2
  - Subitem 2.1
  - Subitem 2.2

1. Primer paso
2. Segundo paso
3. Tercer paso
```

### Blockquotes
```markdown
> 📘 **Nota importante:**
> Este es un concepto clave que debes recordar.
```

### Tablas
```markdown
| Magnitud | Símbolo | Unidad |
|----------|---------|--------|
| Velocidad | $v$ | $\mathrm{m/s}$ |
| Aceleración | $a$ | $\mathrm{m/s^2}$ |
```

### Código (solo para pseudocódigo o algoritmos)
```markdown
```python
# Solo si es necesario mostrar código
def calcular_velocidad(distancia, tiempo):
    return distancia / tiempo
```
```

---

## 🔧 Comandos LaTeX Completos

### Operadores Matemáticos
```latex
\frac{a}{b}          → Fracción
\dfrac{a}{b}         → Fracción grande
\sqrt{x}             → Raíz cuadrada
\sqrt[n]{x}          → Raíz n-ésima
x^2                  → Potencia
x_i                  → Subíndice
```

### Funciones Trigonométricas
```latex
\sin(x)              → Seno
\cos(x)              → Coseno
\tan(x)              → Tangente
\arcsin(x)           → Arcoseno
\arccos(x)           → Arcocoseno
\arctan(x)           → Arcotangente
```

### Símbolos Griegos
```latex
\alpha, \beta, \gamma, \delta, \epsilon
\theta, \lambda, \mu, \pi, \sigma, \omega
\Omega, \Delta, \Sigma, \Phi
```

### Vectores y Matrices
```latex
\vec{v}              → Vector con flecha
\hat{i}              → Vector unitario
|\vec{v}|            → Magnitud
\vec{v} \cdot \vec{w} → Producto punto
\vec{v} \times \vec{w} → Producto cruz
```

### Operadores
```latex
\sum_{i=1}^{n}       → Sumatoria
\int_{a}^{b}         → Integral
\lim_{x \to 0}       → Límite
\frac{d}{dx}         → Derivada
\partial             → Derivada parcial
```

### Relaciones
```latex
=, \neq, \approx, \equiv
<, >, \leq, \geq
\in, \notin, \subset, \subseteq
\rightarrow, \Rightarrow, \leftrightarrow
```

### Paréntesis y Delimitadores
```latex
\left( \right)       → Paréntesis adaptativos
\left[ \right]       → Corchetes adaptativos
\left\{ \right\}     → Llaves adaptativas
\left| \right|       → Valor absoluto
```

### Texto y Espaciado
```latex
\text{texto}         → Texto normal
\mathrm{unidad}      → Unidades (texto romano)
\,                   → Espacio pequeño (solo entre número y unidad)
\quad                → Espacio medio
\qquad               → Espacio grande
```

---

## 📊 Ejemplo Completo de Contenido

```markdown
## Dinámica

### Leyes de Newton

La **dinámica** estudia las causas del movimiento de los cuerpos.

#### Primera Ley de Newton (Ley de Inercia)

Un cuerpo permanece en reposo o en movimiento rectilíneo uniforme si no actúa ninguna fuerza neta sobre él.

$$
\sum \vec{F} = 0 \quad \Rightarrow \quad \vec{v} = \text{constante}
$$

#### Segunda Ley de Newton

La aceleración de un cuerpo es directamente proporcional a la fuerza neta aplicada e inversamente proporcional a su masa.

$$
\vec{F} = m\vec{a}
$$

Donde:
- $\vec{F}$ es la fuerza neta (en $\mathrm{N}$)
- $m$ es la masa (en $\mathrm{kg}$)
- $\vec{a}$ es la aceleración (en $\mathrm{m/s^2}$)

#### Tercera Ley de Newton (Acción y Reacción)

Si un cuerpo A ejerce una fuerza sobre un cuerpo B, entonces B ejerce una fuerza igual y opuesta sobre A.

$$
\vec{F}_{AB} = -\vec{F}_{BA}
$$

---

### Aplicación: Plano Inclinado

Un bloque de masa $m$ se encuentra sobre un plano inclinado con ángulo $\theta$.

#### Fuerzas actuantes

Las fuerzas que actúan sobre el bloque son:
- Peso: $\vec{W} = m\vec{g}$
- Normal: $\vec{N}$
- Fricción: $\vec{f}$

#### Componentes del peso

El peso se descompone en:

$$
W_x = mg\sin(\theta)
$$

$$
W_y = mg\cos(\theta)
$$

#### Condición de equilibrio

Para que el bloque esté en equilibrio:

$$
N = mg\cos(\theta)
$$

$$
f = mg\sin(\theta)
$$

#### Ejemplo numérico

Si $m = 10\,\mathrm{kg}$, $\theta = 30^\circ$ y $g = 10\,\mathrm{m/s^2}$:

$$
W_x = 10 \times 10 \times \sin(30^\circ) = 50\,\mathrm{N}
$$

$$
W_y = 10 \times 10 \times \cos(30^\circ) = 86.6\,\mathrm{N}
$$

Por lo tanto, la fuerza normal es $N = 86.6\,\mathrm{N}$ y la fuerza de fricción debe ser $f = 50\,\mathrm{N}$ para mantener el equilibrio.
```

---

## 🎯 Resumen de Reglas Críticas

1. **Estructura:** H2 para secciones, H3 para pestañas
2. **Ecuaciones de bloque:** `$$` en líneas separadas con líneas en blanco
3. **Ecuaciones inline:** `$ecuación$` sin espacios internos
4. **Funciones inversas:** `\arctan`, `\arcsin`, `\arccos` (NUNCA `\tan^{-1}`)
5. **Paréntesis grandes:** `\left( \right)` para fracciones
6. **Unidades:** `\mathrm{unidad}` siempre
7. **Vectores:** `\vec{v}` para vectores, `\hat{i}` para unitarios
8. **Espaciado:** Solo `\,` entre número y unidad

---

## 🚀 Uso Rápido

**Prompt mínimo para generar contenido:**

```
Genera contenido de [MATERIA] sobre [TEMA] siguiendo estas reglas:
- Formato: markdown dentro de ```markdown```
- Estructura: H2 para secciones, H3 para pestañas
- Ecuaciones de bloque: $$ en líneas separadas con líneas en blanco
- Funciones inversas: \arctan (NO \tan^{-1})
- Paréntesis: \left( \right) para fracciones
- Unidades: \mathrm{}
- Vectores: \vec{} y \hat{}
```

---

**Última actualización:** Noviembre 2025  
**Versión:** 1.0  
**Estado:** ✅ PRODUCCIÓN
