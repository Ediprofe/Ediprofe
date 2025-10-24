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
  
  // Optimizar imágenes
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  
  // Configuración de generación estática
  generateBuildId: () => {
    // Usar timestamp para forzar invalidación de caché
    return `build-${Date.now()}`;
  },
}

// DESHABILITADO: output export causa problemas en Vercel con Next.js 15
// Usar SSG normal de Next.js en su lugar
// if (process.env.OUTPUT_EXPORT === 'true') {
//   nextConfig.output = 'export';
//   nextConfig.distDir = 'out';
// }

module.exports = nextConfig
