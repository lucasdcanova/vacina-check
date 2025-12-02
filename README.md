# VacinaCheck

Sistema de Verificação de Carteira de Vacinação Brasileira baseado no calendário vacinal do Ministério da Saúde (SUS) e SBIm 2025/2026.

## Funcionalidades

- Cadastro de dados do paciente (nome, data de nascimento, sexo)
- Upload de imagem da carteira de vacinação
- Reconhecimento automático de vacinas (OCR simulado)
- Análise completa da situação vacinal
- Identificação de vacinas em dia, atrasadas e próximas
- Relatório detalhado com percentual de cobertura vacinal
- Exportação de relatório em PDF

## Tecnologias Utilizadas

- **Next.js 15** - Framework React
- **React 18** - Biblioteca JavaScript
- **Tailwind CSS** - Framework CSS para estilização
- **App Router** - Sistema de roteamento do Next.js

## Estrutura do Projeto

```
VacinaCheck/
├── app/
│   ├── layout.js          # Layout principal da aplicação
│   ├── page.js            # Página inicial
│   └── globals.css        # Estilos globais + Tailwind
├── components/
│   └── VacinaCheck.jsx    # Componente principal do sistema
├── public/                # Arquivos estáticos
├── package.json           # Dependências do projeto
├── tailwind.config.js     # Configuração do Tailwind
├── postcss.config.js      # Configuração do PostCSS
├── next.config.js         # Configuração do Next.js
└── jsconfig.json          # Configuração de paths do JavaScript

```

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**

Para verificar se você tem o Node.js instalado:
```bash
node --version
```

## Instalação

### 1. Instalar as dependências

```bash
npm install
```

ou com yarn:

```bash
yarn install
```

### 2. Executar o servidor de desenvolvimento

```bash
npm run dev
```

ou com yarn:

```bash
yarn dev
```

### 3. Acessar a aplicação

Abra seu navegador e acesse:
```
http://localhost:3000
```

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a versão de produção
- `npm start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter

## Como Usar

### Passo 1: Dados do Paciente
Preencha as informações do paciente:
- Nome completo
- Data de nascimento
- Sexo

### Passo 2: Upload da Carteira
Envie uma foto ou PDF da carteira de vacinação. Para melhores resultados:
- Use uma imagem bem iluminada
- Certifique-se de que o texto está legível
- Formatos aceitos: JPG, PNG, PDF

### Passo 3: Análise
O sistema irá:
- Reconhecer automaticamente as vacinas
- Permitir confirmação manual das vacinas identificadas
- Possibilitar adição manual de vacinas não reconhecidas

### Passo 4: Resultado
Visualize o relatório completo com:
- Percentual de cobertura vacinal
- Vacinas em dia
- Vacinas atrasadas (requer atenção)
- Próximas vacinas previstas

## Calendário Vacinal Incluído

O sistema implementa o calendário vacinal completo:

- **Ao nascer**: BCG, Hepatite B
- **2 a 6 meses**: Penta, VIP, Pneumocócica, Rotavírus, Meningocócica C
- **9 meses**: Febre Amarela
- **12 meses**: Tríplice Viral, Meningocócica ACWY
- **15 meses**: DTP, Hepatite A, Tetraviral
- **4 anos**: Reforços
- **9 a 14 anos**: HPV
- **Adultos**: dT, Tríplice Viral, Hepatite B, Febre Amarela
- **Idosos (60+)**: Influenza, Pneumocócica 23, Herpes Zóster

## Próximos Passos / Melhorias Futuras

### Implementação de OCR Real
Atualmente o OCR está simulado. Para produção, integrar com:
- **Tesseract.js** - OCR no cliente
- **Google Cloud Vision API** - OCR em nuvem
- **AWS Textract** - OCR AWS

### Backend e Persistência
- Criar API REST ou GraphQL
- Implementar banco de dados (PostgreSQL, MongoDB)
- Sistema de autenticação de usuários
- Armazenamento seguro de imagens

### Outras Funcionalidades
- Envio de notificações de vacinas pendentes
- Integração com sistemas de saúde
- Suporte a múltiplos perfis familiares
- Histórico de vacinação ao longo do tempo

## Observações Importantes

- Este sistema é apenas **informativo**
- Sempre consulte um **profissional de saúde qualificado**
- Os dados não são armazenados permanentemente (apenas na sessão do navegador)
- O OCR é simulado para demonstração

## Licença

Este projeto é de código aberto e está disponível para uso educacional.

## Contato

Para dúvidas ou sugestões sobre o VacinaCheck, entre em contato.

---

Desenvolvido com base no Calendário Vacinal do Ministério da Saúde (SUS) e SBIm 2025/2026
