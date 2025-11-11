# 📐 Resumen: Sintaxis LaTeX en Markdown

## ✅ USAR SIEMPRE

### Inline (en línea)
```markdown
$expresión$
```
**Ejemplo:** `La velocidad es $v = \frac{d}{t}$ en m/s.`

### Display (bloque)
```markdown
$$
expresión
$$
```
**Ejemplo:**
```markdown
La fórmula es:

$$
F = m \cdot a
$$
```

## ❌ NUNCA USAR

- `\(expresión\)` ← NO funciona
- `$$expresión$$` inline ← NO usar en la misma línea
- `(expresión)` con LaTeX ← NO usar paréntesis normales

## 🔤 Comandos básicos

| Comando | Resultado | Uso |
|---------|-----------|-----|
| `$x$` | x | Variable |
| `$\frac{a}{b}$` | a/b | Fracción |
| `$x^2$` | x² | Superíndice |
| `$x_1$` | x₁ | Subíndice |
| `$5\,\mathrm{m}$` | 5 m | Número con unidad |
| `$\text{texto}$` | texto | Texto normal |
| `$a \times b$` | a×b | Multiplicación |

## 📊 En tablas

```markdown
| Magnitud | Fórmula |
|----------|---------|
| Velocidad | $$v = \frac{d}{t}$$ |
| Densidad | $$\frac{m}{V}$$ |
```

## ⚠️ Consejo importante

**En tablas con paréntesis:** Usa notación simple como `$9.8\,\mathrm{m/s^2}$` en lugar de `$9.8\,\mathrm{m\,s^{-2}}$`. Ambas son correctas, pero la primera es más robusta.

## 🎯 Regla de oro

**Si funciona en química, funciona en física.**

Ver ejemplos correctos en:
- `/content/quimica/01-la-materia.md`
- `/content/quimica/09-soluciones.md`
