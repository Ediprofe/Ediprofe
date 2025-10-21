// types/content.ts
// Tipos para la plataforma educativa Ediprofe

/**
 * Metadata del contenido extraído del frontmatter del Markdown
 */
export interface ContentMetadata {
  title: string;
  description: string;
  author?: string;
  date?: string;
  duration?: string;
  difficulty?: 'basico' | 'intermedio' | 'avanzado';
  tags?: string[];
}

/**
 * Enlace a un video (YouTube o TikTok)
 */
export interface VideoLink {
  platform: 'youtube' | 'tiktok';
  url: string;
  embed: boolean; // true para YouTube (iframe), false para TikTok (botón)
  thumbnail?: string;
  title?: string;
}

/**
 * Recurso externo (Google Drive, YouTube Playlist, etc.)
 */
export interface ExternalResource {
  type: 'google-drive' | 'youtube-playlist';
  url: string;
  label: string;
  icon: string;
}

/**
 * Tab individual dentro de una sección
 * Puede contener contenido HTML o videos
 */
export interface Tab {
  id: string; // slug generado del label
  label: string; // Texto exacto del H3 (con emojis incluidos)
  content?: string; // HTML renderizado del contenido
  videos?: VideoLink[]; // Videos asociados a esta tab
  type: 'content' | 'videos' | 'mixed'; // Tipo de tab
}

/**
 * Sección principal de una unidad (corresponde a un H2)
 * Contiene múltiples tabs (H3)
 */
export interface Section {
  id: string; // slug generado del title
  title: string; // Título del H2 (con emojis incluidos)
  tabs: Tab[];
  order: number; // Orden de aparición en el documento
}

/**
 * Unidad completa (un archivo .md)
 */
export interface Unit {
  slug: string; // Nombre del archivo sin extensión (ej: "01-la-materia")
  metadata: ContentMetadata;
  sections: Section[];
  materia: string; // Carpeta padre (ej: "quimica")
  fullPath: string; // Ruta absoluta al archivo
  rawContent: string; // Contenido Markdown original
  hasVideos: boolean;
  hasExercises: boolean;
  hasActivities: boolean;
  externalResources?: ExternalResource[]; // Recursos externos (Drive, Playlists)
}

/**
 * Materia/Asignatura (una carpeta en /content/)
 */
export interface Subject {
  slug: string; // Nombre de la carpeta (ej: "quimica")
  name: string; // Nombre legible (ej: "Química")
  icon: string; // Emoji o icono
  description: string;
  color: string; // Color Tailwind (ej: "materia-quimica")
  units: Unit[];
  unitCount: number;
}

/**
 * Tabla de contenidos para navegación lateral
 */
export interface TOCItem {
  id: string;
  title: string;
  level: 2 | 3; // H2 o H3
  children?: TOCItem[];
}

/**
 * Parámetros para rutas dinámicas
 */
export interface RouteParams {
  materia: string;
  unidad: string;
}

/**
 * Resultado del parser de Markdown
 */
export interface ParsedMarkdown {
  metadata: ContentMetadata;
  sections: Section[];
  toc: TOCItem[];
  videos: VideoLink[];
  rawHtml: string;
}

/**
 * Orden de visualización de las materias
 */
export const SUBJECT_ORDER = ['quimica', 'fisica', 'ciencias', 'matematicas'];

/**
 * Sistema de colores centralizado por materia
 */
export const SUBJECT_COLORS = {
  quimica: {
    primary: '#FF6B35',
    light: '#FFE5DC',
    dark: '#CC5529',
    gradient: 'from-orange-500 to-orange-600',
  },
  fisica: {
    primary: '#007BFF',
    light: '#CCE5FF',
    dark: '#0056B3',
    gradient: 'from-blue-500 to-blue-600',
  },
  ciencias: {
    primary: '#28A745',
    light: '#D4EDDA',
    dark: '#1E7E34',
    gradient: 'from-green-500 to-green-600',
  },
  matematicas: {
    primary: '#DC3545',
    light: '#F8D7DA',
    dark: '#A71D2A',
    gradient: 'from-red-500 to-red-600',
  },
  biologia: {
    primary: '#17A2B8',
    light: '#D1ECF1',
    dark: '#117A8B',
    gradient: 'from-cyan-500 to-cyan-600',
  },
  historia: {
    primary: '#6C757D',
    light: '#E2E3E5',
    dark: '#545B62',
    gradient: 'from-gray-500 to-gray-600',
  },
} as const;

/**
 * Configuración de colores por materia
 */
export const SUBJECT_CONFIG: Record<string, { name: string; icon: string; color: keyof typeof SUBJECT_COLORS; description: string }> = {
  quimica: {
    name: 'Química',
    icon: '⚛️',
    color: 'quimica',
    description: 'Estudio de la materia, sus propiedades y transformaciones',
  },
  fisica: {
    name: 'Física',
    icon: '🧲',
    color: 'fisica',
    description: 'Estudio de las leyes fundamentales del universo',
  },
  matematicas: {
    name: 'Matemáticas',
    icon: '🔢',
    color: 'matematicas',
    description: 'Números, álgebra, geometría y cálculo',
  },
  ciencias: {
    name: 'Ciencias Naturales',
    icon: '🌍',
    color: 'ciencias',
    description: 'Biología, geología y ecología',
  },
};
