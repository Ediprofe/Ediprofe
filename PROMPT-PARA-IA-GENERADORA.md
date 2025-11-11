# 🤖 Instrucciones para IA: Generación de Markdown con LaTeX

## ⚠️ REGLAS CRÍTICAS - SEGUIR SIEMPRE

### 1. Sintaxis matemática

**✅ USAR:**
- `$expresión$` para matemáticas inline (en línea con el texto)
- `$$expresión$$` en líneas separadas para matemáticas display (bloque)

**❌ NUNCA USAR:**
- `\(expresión\)` - Esta sintaxis NO funciona
- `$$expresión$$` inline (en la misma línea de texto)
- Paréntesis normales `(expresión)` con LaTeX dentro

---

## 📝 Plantillas de uso

### Matemáticas inline (en el texto)

```markdown
La velocidad es $v = \frac{d}{t}$ donde $d$ es distancia y $t$ es tiempo.

La masa del Sol es $1.989 \times 10^{30}\,\mathrm{kg}$.

El área de un círculo es $A = \pi r^2$ donde $r$ es el radio.
```

### Matemáticas display (ecuación destacada)

```markdown
La fórmula de la densidad es:

$$
d = \frac{m}{V}
$$

Donde $d$ es densidad, $m$ es masa y $V$ es volumen.
```

**IMPORTANTE:** Siempre dejar línea en blanco antes y después de `$$`.

---

## 📊 Tablas con ecuaciones

```markdown
| Magnitud | Fórmula | Unidad |
|----------|---------|--------|
| Velocidad | $$v = \frac{d}{t}$$ | m/s |
| Densidad | $$\frac{m}{V}$$ | kg/m³ |
| Aceleración | $$a = \frac{\Delta v}{\Delta t}$$ | m/s² |
```

**NOTA:** En tablas, usar `$$` para ecuaciones complejas y `$` para símbolos simples.

---

## 🔤 Comandos LaTeX esenciales

### Fracciones
```markdown
$\frac{numerador}{denominador}$     (inline)
$$\dfrac{numerador}{denominador}$$  (display, más grande)
```

### Unidades y texto
```markdown
$5\,\mathrm{m}$          (número con unidad)
$\text{Velocidad}$       (texto normal)
$\mathrm{H_2O}$          (fórmula química)
```

### Superíndices y subíndices
```markdown
$x^2$                    (cuadrado)
$x^{10}$                 (potencia de dos dígitos)
$H_2O$                   (subíndice)
$\mathrm{m}^3$           (metro cúbico)
```

### Operadores
```markdown
$a \times b$             (multiplicación ×)
$a \cdot b$              (producto punto ·)
$a \pm b$                (más/menos ±)
$\frac{a}{b}$            (división como fracción)
```

### Espaciado
```markdown
$5\,\mathrm{kg}$         (espacio pequeño \,)
$5\ \mathrm{kg}$         (espacio normal \ )
```

---

## 📋 Ejemplos de uso correcto

### Ejemplo 1: Párrafo con ecuaciones

```markdown
En física, la segunda ley de Newton establece que la fuerza $F$ es igual al producto de la masa $m$ por la aceleración $a$:

$$
F = m \cdot a
$$

Si un objeto de $10\,\mathrm{kg}$ tiene una aceleración de $2\,\mathrm{m/s}^2$, la fuerza aplicada es $F = 20\,\mathrm{N}$.
```

### Ejemplo 2: Lista con ecuaciones

```markdown
**Magnitudes básicas:**

- Longitud: $l$ → se mide en metros ($\mathrm{m}$)
- Masa: $m$ → se mide en kilogramos ($\mathrm{kg}$)
- Tiempo: $t$ → se mide en segundos ($\mathrm{s}$)
```

### Ejemplo 3: Tabla completa

```markdown
| Magnitud derivada | Expresión | Unidad SI | Ejemplo |
|-------------------|-----------|-----------|---------|
| Velocidad | $$v = \frac{d}{t}$$ | m/s | Un auto a $60\,\mathrm{km/h}$ |
| Densidad | $$\rho = \frac{m}{V}$$ | kg/m³ | Agua: $1000\,\mathrm{kg/m}^3$ |
| Fuerza | $$F = m \times a$$ | N | Peso de $10\,\mathrm{kg}$: $98\,\mathrm{N}$ |
```

