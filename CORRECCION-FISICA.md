# 🔧 Corrección: Física - De incorrecto a correcto

## 📋 Tabla de magnitudes derivadas

### ❌ INCORRECTO (actual en física)

```markdown
| Magnitud derivada | Expresión | Unidad SI | Ejemplo |
|-------------------|-----------|-----------|---------|
| Velocidad | \( \dfrac{l}{t} \) | m/s | \( 60\,\text{km/h} = 16.7\,\text{m/s} \) |
| Densidad | \( \dfrac{m}{V} \) | kg/m³ | Agua: \( 1000\,\text{kg/m}^3 \) |
| Fuerza | \( m \times a \) | newton (N) | Peso, empuje |
```

### ✅ CORRECTO (como debe ser)

```markdown
| Magnitud derivada | Expresión | Unidad SI | Ejemplo |
|-------------------|-----------|-----------|---------|
| Velocidad | $$v = \frac{l}{t}$$ | m/s | $60\,\mathrm{km/h} = 16.7\,\mathrm{m/s}$ |
| Densidad | $$\rho = \frac{m}{V}$$ | kg/m³ | Agua: $1000\,\mathrm{kg/m}^3$ |
| Fuerza | $$F = m \times a$$ | newton (N) | Peso, empuje |
```

---

## 📝 Lista de ejemplos

### ❌ INCORRECTO (actual en física)

```markdown
**Ejemplos:**
- \( 5\,\text{m} \) → mide longitud
- \( 3\,\text{kg} \) → mide masa
- \( 12\,\text{s} \) → mide tiempo
```

### ✅ CORRECTO (como debe ser)

```markdown
**Ejemplos:**
- $5\,\mathrm{m}$ → mide longitud
- $3\,\mathrm{kg}$ → mide masa
- $12\,\mathrm{s}$ → mide tiempo
```

---

## 📐 Ecuación en bloque

### ❌ INCORRECTO (actual en física)

```markdown
\( 2{,}00\,\text{m} \)
```

### ✅ CORRECTO (como debe ser)

```markdown
$2{,}00\,\mathrm{m}$
```

O si quieres destacarla:

```markdown
$$
2{,}00\,\mathrm{m}
$$
```

---

## 🔢 Notación científica

### ❌ INCORRECTO (actual en física)

```markdown
La masa del Sol → \( 1.989\times10^{30}\,\mathrm{kg} \)
```

### ✅ CORRECTO (como debe ser)

```markdown
La masa del Sol → $1.989 \times 10^{30}\,\mathrm{kg}$
```

---

## 📊 Tabla de ejemplos mixtos

### ❌ INCORRECTO (actual en física)

```markdown
| Número decimal | Notación científica | Explicación |
|----------------|---------------------|-------------|
| 45000 | \( 4.5 \times 10^4 \) | 4 lugares a la izquierda |
| 0.00076 | \( 7.6 \times 10^{-4} \) | 4 lugares a la derecha |
```

### ✅ CORRECTO (como debe ser)

```markdown
| Número decimal | Notación científica | Explicación |
|----------------|---------------------|-------------|
| 45000 | $$4.5 \times 10^4$$ | 4 lugares a la izquierda |
| 0.00076 | $$7.6 \times 10^{-4}$$ | 4 lugares a la derecha |
```

---

## 📏 Fórmula destacada

### ❌ INCORRECTO (actual en física)

```markdown
## Definición

\( N = a \times 10^n \)

donde:
- \( a \) → número decimal tal que \( 1 \leq a < 10 \)
- \( n \) → exponente entero
```

### ✅ CORRECTO (como debe ser)

```markdown
## Definición

$$
N = a \times 10^n
$$

donde:
- $a$ → número decimal tal que $1 \leq a < 10$
- $n$ → exponente entero
```

---

## 🎯 Patrón de conversión rápida

### Buscar y reemplazar

1. **Inline math:**
   - Buscar: `\( ... \)`
   - Reemplazar: `$ ... $`

2. **Texto en unidades:**
   - Buscar: `\text{`
   - Reemplazar: `\mathrm{` (para unidades)
   - O mantener `\text{` (para texto descriptivo)

3. **En tablas:**
   - Si la expresión es compleja, usar `$$...$$`
   - Si es un símbolo simple, usar `$...$`

---

## 📚 Ejemplos completos corregidos

### Ejemplo 1: Sección de magnitudes básicas

```markdown
### 🔹 Magnitudes básicas

No dependen de otras; son las fundamentales del **Sistema Internacional de Unidades (SI)**.

| Magnitud | Símbolo | Unidad | Símbolo de unidad |
|----------|---------|--------|-------------------|
| Longitud | $l$ | metro | m |
| Masa | $m$ | kilogramo | kg |
| Tiempo | $t$ | segundo | s |
| Temperatura | $T$ | kelvin | K |
| Corriente eléctrica | $I$ | amperio | A |
| Cantidad de sustancia | $n$ | mol | mol |
| Intensidad luminosa | $I_v$ | candela | cd |
```

### Ejemplo 2: Sección de notación científica

```markdown
### 🔼 Si el número es grande

El exponente $n$ es **positivo**, porque movemos el punto decimal **hacia la izquierda**.

**Ejemplo:**

$$
1500000 = 1.5 \times 10^6
$$

> Se movió el punto 6 lugares a la izquierda.
```

### Ejemplo 3: Precisión y exactitud

```markdown
## 🎯 Exactitud

La **exactitud** indica **qué tan cerca** está una medición del **valor verdadero o aceptado**.

**Ejemplo:**

Si la longitud real de una mesa es de $2{,}00\,\mathrm{m}$ y obtienes $1{,}99\,\mathrm{m}$, la medición es **exacta**, porque se aproxima mucho al valor verdadero.
```

---

## 💡 Consejo final

**Para corregir todo el archivo de física:**

1. Abre el archivo `/content/fisica/01-introduccion.md`
2. Busca todos los `\(` y reemplázalos por `$`
3. Busca todos los `\)` y reemplázalos por `$`
4. Revisa las tablas y asegúrate de que las ecuaciones complejas usen `$$...$$`
5. Verifica que las unidades usen `\mathrm{...}` en lugar de `\text{...}`

**O mejor aún:** Regenera el contenido usando las instrucciones del archivo `PROMPT-PARA-IA-GENERADORA.md`.
