/** @type {import('next').NextConfig} */

// Verificar se está em modo de export estático (para Capacitor)
const isStaticExport = process.env.STATIC_EXPORT === 'true';

const nextConfig = {
  reactStrictMode: true,

  // Habilitar static export apenas quando STATIC_EXPORT=true
  // Para web normal, manter modo servidor para API routes
  ...(isStaticExport && {
    output: 'export',
    images: {
      unoptimized: true,
    },
    trailingSlash: true,
  }),

  // Quando não está em static export, otimizar imagens
  ...(!isStaticExport && {
    images: {
      remotePatterns: [],
      formats: ['image/avif', 'image/webp'],
    },
  }),

  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Handle canvas for PDF.js
    config.resolve.alias.canvas = false;

    // Optimize for mobile
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      };
    }

    return config;
  },

  // Headers for PWA and security (only works in server mode)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
          {
            key: 'Service-Worker-Allowed',
            value: '/',
          },
        ],
      },
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600',
          },
        ],
      },
    ];
  },

  // Environment variables exposed to client
  env: {
    NEXT_PUBLIC_APP_VERSION: process.env.npm_package_version || '1.0.0',
    NEXT_PUBLIC_APP_NAME: 'VacinaCheck',
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || '',
  },

  // Compiler options
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // Experimental features for performance
  experimental: {
    // Optimize package imports
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

module.exports = nextConfig;
