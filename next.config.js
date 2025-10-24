/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Usar SSG con generateStaticParams
  trailingSlash: true,
  
  // Forzar rebuild completo - mostrar todas las materias
  // Última actualización: 2025-10-24
  
  // Configuración de compilación
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // Remover console.log en producción
  },
  
  // Optimizar imágenes para exportación estática
  images: {
    unoptimized: true, // Necesario para exportación estática
  },
  
  // Configuración de generación estática
  generateBuildId: () => {
    // Usar timestamp para forzar invalidación de caché
    return `build-${Date.now()}`;
  },
}

// Si se define OUTPUT_EXPORT, exportar como sitio estático
if (process.env.OUTPUT_EXPORT === 'true') {
  nextConfig.output = 'export';
  nextConfig.distDir = 'out';
}

module.exports = nextConfig
