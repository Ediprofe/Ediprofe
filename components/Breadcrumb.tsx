'use client';

// components/Breadcrumb.tsx
// Componente de breadcrumb sticky y responsivo

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SUBJECT_CONFIG } from '@/types/content';

interface BreadcrumbItem {
  label: string;
  href: string;
  icon?: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  customClassName?: string;
}

export default function Breadcrumb({ items, customClassName = '' }: BreadcrumbProps) {
  const pathname = usePathname();

  // Si no se pasan items, generar automáticamente desde la URL
  const breadcrumbItems: BreadcrumbItem[] = items || generateBreadcrumbFromPath(pathname);

  return (
    <div 
      className={`sticky top-[64px] md:top-[72px] z-[45] border-b border-slate-200 backdrop-blur-xl bg-white ${customClassName}`}
      style={{ 
        boxShadow: '0 4px 12px -2px rgba(0, 0, 0, 0.12), 0 2px 6px -1px rgba(0, 0, 0, 0.08)'
      }}
    >
      <div className="container mx-auto px-4 py-3 md:py-4">
        <nav 
          className="flex items-center gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent"
          aria-label="Breadcrumb"
        >
          {breadcrumbItems.map((item, index) => (
            <div key={item.href} className="flex items-center gap-2 flex-shrink-0">
              {index > 0 && (
                <span className="text-slate-400 select-none" aria-hidden="true">
                  /
                </span>
              )}
              
              {index === breadcrumbItems.length - 1 ? (
                // Último elemento (actual) - no es link
                <span className="text-sm md:text-base font-semibold text-slate-900 flex items-center gap-2">
                  {item.icon && <span className="text-lg">{item.icon}</span>}
                  <span className="truncate max-w-[200px] md:max-w-none">{item.label}</span>
                </span>
              ) : (
                // Enlaces anteriores
                <Link
                  href={item.href}
                  className="text-sm md:text-base text-slate-600 hover:text-indigo-600 transition-colors font-medium flex items-center gap-2 group"
                >
                  {item.icon && <span className="text-lg group-hover:scale-110 transition-transform">{item.icon}</span>}
                  <span className="truncate max-w-[150px] md:max-w-none">{item.label}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}

/**
 * Genera breadcrumbs automáticamente desde el pathname
 */
function generateBreadcrumbFromPath(pathname: string): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    {
      label: 'Inicio',
      href: '/',
      icon: '🏠',
    },
  ];

  if (pathname === '/') {
    return items;
  }

  const segments = pathname.split('/').filter(Boolean);

  // Si hay materia
  if (segments.length >= 1) {
    const materia = segments[0];
    const config = SUBJECT_CONFIG[materia];

    if (config) {
      items.push({
        label: config.name,
        href: `/${materia}`,
        icon: config.icon,
      });
    }
  }

  // Si hay unidad
  if (segments.length >= 2) {
    const unidad = segments[1];
    // El nombre de la unidad se pasa como prop, aquí solo ponemos el slug
    items.push({
      label: formatUnidadSlug(unidad),
      href: `/${segments[0]}/${unidad}`,
    });
  }

  return items;
}

/**
 * Formatea el slug de una unidad para mostrar
 */
function formatUnidadSlug(slug: string): string {
  // Remover números y guiones del principio
  return slug
    .replace(/^\d+-/, '') // Remover "01-", "02-", etc.
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
