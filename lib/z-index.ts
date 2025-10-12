// Z-INDEX HIERARCHY - Ediprofe Platform
// Este archivo documenta la jerarquía de z-index usada en toda la aplicación

/**
 * JERARQUÍA DE Z-INDEX
 * 
 * Niveles (de menor a mayor):
 * 
 * 0-9:     Contenido base (default)
 * 10-19:   Elementos elevados (cards, tooltips)
 * 20-29:   Sidebars y elementos sticky secundarios
 * 30-39:   Overlays de móvil
 * 40-49:   Breadcrumb y navegación principal
 * 50-59:   Header principal
 * 60-69:   Modales y dialogs
 * 70-79:   Notificaciones y toasts
 * 80-89:   Tooltips críticos
 * 90-99:   Loading spinners y overlays globales
 * 100+:    Elementos de debugging (solo desarrollo)
 */

export const Z_INDEX = {
  // Contenido base
  BASE: 0,
  CONTENT: 1,
  
  // Elementos elevados
  CARD: 10,
  TOOLTIP: 15,
  
  // Sidebars
  TOC_DESKTOP: 20,        // Table of Contents en desktop
  SIDEBAR: 25,
  
  // Overlays móvil
  TOC_MOBILE: 30,         // Table of Contents en móvil (overlay)
  MOBILE_OVERLAY: 35,
  
  // Navegación
  BREADCRUMB: 45,         // Breadcrumb sticky
  
  // Header
  HEADER: 50,             // Header principal
  
  // Modales
  MODAL_BACKDROP: 60,
  MODAL: 65,
  
  // Notificaciones
  TOAST: 70,
  NOTIFICATION: 75,
  
  // Critical UI
  LOADING: 90,
  ERROR_OVERLAY: 95,
  
  // Debug (solo desarrollo)
  DEBUG: 100,
} as const;

export type ZIndexKey = keyof typeof Z_INDEX;

/**
 * REGLAS DE USO:
 * 
 * 1. NUNCA usar valores de z-index arbitrarios en los componentes
 * 2. SIEMPRE importar de este archivo
 * 3. Si necesitas un nuevo nivel, agrégalo aquí primero
 * 4. Mantener separación de 5 unidades entre categorías
 * 5. Documentar el uso en comentarios
 * 
 * EJEMPLO DE USO:
 * 
 * import { Z_INDEX } from '@/lib/z-index';
 * 
 * // En Tailwind
 * className={`z-[${Z_INDEX.BREADCRUMB}]`}
 * 
 * // En CSS modules
 * z-index: ${Z_INDEX.HEADER};
 */

/**
 * ESTRUCTURA ACTUAL EN LA APP:
 * 
 * ┌─────────────────────────────────────┐
 * │ Header (z-50)                       │ ← Siempre arriba
 * ├─────────────────────────────────────┤
 * │ Breadcrumb (z-45)                   │ ← Debajo de header, sobre todo lo demás
 * ├──────────┬──────────────────────────┤
 * │ TOC      │ Contenido principal      │
 * │ (z-20)   │ (z-1)                    │ ← TOC queda debajo del breadcrumb
 * │ Desktop  │                          │
 * └──────────┴──────────────────────────┘
 * 
 * EN MÓVIL (cuando se abre TOC):
 * 
 * ┌─────────────────────────────────────┐
 * │ Header (z-50)                       │
 * ├─────────────────────────────────────┤
 * │ Breadcrumb (z-45)                   │
 * ├─────────────────────────────────────┤
 * │ Overlay (z-35)                      │ ← Oscurece el fondo
 * │ ┌─────────────────┐                │
 * │ │ TOC Móvil       │                │
 * │ │ (z-30)          │                │ ← Debajo de breadcrumb
 * │ └─────────────────┘                │
 * └─────────────────────────────────────┘
 */

export default Z_INDEX;
