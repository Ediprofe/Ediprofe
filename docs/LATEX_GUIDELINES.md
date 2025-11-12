# Guía de LaTeX para Ediprofe

Esta guía documenta las mejores prácticas para escribir expresiones matemáticas en LaTeX dentro de los archivos markdown del proyecto.

## ✅ Comandos recomendados (bien soportados por KaTeX)

### Funciones trigonométricas inversas
- **Usar:** `\arctan`, `\arcsin`, `\arccos`
- **Evitar:** `\tan^{-1}`, `\sin^{-1}`, `\cos^{-1}`

```latex
✅ Correcto: \theta = \arctan\left(\frac{y}{x}\right)
❌ Evitar:  \theta = \tan^{-1}\left(\frac{y}{x}\right)
```

### Comandos de espaciado
- **Evitar comandos de espaciado manual:** `\!`, `\,`, `\:`, `\;`
- KaTeX maneja el espaciado automáticamente
- Si es necesario espaciado, usar `\quad` o `\qquad` (mejor soportados)

```latex
✅ Correcto: \tan^2(x) + 1
❌ Evitar:  \tan^2\!(x) + 1
```

### Paréntesis y delimitadores
- **Usar:** `\left(` y `\right)` para paréntesis que se ajustan al tamaño
- **Usar:** `\left[` y `\right]` para corchetes
- **Usar:** `\left\{` y `\right\}` para llaves

```latex
✅ Correcto: \left(\frac{a}{b}\right)
✅ Correcto: \left[\frac{a}{b}\right]
✅ Correcto: \left\{\frac{a}{b}\right\}
```

## 📝 Sintaxis de ecuaciones

### Ecuaciones en línea
Usar un solo `$` para expresiones inline:
```markdown
El valor de $x$ es importante.
La fórmula $E = mc^2$ es famosa.
```

### Ecuaciones en bloque
Usar doble `$$` en líneas separadas:
```markdown
La ecuación de Pitágoras:

$$
a^2 + b^2 = c^2
$$
```

**Importante:** Siempre dejar líneas en blanco antes y después de `$$`

## 🎯 Comandos comunes bien soportados

### Vectores
```latex
\vec{v}          → Vector v
\hat{i}          → Vector unitario i
|\vec{v}|        → Magnitud del vector
```

### Fracciones
```latex
\frac{a}{b}      → Fracción simple
\dfrac{a}{b}     → Fracción display (más grande)
```

### Raíces
```latex
\sqrt{x}         → Raíz cuadrada
\sqrt[n]{x}      → Raíz n-ésima
```

### Símbolos griegos
```latex
\alpha, \beta, \gamma, \delta, \epsilon
\theta, \lambda, \mu, \pi, \sigma, \omega
```

### Operadores
```latex
\sum_{i=1}^{n}   → Sumatoria
\int_{a}^{b}     → Integral
\lim_{x \to 0}   → Límite
```

### Texto en ecuaciones
```latex
\text{texto}     → Texto normal en ecuaciones
\mathrm{kg}      → Unidades (texto romano)
```

## ⚠️ Comandos a evitar

### Espaciado manual
- `\!` (espacio negativo)
- `\,` (espacio pequeño)
- `\:` (espacio medio)
- `\;` (espacio grande)

### Notaciones alternativas problemáticas
- `\tan^{-1}` → Usar `\arctan`
- `\sin^{-1}` → Usar `\arcsin`
- `\cos^{-1}` → Usar `\arccos`

## 🔧 Solución de problemas

### Si una expresión no se renderiza:

1. **Verificar sintaxis básica:**
   - ¿Están los `$` o `$$` correctamente colocados?
   - ¿Hay líneas en blanco antes/después de `$$`?

2. **Simplificar la expresión:**
   - Remover comandos de espaciado (`\!`, `\,`, etc.)
   - Usar comandos estándar (`\arctan` en vez de `\tan^{-1}`)

3. **Verificar paréntesis:**
   - Usar `\left(` y `\right)` en pares
   - Verificar que todos los delimitadores estén cerrados

4. **Probar en modo inline:**
   - Si `$$...$$` no funciona, probar con `$...$`
   - Puede ayudar a identificar el comando problemático

## 📚 Ejemplos completos

### Ejemplo 1: Ecuación de movimiento
```markdown
La posición de un objeto en movimiento rectilíneo uniforme es:

$$
x(t) = x_0 + v_0 t + \frac{1}{2}at^2
$$

donde $x_0$ es la posición inicial, $v_0$ la velocidad inicial y $a$ la aceleración.
```

### Ejemplo 2: Vectores
```markdown
El vector resultante $\vec{R}$ se calcula como:

$$
\vec{R} = \vec{A} + \vec{B}
$$

Su magnitud es:

$$
|\vec{R}| = \sqrt{R_x^2 + R_y^2}
$$

Y su dirección:

$$
\theta = \arctan\left(\frac{R_y}{R_x}\right)
$$
```

### Ejemplo 3: Unidades
```markdown
La densidad del agua es $\rho = 1000\,\mathrm{kg/m^3}$.

La velocidad de la luz es:

$$
c = 3 \times 10^8\,\mathrm{m/s}
$$
```

## 🚀 Versión de KaTeX

Este proyecto usa **rehype-katex 7.0.1** con las siguientes configuraciones:
- `strict: false` - Permite comandos no estándar
- `trust: true` - Permite comandos avanzados
- `throwOnError: false` - No falla en errores

Para ver la lista completa de comandos soportados, consulta:
https://katex.org/docs/supported.html

## 📝 Notas adicionales

- **Modo claro/oscuro:** Las ecuaciones se adaptan automáticamente al tema
- **Responsive:** Las ecuaciones se ajustan al tamaño de pantalla
- **Accesibilidad:** KaTeX genera HTML accesible para lectores de pantalla

---

**Última actualización:** Noviembre 2025
