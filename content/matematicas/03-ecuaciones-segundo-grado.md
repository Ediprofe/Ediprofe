---
title: "Ecuaciones de Segundo Grado"
description: "Aprende a resolver ecuaciones cuadráticas usando la fórmula general y factorización"
author: "Prof. Edilberto Suárez"
duration: "50 min"
difficulty: "intermedio"
tags: ["matemáticas", "ecuaciones", "cuadráticas", "álgebra"]
---

## 📐 ¿Qué es una Ecuación de Segundo Grado?

### Video
video: https://youtu.be/dQw4w9WgXcQ

### Descripción

Una ecuación de segundo grado o **ecuación cuadrática** es una ecuación de la forma:

$$ax^2 + bx + c = 0$$

donde $a$, $b$ y $c$ son números reales y $a \neq 0$.

**Ejemplos:**
- $x^2 + 5x + 6 = 0$ (donde $a=1$, $b=5$, $c=6$)
- $2x^2 - 3x - 2 = 0$ (donde $a=2$, $b=-3$, $c=-2$)
- $x^2 - 4 = 0$ (donde $a=1$, $b=0$, $c=-4$)

### ✏️ Ejercicio 1: Identifica los Coeficientes

Para cada ecuación, identifica los valores de $a$, $b$ y $c$:

1. $3x^2 + 7x - 1 = 0$
   - $a = $ _______
   - $b = $ _______
   - $c = $ _______

2. $x^2 - 9 = 0$
   - $a = $ _______
   - $b = $ _______
   - $c = $ _______

3. $-2x^2 + x + 5 = 0$
   - $a = $ _______
   - $b = $ _______
   - $c = $ _______

## 🎯 Fórmula General

### 📖 Teoría

La **fórmula general** o **fórmula cuadrática** nos permite encontrar las soluciones de cualquier ecuación de segundo grado:

$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$

Esta fórmula siempre funciona, sin importar los valores de $a$, $b$ y $c$.

**Componentes importantes:**

1. **Discriminante**: $\Delta = b^2 - 4ac$
   - Si $\Delta > 0$: Dos soluciones reales distintas
   - Si $\Delta = 0$: Una solución real doble
   - Si $\Delta < 0$: No hay soluciones reales (soluciones complejas)

2. **Símbolo $\pm$**: Significa que hay dos soluciones:
   - $x_1 = \frac{-b + \sqrt{b^2 - 4ac}}{2a}$
   - $x_2 = \frac{-b - \sqrt{b^2 - 4ac}}{2a}$

### 💡 Ejemplo Resuelto Paso a Paso

Resolvamos: $x^2 + 5x + 6 = 0$

**Paso 1**: Identificar coeficientes
- $a = 1$
- $b = 5$ 
- $c = 6$

**Paso 2**: Calcular el discriminante
$$\Delta = b^2 - 4ac = (5)^2 - 4(1)(6) = 25 - 24 = 1$$

Como $\Delta > 0$, tenemos dos soluciones reales distintas.

**Paso 3**: Aplicar la fórmula general
$$x = \frac{-5 \pm \sqrt{1}}{2(1)} = \frac{-5 \pm 1}{2}$$

**Paso 4**: Calcular ambas soluciones
$$x_1 = \frac{-5 + 1}{2} = \frac{-4}{2} = -2$$
$$x_2 = \frac{-5 - 1}{2} = \frac{-6}{2} = -3$$

**Respuesta**: $x_1 = -2$ y $x_2 = -3$

### ✏️ Ejercicio 2: Practica la Fórmula General

Resuelve las siguientes ecuaciones usando la fórmula general:

**a)** $x^2 + 3x + 2 = 0$

**b)** $2x^2 - 5x + 2 = 0$

**c)** $x^2 - 6x + 9 = 0$

**d)** $x^2 + 2x + 5 = 0$

## 🔍 Factorización

### 📖 Método de Factorización

Cuando la ecuación se puede factorizar fácilmente, este método es más rápido que la fórmula general.

**Ejemplo**: $x^2 + 5x + 6 = 0$

Buscamos dos números que:
- Sumados den $b = 5$
- Multiplicados den $c = 6$

Los números son $2$ y $3$ porque:
- $2 + 3 = 5$ ✓
- $2 \times 3 = 6$ ✓

Entonces: $(x + 2)(x + 3) = 0$

Si un producto es cero, entonces al menos uno de los factores es cero:
- $x + 2 = 0 \Rightarrow x = -2$
- $x + 3 = 0 \Rightarrow x = -3$

### 💡 Casos Especiales

**1. Diferencia de cuadrados**: $a^2 - b^2 = (a+b)(a-b)$

Ejemplo: $x^2 - 9 = 0$
$$(x + 3)(x - 3) = 0$$
$$x_1 = 3, \quad x_2 = -3$$

**2. Trinomio cuadrado perfecto**: $(a \pm b)^2 = a^2 \pm 2ab + b^2$

Ejemplo: $x^2 + 6x + 9 = 0$
$$(x + 3)^2 = 0$$
$$x = -3 \text{ (solución doble)}$$

## 📊 Interpretación Gráfica

### 📖 La Parábola

Una ecuación de segundo grado $y = ax^2 + bx + c$ representa una **parábola**:

- Si $a > 0$: La parábola abre hacia arriba (∪)
- Si $a < 0$: La parábola abre hacia abajo (∩)

Las soluciones de $ax^2 + bx + c = 0$ son los puntos donde la parábola cruza el eje $x$.

**Vértice de la parábola**:
$$V = \left(-\frac{b}{2a}, f\left(-\frac{b}{2a}\right)\right)$$

**Eje de simetría**:
$$x = -\frac{b}{2a}$$

### ✏️ Ejercicio 3: Análisis Gráfico

Para la ecuación $x^2 - 4x + 3 = 0$:

1. ¿La parábola abre hacia arriba o hacia abajo?
2. Encuentra el vértice
3. Encuentra el eje de simetría
4. Resuelve la ecuación y verifica las soluciones

## 🎓 Resumen de la Unidad

### 📌 Conceptos Clave

1. **Ecuación cuadrática**: $ax^2 + bx + c = 0$ con $a \neq 0$

2. **Fórmula general**: $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$

3. **Discriminante**: $\Delta = b^2 - 4ac$ determina el número de soluciones

4. **Métodos de resolución**:
   - Fórmula general (siempre funciona)
   - Factorización (cuando es posible)
   - Completar el cuadrado
   - Inspección (casos simples)

### 🧮 Fórmulas Importantes

**Suma de raíces**: $x_1 + x_2 = -\frac{b}{a}$

**Producto de raíces**: $x_1 \cdot x_2 = \frac{c}{a}$

**Vértice**: $V_x = -\frac{b}{2a}$, $V_y = -\frac{\Delta}{4a}$

### ✅ Autoevaluación

1. ¿Cuándo usar la fórmula general vs factorización?
2. ¿Qué información nos da el discriminante?
3. ¿Cómo se relacionan las soluciones con la gráfica?
4. ¿Todas las ecuaciones cuadráticas tienen solución real?

---

**¡Excelente trabajo!** Ahora dominas las ecuaciones de segundo grado. 🎉
