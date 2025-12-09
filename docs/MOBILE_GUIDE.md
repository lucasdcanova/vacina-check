# VacinaCheck - Guia Rápido de Desenvolvimento Mobile

## 📱 Executando em Desenvolvimento

### Web (com API routes funcionando)
```bash
npm run dev
```

### iOS Simulator
```bash
# Build estático + abrir Xcode
npm run ios

# Ou passo a passo:
npm run export
npx cap copy ios
npx cap open ios
```

## 🚀 Publicação na App Store

### Preparação Completa
```bash
npm run prepare:appstore
```

Este comando irá:
1. Gerar build estático otimizado
2. Sincronizar com Capacitor
3. Preparar o projeto iOS

### No Xcode

1. **Configurar Signing**
   - Selecione o projeto `App`
   - Tab "Signing & Capabilities"
   - Configure seu Team (Apple Developer Account)

2. **Atualizar Bundle ID**
   - General > Bundle Identifier: `br.com.saudelivre.vacinacheck`

3. **Definir Version e Build**
   - Version: `1.0.0`
   - Build: `1`

4. **Archive para App Store**
   - Product > Archive
   - Distribute App > App Store Connect

## 📋 Estrutura de Arquivos Importantes

```
/VacinaCheck
├── /app                    # Páginas Next.js
├── /components             # Componentes React
├── /lib                    # Hooks e serviços
│   ├── capacitor.js       # Integração nativa
│   └── api.js             # Serviço de API
├── /public
│   ├── /icons             # Ícones PWA/iOS
│   ├── /splash            # Splash screens
│   ├── manifest.json      # PWA manifest
│   └── sw.js              # Service Worker
├── /ios                   # Projeto Xcode (gerado)
├── /docs                  # Documentação
│   └── APP_STORE_GUIDE.md # Guia completo App Store
├── capacitor.config.ts    # Config Capacitor
├── next.config.js         # Config Next.js
└── package.json           # Scripts e deps
```

## 🔧 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Desenvolvimento local com API |
| `npm run build` | Build para produção web |
| `npm run export` | Build estático para Capacitor |
| `npm run ios` | Build + abrir Xcode |
| `npm run generate:icons` | Gerar ícones e splash screens |
| `npm run prepare:appstore` | Preparar para App Store |

## 🍎 Requisitos iOS

- macOS Ventura+
- Xcode 15+
- Apple Developer Account ($99/ano)
- CocoaPods (para comandos legacy)

## 🌐 PWA

O app funciona como PWA em navegadores que suportam:

- ✅ Chrome/Edge (desktop e mobile)
- ✅ Safari iOS (Add to Home Screen)
- ✅ Firefox
- ✅ Samsung Internet

O prompt de instalação aparece automaticamente após alguns segundos.

## 🔒 Configuração de API para App Nativo

Para o app iOS funcionar corretamente, configure:

```env
# .env (para web)
OPENAI_API_KEY=...
GEMINI_API_KEY=...

# .env.production ou no servidor
NEXT_PUBLIC_API_URL=https://seu-servidor.com
```

O app nativo irá usar `NEXT_PUBLIC_API_URL` para chamadas de API.

## 📞 Suporte

- Documentação: `/docs/APP_STORE_GUIDE.md`
- Capacitor: https://capacitorjs.com/docs
- Next.js: https://nextjs.org/docs
