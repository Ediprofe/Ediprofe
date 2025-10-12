# 📐 Guía para Escribir Ecuaciones Matemáticas

Esta guía explica cómo escribir ecuaciones matemáticas en tus archivos Markdown usando la sintaxis de LaTeX.

## ✨ Características

- ✅ Renderizado con **KaTeX** (rápido y preciso)
- ✅ Soporte para ecuaciones **inline** y en **bloque**
- ✅ Compatible con toda la sintaxis de **LaTeX**
- ✅ Responsive y optimizado para móviles
- ✅ Estilos personalizados y elegantes

## 📝 Sintaxis Básica

### Ecuaciones Inline (en línea)

Para ecuaciones dentro de un párrafo, usa **un símbolo de dólar** `$`:

```markdown
La famosa ecuación de Einstein es $E = mc^2$, donde $E$ es energía.
```

**Resultado**: La famosa ecuación de Einstein es $E = mc^2$, donde $E$ es energía.

### Ecuaciones en Bloque (Display)

Para ecuaciones centradas y destacadas, usa **dos símbolos de dólar** `$$`:

```markdown
$$
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$
```

**Resultado**:
$$
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$

## 🔤 Elementos Comunes

### Superíndices y Subíndices

```markdown
- Superíndice: $x^2$, $e^{-x}$, $x^{2y+1}$
- Subíndice: $x_1$, $a_{ij}$, $x_{n-1}$
- Ambos: $x_1^2$, $a_{ij}^{k}$
```

**Resultado**:
- Superíndice: $x^2$, $e^{-x}$, $x^{2y+1}$
- Subíndice: $x_1$, $a_{ij}$, $x_{n-1}$
- Ambos: $x_1^2$, $a_{ij}^{k}$

### Fracciones

```markdown
$$\frac{numerador}{denominador}$$

$$\frac{a}{b}$$, $$\frac{x+y}{2}$$, $$\frac{1}{\sqrt{2}}$$
```

### Raíces

```markdown
- Raíz cuadrada: $\sqrt{x}$
- Raíz n-ésima: $\sqrt[n]{x}$
- Ejemplos: $\sqrt{2}$, $\sqrt[3]{27}$, $\sqrt{x^2 + y^2}$
```

### Símbolos Griegos

```markdown
$\alpha$, $\beta$, $\gamma$, $\delta$, $\epsilon$, $\theta$, $\lambda$, $\mu$, 
$\pi$, $\sigma$, $\phi$, $\omega$, $\Delta$, $\Sigma$, $\Omega$
```

**Resultado**: $\alpha$, $\beta$, $\gamma$, $\delta$, $\epsilon$, $\theta$, $\lambda$, $\mu$, $\pi$, $\sigma$, $\phi$, $\omega$, $\Delta$, $\Sigma$, $\Omega$

### Operadores Matemáticos

```markdown
- Suma y resta: $+$, $-$
- Multiplicación: $\times$, $\cdot$
- División: $\div$, $/$
- Más/menos: $\pm$, $\mp$
- Aproximación: $\approx$
- Proporcional: $\propto$
- Infinito: $\infty$
```

### Relaciones y Comparaciones

```markdown
$=$, $\neq$, $<$, $>$, $\leq$, $\geq$, $\equiv$, $\cong$
```

## 📊 Ejemplos por Materia

### Álgebra

```markdown
**Ecuación cuadrática:**
$$ax^2 + bx + c = 0$$

**Sistema de ecuaciones:**
$$
\begin{cases}
2x + 3y = 7 \\
x - y = 1
\end{cases}
$$

**Producto notable:**
$$(a + b)^2 = a^2 + 2ab + b^2$$
```

### Cálculo

```markdown
**Derivada:**
$$\frac{d}{dx}f(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$$

**Integral:**
$$\int_a^b f(x)\,dx$$

**Límite:**
$$\lim_{x \to \infty} \frac{1}{x} = 0$$
```

### Física

```markdown
**Segunda Ley de Newton:**
$$F = ma$$

**Energía cinética:**
$$E_k = \frac{1}{2}mv^2$$

**Ley de Coulomb:**
$$F = k\frac{q_1 q_2}{r^2}$$

**Velocidad:**
$$v = \frac{\Delta x}{\Delta t}$$
```

### Química

```markdown
**Ecuación química:**
$$\text{H}_2 + \text{O}_2 \to \text{H}_2\text{O}$$

**Ley de gases ideales:**
$$PV = nRT$$

**pH:**
$$\text{pH} = -\log[\text{H}^+]$$

**Energía de activación:**
$$k = A e^{-E_a/RT}$$
```

