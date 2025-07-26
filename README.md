# Slack Notification GitHub Action

Uma GitHub Action reutilizável para enviar notificações para o Slack sobre eventos do GitHub.

## 🚀 Características

- ✅ **Reutilizável**: Pode ser usada em qualquer repositório
- 🔧 **Flexível**: Suporte a mensagens personalizadas
- 📊 **Detalhado**: Inclui informações do evento automaticamente
- 🎨 **Customizável**: Cores e emojis diferentes por tipo de evento
- 🔒 **Seguro**: Usa secrets para URLs do webhook
- 🐌 **Compatível**: Usa curl com arquivo temporário (mesmo método do test-local-fixed.js)
- ⚡ **TypeScript**: Build otimizado com Node.js 18+
- 🔄 **Automático**: Compila e executa o script da pasta `dist`

## 📋 Pré-requisitos

1. **Webhook do Slack**: Configure um webhook no Slack
   - Vá para [Slack Apps](https://api.slack.com/apps)
   - Crie um novo app ou use um existente
   - Ative "Incoming Webhooks"
   - Crie um webhook para o canal desejado

2. **Secret no GitHub**: Adicione a URL do webhook como secret
   - Vá para Settings > Secrets and variables > Actions
   - Crie um secret chamado `SLACK_WEBHOOK_URL`

## 🛠️ Como usar

### Uso Básico

```yaml
name: 'Slack Notification'

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - name: 'Send Slack Notification'
        uses: samuelBarreto/Action-Slack@main
        with:
          webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
```

### Uso Avançado

```yaml
name: 'Slack Notification'

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]
  release:
    types: [ published ]

jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - name: 'Send Slack Notification'
        uses: samuelBarreto/Action-Slack@main
        with:
          webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
          channel: '#deployments'
          username: 'Deploy Bot'
          icon-emoji: ':rocket:'
          include-event-details: 'true'
```

### Mensagem Personalizada

```yaml
- name: 'Send Custom Message'
  uses: samuelBarreto/Action-Slack@main
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
    message: '🚀 Deploy realizado com sucesso! A aplicação está no ar.'
    channel: '#team-notifications'
```

### Uso com Variáveis

```yaml
env:
  SLACK_CHANNEL: '#deployments'
  SLACK_USERNAME: 'Deploy Bot'
  SLACK_ICON: ':rocket:'

- name: 'Send Notification with Variables'
  uses: samuelBarreto/Action-Slack@main
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
    message: ${{ github.event.inputs.custom_message || '🚀 Deploy realizado!' }}
    channel: ${{ env.SLACK_CHANNEL }}
    username: ${{ env.SLACK_USERNAME }}
    icon-emoji: ${{ env.SLACK_ICON }}
```

### Variáveis de Contexto do GitHub

```yaml
- name: 'Send Context Notification'
  uses: samuelBarreto/Action-Slack@main
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
    message: |
      🚀 Deploy do repositório: ${{ github.repository }}
      Branch: ${{ github.ref_name }}
      Commit: ${{ github.sha }}
      Autor: ${{ github.actor }}
      Evento: ${{ github.event_name }}
    channel: '#deployments'
```

## 📥 Inputs

| Input                   | Descrição | Obrigatório    | Padrão  |
|-------------------------|----------------------------|---------|---------------------|
| `webhook-url`           | URL do webhook do Slack    | ✅     | -                   |
| `message`               | Mensagem personalizada     | ❌     | ''                  |
| `channel`               | Canal do Slack             | ❌     | ''                  |
| `username`              | Nome do bot                | ❌     | 'GitHub Action Bot' |
| `icon-emoji`            | Emoji do bot               | ❌     | ':rocket:'          |
| `include-event-details` | Incluir detalhes do evento | ❌     | 'true'              |

## 🎨 Eventos Suportados

A action detecta automaticamente o tipo de evento e ajusta a aparência:

- **Push**: ✅ Verde
- **Pull Request**: 🔀 Azul
- **Issues**: 📝 Laranja
- **Release**: 🚀 Roxo

## 📋 Exemplos de Uso

### 1. Notificação de Deploy

```yaml
- name: 'Notify Deploy'
  uses: samuelBarreto/Action-Slack@main
  if: success()
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
    message: '🎉 Deploy realizado com sucesso!'
    channel: '#deployments'
```

### 2. Notificação de Erro

```yaml
- name: 'Notify Error'
  uses: samuelBarreto/Action-Slack@main
  if: failure()
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
    message: '❌ Falha no pipeline! Verifique os logs.'
    channel: '#alerts'
```

### 3. Notificação de Release

```yaml
- name: 'Notify Release'
  uses: samuelBarreto/Action-Slack@main
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
    message: '🎊 Nova versão lançada!'
    channel: '#releases'
```

## 🔧 Configuração do Webhook

1. **Criar App no Slack**:
   ```bash
   # Acesse: https://api.slack.com/apps
   # Clique em "Create New App"
   # Escolha "From scratch"
   ```

2. **Ativar Webhooks**:
   ```bash
   # No app criado, vá para "Incoming Webhooks"
   # Clique em "Activate Incoming Webhooks"
   # Clique em "Add New Webhook to Workspace"
   # Selecione o canal
   # Copie a URL do webhook
   ```

3. **Adicionar Secret**:
   ```bash
   # No seu repositório GitHub
   # Settings > Secrets and variables > Actions
   # New repository secret
   # Nome: SLACK_WEBHOOK_URL
   # Valor: https://hooks.slack.com/services/...
   ```

## 🔧 Como a Action Funciona

A action segue este processo:

1. **Setup Node.js 18**: Configura o ambiente Node.js
2. **Instala dependências**: Executa `npm install` para instalar pacotes
3. **Compila TypeScript**: Executa `npm run build` para gerar JavaScript
4. **Executa script**: Roda `node dist/test-local-fixed.js` com variáveis de ambiente

> **Nota**: A action usa `npm install` em vez de `npm ci` para maior compatibilidade com diferentes ambientes.

### Variáveis de Ambiente Configuradas:
- `SLACK_WEBHOOK_URL`: URL do webhook (do input)
- `GITHUB_REPOSITORY`: Repositório atual
- `GITHUB_REF_NAME`: Nome da branch/tag
- `GITHUB_SHA`: Hash do commit
- `GITHUB_ACTOR`: Usuário que executou a action
- `GITHUB_EVENT_NAME`: Tipo do evento (push, pull_request, etc.)
- `GITHUB_JOB_STATUS`: Status do job (success/failure)
- `CUSTOM_MESSAGE`: Mensagem personalizada (do input)
- `SLACK_CHANNEL`: Canal do Slack (do input)
- `SLACK_USERNAME`: Nome do bot (do input)
- `SLACK_ICON_EMOJI`: Emoji do bot (do input)
- `INCLUDE_EVENT_DETAILS`: Incluir detalhes do evento (do input)

## 🧪 Teste Local

Para testar localmente, use o script incluído:

```bash
# Configure a variável de ambiente
export SLACK_WEBHOOK_URL="sua-url-do-webhook"

# Execute o teste da action atualizada
npm run test:action

# Ou teste com diferentes eventos
GITHUB_EVENT_NAME=push npm run test:action
GITHUB_EVENT_NAME=pull_request npm run test:action
GITHUB_EVENT_NAME=release npm run test:action
```

O script `test-action.js` simula exatamente o comportamento da action usando curl com arquivo temporário.

### Teste da Versão TypeScript:
```bash
# Desenvolvimento
npm run dev

# Produção (compilado)
npm start
```

## 📝 Licença

MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer um fork do projeto
2. Criar uma branch para sua feature
3. Fazer commit das mudanças
4. Fazer push para a branch
5. Abrir um Pull Request

## 📞 Suporte

Se você encontrar algum problema ou tiver dúvidas:

- Abra uma [Issue](https://github.com/samuelBarreto/Action-Slack/issues)
- Entre em contato: [@samuelBarreto](https://github.com/samuelBarreto)

---

⭐ Se este projeto te ajudou, considere dar uma estrela! 