# 📐 Instrucciones para escribir expresiones matemáticas en Markdown

## ✅ FORMATO CORRECTO (usar siempre)

### Para expresiones matemáticas en línea (inline)

**Usar `$` simple** (un solo signo de dólar al inicio y al final):

```markdown
La velocidad es $v = \frac{d}{t}$ donde $d$ es distancia.
```

**Resultado:** La velocidad es $v = \frac{d}{t}$ donde $d$ es distancia.

---

### Para expresiones matemáticas en bloque (display)

**Usar `$$` doble** (dos signos de dólar) **en líneas separadas**:

```markdown
La fórmula de la densidad es:

$$
d = \frac{m}{V}
$$

Donde $d$ es densidad, $m$ es masa y $V$ es volumen.
```

**Resultado:**

La fórmula de la densidad es:

$$
d = \frac{m}{V}
$$

Donde $d$ es densidad, $m$ es masa y $V$ es volumen.

---

## 📊 Expresiones matemáticas en tablas

### ✅ CORRECTO - Usar `$$` en líneas separadas

```markdown
| Magnitud | Fórmula | Unidad |
|----------|---------|--------|
| Velocidad | $$v = \frac{d}{t}$$ | m/s |
| Densidad | $$d = \frac{m}{V}$$ | kg/m³ |
```

### ✅ TAMBIÉN CORRECTO - Usar `$` inline si la expresión es corta

```markdown
| Magnitud | Símbolo | Unidad |
|----------|---------|--------|
| Longitud | $l$ | m |
| Masa | $m$ | kg |
| Tiempo | $t$ | s |
```

---

## 🔤 Comandos LaTeX comunes

### Fracciones
```markdown
$$\frac{numerador}{denominador}$$
```

### Fracciones grandes (display)
```markdown
$$\dfrac{numerador}{denominador}$$
```

### Texto en ecuaciones
```markdown
$$\text{Densidad} = \frac{m}{V}$$
```

### Texto romano (para unidades)
```markdown
$$5\,\mathrm{kg}$$
```

### Espaciado
```markdown
$$5\,\mathrm{m}$$    (espacio pequeño)
$$5\ \mathrm{m}$$    (espacio normal)
```

### Superíndices y subíndices
```markdown
$$x^2$$              (superíndice)
$$H_2O$$             (subíndice)
$$x^{2y}$$           (superíndice múltiple)
$$\mathrm{m}^3$$     (metro cúbico)
```

### Multiplicación
```markdown
$$a \times b$$       (símbolo ×)
$$a \cdot b$$        (punto ·)
```

---

## ❌ FORMATO INCORRECTO (NO usar)

### ❌ NO usar `\( ... \)` (sintaxis LaTeX pura)

```markdown
❌ INCORRECTO:
La velocidad es \( v = \frac{d}{t} \) donde \( d \) es distancia.

✅ CORRECTO:
La velocidad es $v = \frac{d}{t}$ donde $d$ es distancia.
```

### ❌ NO usar `$$` inline (en la misma línea de texto)

```markdown
❌ INCORRECTO:
La densidad es $$d = \frac{m}{V}$$ en kg/m³.

✅ CORRECTO (opción 1 - inline):
La densidad es $d = \frac{m}{V}$ en kg/m³.

✅ CORRECTO (opción 2 - display):
La densidad es:

$$
d = \frac{m}{V}
$$

en kg/m³.
```

### ❌ NO usar paréntesis normales con LaTeX

```markdown
❌ INCORRECTO:
( 5\,\text{m} )

✅ CORRECTO:
$5\,\text{m}$
```

### ⚠️ CUIDADO con expresiones complejas en tablas

Cuando uses expresiones matemáticas dentro de paréntesis en tablas, asegúrate de que la sintaxis sea clara:

```markdown
❌ PROBLEMÁTICO (puede causar conflictos):
| Ejemplo | Una medición de $9.8\,\mathrm{m\,s^{-2}}$ (valor: $9.81\,\mathrm{m\,s^{-2}}$) |

✅ MEJOR (más simple y robusto):
| Ejemplo | Una medición de $9.8\,\mathrm{m/s^2}$ (valor: $9.81\,\mathrm{m/s^2}$) |
```