---

## ❌ Errores comunes a evitar

### Error 1: Usar `\(...\)`
```markdown
❌ INCORRECTO:
La velocidad es \( v = \frac{d}{t} \).

✅ CORRECTO:
La velocidad es $v = \frac{d}{t}$.
```

### Error 2: `$$` inline
```markdown
❌ INCORRECTO:
La densidad es $$d = \frac{m}{V}$$ en kg/m³.

✅ CORRECTO:
La densidad es $d = \frac{m}{V}$ en kg/m³.
```

### Error 3: Paréntesis con LaTeX
```markdown
❌ INCORRECTO:
( 5\,\text{m} ) → mide longitud

✅ CORRECTO:
$5\,\text{m}$ → mide longitud
```

### Error 4: Olvidar `\,` en unidades
```markdown
❌ INCORRECTO:
$5\text{m}$

✅ CORRECTO:
$5\,\mathrm{m}$
```

### Error 5: No usar `\mathrm` para unidades
```markdown
❌ INCORRECTO:
$5\,kg$

✅ CORRECTO:
$5\,\mathrm{kg}$
```

### Error 6: Notación compleja en tablas con paréntesis
```markdown
❌ PROBLEMÁTICO (puede causar conflictos de parsing):
| Ejemplo | Medición de $9.8\,\mathrm{m\,s^{-2}}$ (valor: $9.81\,\mathrm{m\,s^{-2}}$) |

✅ CORRECTO (notación más simple y robusta):
| Ejemplo | Medición de $9.8\,\mathrm{m/s^2}$ (valor: $9.81\,\mathrm{m/s^2}$) |
```

**Importante:** Cuando uses unidades con exponentes negativos dentro de paréntesis en tablas, prefiere la notación con `/` (ej: `m/s^2`) en lugar de espacios con exponentes negativos (ej: `m\,s^{-2}`). Ambas son correctas matemáticamente, pero la primera es más robusta para el parser.

---

## 🎯 Checklist de validación

Antes de entregar el markdown, verifica:

- [ ] ✅ Todas las ecuaciones inline usan `$...$`
- [ ] ✅ Todas las ecuaciones display usan `$$...$$` en líneas separadas
- [ ] ✅ NO hay ningún `\(...\)` en el documento
- [ ] ✅ Las unidades usan `\mathrm{...}`
- [ ] ✅ Hay `\,` entre números y unidades
- [ ] ✅ Las tablas con ecuaciones usan `$$...$$`
- [ ] ✅ Los superíndices/subíndices usan `^` y `_`
- [ ] ✅ En tablas con paréntesis, usar notación simple como `m/s^2` en lugar de `m\,s^{-2}`

---

## 📚 Referencia de archivos correctos

**Ver ejemplos en:**
- `/content/quimica/01-la-materia.md`
- `/content/quimica/06-reacciones-quimicas.md`
- `/content/quimica/09-soluciones.md`

Estos archivos usan el formato correcto y se renderizan perfectamente.

---

## 🔧 Plantilla base para secciones

```markdown
### Título de la sección

Texto introductorio con ecuación inline $x = 5$ en el párrafo.

**Fórmula principal:**

$$
y = mx + b
$$

Donde:
- $y$ es la variable dependiente
- $m$ es la pendiente
- $x$ es la variable independiente
- $b$ es el intercepto

**Ejemplo:**

Si $m = 2$ y $b = 3$, entonces para $x = 5$:

$$
y = 2(5) + 3 = 13
$$
```

---

## 💡 Resumen ejecutivo

**USAR SIEMPRE:**
1. `$...$` para inline
2. `$$...$$` en líneas separadas para display
3. `\mathrm{...}` para unidades
4. `\,` para espaciar números y unidades

**NUNCA USAR:**
1. `\(...\)` - NO funciona
2. `$$...$$` inline
3. Paréntesis normales con LaTeX

**MODELO A SEGUIR:**
Los archivos en `/content/quimica/` son el estándar de calidad.
