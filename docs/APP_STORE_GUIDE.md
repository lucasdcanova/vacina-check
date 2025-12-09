# VacinaCheck - Guia de Publicação na App Store

## Índice
1. [Pré-requisitos](#pré-requisitos)
2. [Preparação do Projeto](#preparação-do-projeto)
3. [Configuração do Xcode](#configuração-do-xcode)
4. [App Store Connect](#app-store-connect)
5. [Submissão](#submissão)
6. [Checklist Final](#checklist-final)

---

## Pré-requisitos

### Requisitos do Sistema
- macOS Ventura ou posterior
- Xcode 15 ou posterior
- Node.js 18+
- CocoaPods (para dependências iOS)
- Conta Apple Developer ($99/ano)

### Instalação de Dependências

```bash
# Instalar CocoaPods (se não tiver)
sudo gem install cocoapods

# Instalar dependências do projeto
npm install
```

---

## Preparação do Projeto

### 1. Gerar Ícones e Assets

```bash
# Gerar todos os ícones e splash screens
npm run generate:icons
```

### 2. Build para iOS

```bash
# Build estático + Sync Capacitor
npm run prepare:appstore
```

### 3. Adicionar Plataforma iOS (primeira vez)

```bash
npx cap add ios
```

### 4. Abrir no Xcode

```bash
npx cap open ios
```

---

## Configuração do Xcode

### 1. Configurações Gerais

No Xcode, selecione o projeto `App` no Navigator e configure:

**General Tab:**
- **Display Name:** `VacinaCheck`
- **Bundle Identifier:** `br.com.saudelivre.vacinacheck`
- **Version:** `1.0.0`
- **Build:** `1`
- **Minimum Deployments:** iOS 14.0

**Signing & Capabilities:**
- Selecione seu Team (Apple Developer Account)
- Marque "Automatically manage signing"
- Verifique se o Provisioning Profile foi criado

### 2. Capabilities Necessárias

Adicione as seguintes capabilities (+ Capability):
- ✅ Push Notifications (opcional, para futuro)
- ✅ Background Modes (se usar background sync)

### 3. Configurar App Icons

1. Em `Assets.xcassets` > `AppIcon`
2. Importe `icon-1024x1024.png` de `public/icons/`
3. O Xcode irá gerar automaticamente os tamanhos necessários

### 4. Configurar Launch Screen

1. Abra `App/Assets.xcassets/Splash.imageset`
2. Adicione os splash screens de `/public/splash/`
3. Configure para diferentes tamanhos de tela

### 5. Info.plist - Configurações Importantes

Adicione/verifique estas chaves em `App/Info.plist`:

```xml
<!-- Permissões de Câmera (para upload de fotos) -->
<key>NSCameraUsageDescription</key>
<string>Precisamos acessar a câmera para fotografar sua carteira de vacinação.</string>

<!-- Permissões de Galeria -->
<key>NSPhotoLibraryUsageDescription</key>
<string>Precisamos acessar suas fotos para selecionar a imagem da carteira de vacinação.</string>

<!-- Aparência no Status Bar -->
<key>UIStatusBarStyle</key>
<string>UIStatusBarStyleLightContent</string>
<key>UIViewControllerBasedStatusBarAppearance</key>
<false/>

<!-- Orientação (apenas portrait para app de vacinas) -->
<key>UISupportedInterfaceOrientations</key>
<array>
    <string>UIInterfaceOrientationPortrait</string>
</array>
<key>UISupportedInterfaceOrientations~ipad</key>
<array>
    <string>UIInterfaceOrientationPortrait</string>
    <string>UIInterfaceOrientationPortraitUpsideDown</string>
    <string>UIInterfaceOrientationLandscapeLeft</string>
    <string>UIInterfaceOrientationLandscapeRight</string>
</array>

<!-- Suporte a Safe Areas -->
<key>UILaunchStoryboardName</key>
<string>LaunchScreen</string>

<!-- Evitar zoom em inputs -->
<key>viewport-fit</key>
<string>cover</string>
```

---

## App Store Connect

### 1. Criar App

1. Acesse [App Store Connect](https://appstoreconnect.apple.com)
2. Vá em "My Apps" > "+" > "New App"
3. Preencha:
   - **Platform:** iOS
   - **Name:** VacinaCheck - Carteira Vacinal
   - **Primary Language:** Portuguese (Brazil)
   - **Bundle ID:** br.com.saudelivre.vacinacheck
   - **SKU:** vacinacheck-001

### 2. Informações do App

**App Information:**
- **Subtitle:** Verifique sua carteira de vacinação
- **Category:** Health & Fitness > Medical
- **Content Rating:** 4+ (sem conteúdo restritivo)

**Privacy Policy:**
- URL da política de privacidade (obrigatório)
- Ex: `https://saudelivrefloripa.com.br/privacidade`

### 3. Descrição e Keywords

**Descrição (Português):**
```
VacinaCheck é seu assistente de vacinação inteligente.

📋 VERIFIQUE SUA CARTEIRA
Envie uma foto ou PDF da sua carteira de vacinação e nossa IA irá identificar todas as vacinas registradas.

✅ ANÁLISE COMPLETA
Compare suas vacinas com o calendário oficial brasileiro (PNI) e descubra quais estão em dia, atrasadas ou pendentes.

👶 PARA TODAS AS IDADES
Suporte para calendário infantil, adulto, gestantes e idosos.

🔒 PRIVACIDADE
Seus dados são processados de forma segura e nunca são armazenados.

Desenvolvido por Saúde Livre Vacinas - A maior rede de clínicas de vacinas do Brasil.
```

**Keywords:**
```
vacina,vacinação,carteirinha,imunização,saúde,bebê,infantil,gestante,calendário,pni,sus
```

### 4. Screenshots

**Tamanhos Obrigatórios:**
- iPhone 6.5" (1284 x 2778)
- iPhone 5.5" (1242 x 2208)
- iPad Pro 12.9" (2048 x 2732)

**Conteúdo sugerido:**
1. Tela inicial com logo
2. Formulário de dados do paciente
3. Upload da carteira
4. Resultado da análise

### 5. App Review Information

**Contact Information:**
- Nome: [Responsável]
- Email: contato@saudelivrefloripa.com.br
- Telefone: +55 48 99189-5758

**Notas para Review:**
```
Este app analisa carteiras de vacinação usando IA para identificar vacinas e comparar com o calendário oficial brasileiro.

Para testar:
1. Abra o app
2. Preencha dados fictícios:
   - Nome: João Teste
   - Data de Nascimento: 01/01/1990
3. Na tela de upload, use qualquer imagem de carteira de vacinação disponível online para teste

A análise requer conexão com internet para processamento via IA.
```

---

## Submissão

### 1. Archive no Xcode

1. Conecte um dispositivo iOS ou selecione "Any iOS Device"
2. Menu: **Product > Archive**
3. Aguarde o build completar

### 2. Upload para App Store

1. No Organizer (Window > Organizer)
2. Selecione o Archive criado
3. Clique **Distribute App**
4. Selecione **App Store Connect**
5. Escolha **Upload**
6. Marque todas as opções de validação
7. Clique **Upload**

### 3. Submeter para Review

1. No App Store Connect, vá para o app
2. Selecione a build uploaded
3. Preencha informações de versão
4. Clique **Submit for Review**

---

## Checklist Final

### Antes do Build
- [ ] Ícones gerados (npm run generate:icons)
- [ ] Splash screens configurados
- [ ] NEXT_PUBLIC_API_URL configurada para produção
- [ ] Versão e build number atualizados

### Xcode
- [ ] Bundle ID correto
- [ ] Team/Signing configurado
- [ ] Capabilities adicionadas
- [ ] Info.plist com permissões
- [ ] Minimum iOS version: 14.0

### App Store Connect
- [ ] App criado
- [ ] Descrição em Português
- [ ] Screenshots para todos os dispositivos
- [ ] Política de Privacidade
- [ ] Categoria: Health & Fitness

### Teste
- [ ] Testado em dispositivo físico
- [ ] Upload de imagem funciona
- [ ] Upload de PDF funciona
- [ ] Análise retorna resultados
- [ ] Safe areas respeitadas (notch, home indicator)
- [ ] Orientação portrait funcionando

---

## Comandos Úteis

```bash
# Limpar e rebuildar
rm -rf ios/ && npm run export && npx cap add ios && npx cap sync

# Atualizar apenas o código
npm run export && npx cap copy ios

# Sincronizar plugins
npx cap sync ios

# Abrir Xcode
npx cap open ios

# Ver logs do dispositivo
npx cap run ios --livereload
```

---

## Suporte

- **Documentação Capacitor:** https://capacitorjs.com/docs/ios
- **Apple Developer:** https://developer.apple.com
- **App Store Guidelines:** https://developer.apple.com/app-store/review/guidelines/