**Razón:** La notación `\,s^{-2}` con espacios puede causar problemas de parsing en algunos contextos. La notación `m/s^2` es más robusta y igualmente correcta.

---

## 📋 Ejemplos completos

### Ejemplo 1: Texto con ecuaciones inline

```markdown
En física, la velocidad $v$ se calcula como $v = \frac{d}{t}$, donde $d$ es la distancia recorrida y $t$ es el tiempo transcurrido. Si un objeto recorre $100\,\mathrm{m}$ en $10\,\mathrm{s}$, su velocidad es $v = 10\,\mathrm{m/s}$.
```

### Ejemplo 2: Ecuación en bloque

```markdown
La segunda ley de Newton establece que:

$$
F = m \cdot a
$$

Donde:
- $F$ es la fuerza (en newtons)
- $m$ es la masa (en kilogramos)
- $a$ es la aceleración (en m/s²)
```

### Ejemplo 3: Tabla con ecuaciones

```markdown
| Magnitud derivada | Expresión | Unidad SI | Ejemplo |
|-------------------|-----------|-----------|---------|
| Velocidad | $$v = \frac{d}{t}$$ | m/s | $60\,\mathrm{km/h} = 16.7\,\mathrm{m/s}$ |
| Densidad | $$d = \frac{m}{V}$$ | kg/m³ | Agua: $1000\,\mathrm{kg/m}^3$ |
| Fuerza | $$F = m \times a$$ | newton (N) | Peso, empuje |
```

### Ejemplo 4: Lista con ecuaciones

```markdown
**Ejemplos de magnitudes:**

- Longitud: $5\,\mathrm{m}$ → mide longitud
- Masa: $3\,\mathrm{kg}$ → mide masa
- Tiempo: $12\,\mathrm{s}$ → mide tiempo
```

---

## 🎯 Reglas de oro

1. **Para inline (en línea):** Usar `$...$` (un solo signo de dólar)
2. **Para display (bloque):** Usar `$$...$$` en líneas separadas
3. **En tablas:** Preferir `$$...$$` para ecuaciones complejas
4. **Nunca usar:** `\(...\)` (sintaxis LaTeX pura)
5. **Espaciado:** Usar `\,` para separar números de unidades
6. **Unidades:** Usar `\mathrm{...}` para texto romano
7. **Texto:** Usar `\text{...}` para texto normal en ecuaciones

---

## 🔍 Verificación rápida

Antes de generar el markdown, verifica:

- [ ] ¿Usé `$` para inline y `$$` para display?
- [ ] ¿Las ecuaciones `$$` están en líneas separadas?
- [ ] ¿Usé `\mathrm{}` para unidades?
- [ ] ¿Usé `\,` para espaciar números y unidades?
- [ ] ¿NO usé `\(...\)` en ningún lugar?

---

## 📚 Referencia rápida de comandos

| Comando | Resultado | Uso |
|---------|-----------|-----|
| `$x$` | $x$ | Variable inline |
| `$$x = 5$$` | (bloque) | Ecuación display |
| `$\frac{a}{b}$` | $\frac{a}{b}$ | Fracción |
| `$\dfrac{a}{b}$` | (más grande) | Fracción display |
| `$x^2$` | $x^2$ | Superíndice |
| `$x_1$` | $x_1$ | Subíndice |
| `$\text{texto}$` | texto | Texto normal |
| `$\mathrm{kg}$` | kg | Texto romano (unidades) |
| `$5\,\mathrm{m}$` | 5 m | Número con unidad |
| `$a \times b$` | $a \times b$ | Multiplicación |
| `$a \cdot b$` | $a \cdot b$ | Producto punto |

---

## 💡 Consejo final

**Cuando tengas dudas, mira los archivos en `/content/quimica/` como referencia.** Esos archivos usan el formato correcto y se renderizan perfectamente.