### Estadística

```markdown
**Media:**
$$\bar{x} = \frac{1}{n}\sum_{i=1}^{n} x_i$$

**Desviación estándar:**
$$\sigma = \sqrt{\frac{1}{n}\sum_{i=1}^{n}(x_i - \bar{x})^2}$$

**Distribución normal:**
$$f(x) = \frac{1}{\sigma\sqrt{2\pi}}e^{-\frac{(x-\mu)^2}{2\sigma^2}}$$
```

## 🎨 Estilos Especiales

### Matrices

```markdown
$$
\begin{pmatrix}
a & b \\
c & d
\end{pmatrix}
$$

$$
\begin{bmatrix}
1 & 0 & 0 \\
0 & 1 & 0 \\
0 & 0 & 1
\end{bmatrix}
$$
```

### Vectores

```markdown
$$\vec{v} = \langle x, y, z \rangle$$

$$\vec{F} = m\vec{a}$$
```

### Texto en Ecuaciones

```markdown
$$x = \text{valor constante}$$

$$\text{Área} = \pi r^2$$
```

### Colores (opcional)

```markdown
$$\color{red}{x} + \color{blue}{y} = \color{green}{z}$$
```

## 💡 Consejos y Mejores Prácticas

### ✅ HACER

1. **Usar bloques para ecuaciones importantes:**
   ```markdown
   $$F = ma$$
   ```

2. **Inline para referencias en texto:**
   ```markdown
   La velocidad $v$ se calcula con $v = \frac{d}{t}$
   ```

3. **Espaciado con `\,` o `\;`:**
   ```markdown
   $$\int_0^1 f(x)\,dx$$
   ```

4. **Numerar ecuaciones importantes:**
   ```markdown
   $$F = ma \quad \text{(1)}$$
   ```

5. **Explicar variables:**
   ```markdown
   donde $m$ es la masa y $a$ es la aceleración
   ```

### ❌ EVITAR

1. ❌ No usar ecuaciones para texto simple
2. ❌ No abusar de colores
3. ❌ No hacer ecuaciones muy largas sin dividir
4. ❌ No olvidar cerrar los símbolos `$` o `$$`

## 🔧 Solución de Problemas

### La ecuación no se renderiza

**Problema**: Aparece el código LaTeX en lugar de la ecuación.

**Soluciones**:
1. Verifica que hayas cerrado los `$` o `$$`
2. Revisa la sintaxis de LaTeX
3. Evita espacios entre `$` y el contenido: `$ x $` ❌, `$x$` ✅

### Ecuación muy ancha en móvil

**Solución**: Las ecuaciones en bloque tienen scroll horizontal automático.

Para ecuaciones largas, considera dividirlas:
```markdown
$$
\begin{aligned}
x &= \text{primera parte} \\
  &+ \text{segunda parte}
\end{aligned}
$$
```

### Caracteres especiales

Para mostrar caracteres como `$`, `{`, `}` en texto normal, usa `\`:
```markdown
El símbolo \$ representa dólares
```

## 📚 Recursos Adicionales

### Documentación Oficial
- [KaTeX Documentation](https://katex.org/docs/supported.html)
- [LaTeX Math Symbols](https://www.caam.rice.edu/~heinken/latex/symbols.pdf)

### Editores Online
- [CodeCogs Equation Editor](https://www.codecogs.com/latex/eqneditor.php)
- [LaTeX Equation Editor](https://latexeditor.lagrida.com/)

### Listas de Símbolos
- Símbolos matemáticos completos
- Letras griegas
- Operadores especiales
- Flechas y relaciones

## 🎯 Ejemplo Completo

Aquí está un ejemplo completo de cómo estructurar contenido con ecuaciones:

```markdown
## Teorema de Pitágoras

### 📖 Teoría

En un triángulo rectángulo, el cuadrado de la hipotenusa ($c$) es igual a la suma 
de los cuadrados de los catetos ($a$ y $b$):

$$c^2 = a^2 + b^2$$

### 💡 Ejemplo

Si tenemos un triángulo con catetos $a = 3$ y $b = 4$:

$$
\begin{aligned}
c^2 &= 3^2 + 4^2 \\
c^2 &= 9 + 16 \\
c^2 &= 25 \\
c &= 5
\end{aligned}
$$

Por lo tanto, la hipotenusa mide $c = 5$ unidades.
```

---

**¡Felicidades!** Ahora puedes crear contenido matemático profesional en tu plataforma. 🎉

Si tienes preguntas o necesitas ayuda con alguna ecuación específica, consulta la documentación de KaTeX o LaTeX.
