# Guía de Tablas Responsive

## Cómo usar tablas desde Notion

### Paso 1: Crea tu tabla en Notion normalmente

En Notion, crea una tabla como siempre lo haces. Por ejemplo:

| Propiedad | Definición | Unidades | Ejemplo |
|-----------|------------|----------|---------|
| Masa | Cantidad de materia | g, kg | 500 g |
| Volumen | Espacio ocupado | L, mL | 250 mL |
| Densidad | Masa por unidad de volumen | g/mL | 1 g/mL |
| Temperatura | Medida de calor | °C, °F, K | 25 °C |

### Paso 2: Exporta a Markdown desde Notion

Notion → Export → Markdown & CSV

### Paso 3: Copia y pega el contenido

El código Markdown de la tabla se verá así:

```markdown
| Propiedad | Definición | Unidades | Ejemplo |
|-----------|------------|----------|---------|
| Masa | Cantidad de materia | g, kg | 500 g |
| Volumen | Espacio ocupado | L, mL | 250 mL |
```

### Paso 4: ¡Listo!

El sistema automáticamente:
- ✅ Hace la tabla responsive en móvil (scroll horizontal)
- ✅ Agrega sombras de scroll para indicar que hay más contenido
- ✅ Muestra "← Desliza →" en móvil
- ✅ Headers sticky (se quedan fijos al hacer scroll)
- ✅ Estilos bonitos con gradientes

## Ejemplo de tabla compleja

| Elemento | Símbolo | Número Atómico | Masa Atómica | Configuración Electrónica | Estado a 25°C |
|----------|---------|----------------|--------------|---------------------------|---------------|
| Hidrógeno | H | 1 | 1.008 | 1s¹ | Gas |
| Helio | He | 2 | 4.003 | 1s² | Gas |
| Litio | Li | 3 | 6.941 | [He] 2s¹ | Sólido |
| Berilio | Be | 4 | 9.012 | [He] 2s² | Sólido |
| Boro | B | 5 | 10.81 | [He] 2s² 2p¹ | Sólido |

## Características

### En Desktop
- Tabla completa visible
- Headers con gradiente morado
- Hover effects en filas

### En Tablet
- Scroll horizontal si es necesario
- Indicadores visuales de scroll

### En Móvil
- Scroll horizontal suave
- Mensaje "← Desliza →" 
- Sombras que indican contenido oculto
- Headers sticky

## No necesitas hacer nada especial

Tu workflow sigue siendo:
1. Editar en Notion
2. Copiar y pegar Markdown
3. `git add .`
4. `git commit -m "mensaje"`
5. `git push`

¡Las tablas se ven bonitas automáticamente! 🎉

---

## 🎨 Personalización (Opcional)

Si quieres cambiar los colores de las tablas en el futuro, solo edita las variables CSS en `app/globals.css`:

```css
:root {
  /* Colores para tablas - Una sola fuente de verdad */
  --table-header-bg: linear-gradient(135deg, #4338ca 0%, #6b21a8 100%);
  --table-header-text: #ffffff;
  --table-header-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}
```

**Ventajas de este enfoque:**
- ✅ Una sola fuente de verdad (DRY principle)
- ✅ Fácil de mantener
- ✅ Cambios globales en un solo lugar
- ✅ Sin hardcodeo de colores
