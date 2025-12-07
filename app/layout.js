import { Cabin } from 'next/font/google'
import './globals.css'

const cabin = Cabin({
  subsets: ['latin'],
  variable: '--font-cabin',
  display: 'swap',
})

export const metadata = {
  title: 'Saúde Livre - Vacinas Florianópolis Centro',
  description: 'A maior rede de clínicas de vacinas do Brasil. Cuidado humanizado e proteção para todas as idades.',
  icons: {
    icon: '/logo-header.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={cabin.variable} suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>{children}</body>
    </html>
  )
}
