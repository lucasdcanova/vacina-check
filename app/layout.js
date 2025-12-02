import './globals.css'

export const metadata = {
  title: 'VacinaCheck - Sistema de Verificação Vacinal',
  description: 'Sistema de verificação de carteira de vacinação baseado no calendário do SUS',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
