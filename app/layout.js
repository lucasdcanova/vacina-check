import { Cabin } from 'next/font/google'
import './globals.css'
import Script from 'next/script'

const cabin = Cabin({
  subsets: ['latin'],
  variable: '--font-cabin',
  display: 'swap',
})

// Viewport configuration (Next.js 15+)
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0072a2' },
    { media: '(prefers-color-scheme: dark)', color: '#15335e' },
  ],
}

export const metadata = {
  title: 'Saúde Livre - Vacinas Florianópolis Centro',
  description: 'A maior rede de clínicas de vacinas do Brasil. Cuidado humanizado e proteção para todas as idades. Verifique sua carteirinha de vacinação.',
  keywords: 'vacinas, vacinação, florianópolis, carteirinha de vacinação, saúde livre, vacina infantil, vacina adulto, imunização',
  authors: [{ name: 'Saúde Livre Vacinas' }],
  generator: 'Next.js',
  applicationName: 'VacinaCheck',
  referrer: 'origin-when-cross-origin',
  creator: 'Saúde Livre Florianópolis',
  publisher: 'Saúde Livre Vacinas',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://saudelivrefloripa.com.br'),

  // PWA Manifest
  manifest: '/manifest.json',

  // iOS/Safari specific
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'VacinaCheck',
    startupImage: [
      {
        url: '/splash/splash-2048x2732.png',
        media: '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url: '/splash/splash-1668x2388.png',
        media: '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url: '/splash/splash-1536x2048.png',
        media: '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url: '/splash/splash-1242x2688.png',
        media: '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url: '/splash/splash-1125x2436.png',
        media: '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url: '/splash/splash-828x1792.png',
        media: '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url: '/splash/splash-1242x2208.png',
        media: '(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url: '/splash/splash-750x1334.png',
        media: '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url: '/splash/splash-640x1136.png',
        media: '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
    ],
  },

  // Icons
  icons: {
    icon: [
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/icons/safari-pinned-tab.svg', color: '#0072a2' },
    ],
  },

  // Open Graph
  openGraph: {
    title: 'Saúde Livre VacinaCheck - Verifique sua Carteirinha',
    description: 'A maior rede de clínicas de vacinas do Brasil. Verifique sua carteirinha de vacinação com inteligência artificial.',
    url: 'https://saudelivrefloripa.com.br',
    siteName: 'Saúde Livre Vacinas',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Saúde Livre VacinaCheck',
      },
    ],
  },

  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'Saúde Livre VacinaCheck',
    description: 'Verifique sua carteirinha de vacinação com inteligência artificial.',
    images: ['/og-image.png'],
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={cabin.variable} suppressHydrationWarning>
      <head>
        {/* Additional iOS optimizations */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="VacinaCheck" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* Disable auto-detection */}
        <meta name="format-detection" content="telephone=no" />

        {/* Microsoft tiles */}
        <meta name="msapplication-TileColor" content="#0072a2" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//wa.me" />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        {children}

        {/* Service Worker Registration */}
        <Script id="sw-register" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js')
                  .then(function(registration) {
                    console.log('SW registered: ', registration.scope);
                  })
                  .catch(function(error) {
                    console.log('SW registration failed: ', error);
                  });
              });
            }
          `}
        </Script>

        {/* iOS viewport height fix */}
        <Script id="ios-vh-fix" strategy="afterInteractive">
          {`
            function setVH() {
              let vh = window.innerHeight * 0.01;
              document.documentElement.style.setProperty('--vh', vh + 'px');
            }
            setVH();
            window.addEventListener('resize', setVH);
            window.addEventListener('orientationchange', function() {
              setTimeout(setVH, 100);
            });
          `}
        </Script>
      </body>
    </html>
  )
}
