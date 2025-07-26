# Slack Notification GitHub Action - TypeScript Version

Esta é a versão TypeScript da GitHub Action para enviar notificações para o Slack.

## 🚀 Características da Versão TypeScript

- ✅ **Type Safety**: Tipagem completa com TypeScript
- ✅ **Interfaces**: Definições claras de tipos para Slack e GitHub
- ✅ **Compilação**: Build otimizado para produção
- ✅ **Desenvolvimento**: Suporte a hot-reload e desenvolvimento
- ✅ **Mesma Funcionalidade**: Mantém toda a lógica do JavaScript original

## 📋 Pré-requisitos

1. **Node.js**: Versão 18.0.0 ou superior
2. **TypeScript**: Instalado via npm
3. **Webhook do Slack**: Configurado (mesmo do JavaScript)

## 🛠️ Scripts Disponíveis

### Build e Compilação
```bash
# Compilar TypeScript para JavaScript
npm run build

# Compilar em modo watch (desenvolvimento)
npm run build:watch

# Limpar dist e recompilar
npm run build:clean

# Verificar tipos sem compilar
npm run type-check
```

### Execução
```bash
# Executar versão TypeScript (desenvolvimento)
npm run dev

# Executar versão compilada
npm start

# Executar versão compilada (alternativo)
npm run test:fixed:build
```

### Testes
```bash
# Teste JavaScript original
npm run test:fixed

# Teste TypeScript (desenvolvimento)
npm run test:fixed:ts

# Teste versão compilada
npm run test:fixed:build
```

## 📁 Estrutura de Arquivos

```
Action-Slack/
├── test-local-fixed.ts          # Código TypeScript fonte
├── dist/
│   ├── test-local-fixed.js      # JavaScript compilado
│   ├── test-local-fixed.d.ts    # Declarações de tipos
│   └── *.map                    # Source maps
├── tsconfig.json                # Configuração TypeScript
└── package.json                 # Scripts e dependências
```

## 🔧 Interfaces TypeScript

### GitHubData
```typescript
interface GitHubData {
  repository: string;
  ref_name: string;
  sha: string;
  actor: string;
  event_name: string;
  job_status: string;
}
```

### SlackMessage
```typescript
interface SlackMessage {
  text: string;
  attachments: SlackAttachment[];
  username?: string;
  icon_emoji?: string;
  channel?: string;
}
```

### SlackAttachment
```typescript
interface SlackAttachment {
  color: string;
  title: string;
  fields: SlackField[];
  footer: string;
  ts: number;
}
```

### SlackField
```typescript
interface SlackField {
  title: string;
  value: string;
  short: boolean;
}
```

## 🧪 Como Testar

### 1. Configurar Variável de Ambiente
```bash
# Windows (PowerShell)
$env:SLACK_WEBHOOK_URL="sua-url-do-webhook"

# Windows (CMD)
set SLACK_WEBHOOK_URL=sua-url-do-webhook

# Linux/Mac
export SLACK_WEBHOOK_URL="sua-url-do-webhook"
```

### 2. Executar Teste
```bash
# Desenvolvimento (TypeScript)
npm run dev

# Produção (JavaScript compilado)
npm start
```

### 3. Testar com Diferentes Eventos
```bash
# Teste com evento de push
$env:GITHUB_EVENT_NAME="push"; npm run dev

# Teste com evento de pull request
$env:GITHUB_EVENT_NAME="pull_request"; npm run dev

# Teste com evento de release
$env:GITHUB_EVENT_NAME="release"; npm run dev
```

## 🔄 Fluxo de Desenvolvimento

### 1. Desenvolvimento
```bash
# Iniciar modo watch
npm run build:watch

# Em outro terminal, executar em desenvolvimento
npm run dev
```

### 2. Build para Produção
```bash
# Compilar
npm run build

# Executar versão compilada
npm start
```

### 3. Verificação de Tipos
```bash
# Verificar tipos sem compilar
npm run type-check
```

## 🎯 Vantagens do TypeScript

### 1. **Type Safety**
- Detecção de erros em tempo de compilação
- Autocomplete melhorado no IDE
- Refatoração mais segura

### 2. **Interfaces Claras**
- Documentação inline dos tipos
- Contratos claros entre funções
- Melhor manutenibilidade

### 3. **Desenvolvimento**
- Source maps para debugging
- Hot-reload em desenvolvimento
- Build otimizado para produção

## 🔧 Configuração TypeScript

O arquivo `tsconfig.json` está configurado com:

- **Target**: ES2020
- **Module**: CommonJS
- **Strict Mode**: Ativado
- **Source Maps**: Habilitados
- **Declarations**: Geradas automaticamente

## 📝 Comparação com JavaScript

| Aspecto | JavaScript | TypeScript |
|---------|------------|------------|
| Tipagem | Dinâmica | Estática |
| Detecção de Erros | Runtime | Compile-time |
| IDE Support | Básico | Avançado |
| Build | Não necessário | Necessário |
| Performance | Igual | Igual |

## 🚀 Próximos Passos

1. **Teste a versão TypeScript**: `npm run dev`
2. **Configure seu webhook**: Defina `SLACK_WEBHOOK_URL`
3. **Integre com GitHub Actions**: Use a action compilada
4. **Contribua**: Adicione novos tipos e funcionalidades

## 📞 Suporte

Para dúvidas sobre a versão TypeScript:

- Abra uma [Issue](https://github.com/samuelBarreto/Action-Slack/issues)
- Consulte a documentação do TypeScript
- Verifique os tipos definidos no código

---

⭐ Se este projeto te ajudou, considere dar uma estrela! 