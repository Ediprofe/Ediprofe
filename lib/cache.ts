// lib/cache.ts
// Sistema de caché simple en memoria para acelerar desarrollo
// En producción con SSG, esto no se usa mucho porque todo se pre-genera

import 'server-only';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

class SimpleCache {
  private cache: Map<string, CacheEntry<any>> = new Map();
  private ttl: number = 60 * 1000; // 60 segundos por defecto
  private enabled: boolean;

  constructor() {
    // Solo habilitar caché en desarrollo
    this.enabled = process.env.NODE_ENV === 'development';
  }

  /**
   * Obtiene un valor del caché si existe y no ha expirado
   */
  get<T>(key: string): T | null {
    if (!this.enabled) return null;

    const entry = this.cache.get(key);
    if (!entry) return null;

    // Verificar si ha expirado
    const now = Date.now();
    if (now - entry.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  /**
   * Guarda un valor en el caché
   */
  set<T>(key: string, data: T): void {
    if (!this.enabled) return;

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  /**
   * Limpia una entrada específica del caché
   */
  clear(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Limpia todo el caché
   */
  clearAll(): void {
    this.cache.clear();
  }

  /**
   * Obtiene el tamaño actual del caché
   */
  size(): number {
    return this.cache.size;
  }

  /**
   * Wrapper para funciones: obtiene del caché o ejecuta la función
   */
  async getOrCompute<T>(
    key: string,
    computeFn: () => Promise<T>
  ): Promise<T> {
    // Intentar obtener del caché
    const cached = this.get<T>(key);
    if (cached !== null) {
      return cached;
    }

    // No está en caché, computar
    const result = await computeFn();
    this.set(key, result);
    return result;
  }
}

// Instancia singleton
export const cache = new SimpleCache();

// Funciones de utilidad
export function getCacheKey(...parts: string[]): string {
  return parts.join(':');
}

export function clearContentCache(): void {
  cache.clearAll();
}
