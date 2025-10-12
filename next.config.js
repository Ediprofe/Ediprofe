/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Usar SSG con generateStaticParams
  trailingSlash: true,
  
  // Configuración de compilación
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // Remover console.log en producción
  },
  
  // Optimizar imágenes
  images: {
    formats: ['image/avif', 'image/webp'],
    unoptimized: true,
  },
}

// Si se define OUTPUT_EXPORT, exportar como sitio estático
if (process.env.OUTPUT_EXPORT === 'true') {
  nextConfig.output = 'export';
}

module.exports = nextConfig
