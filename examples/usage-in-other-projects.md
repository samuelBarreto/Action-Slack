# Como Usar a Action em Outros Projetos

Este guia mostra como usar a Slack Notification Action em seus próprios projetos.

## 🚀 Configuração Rápida

### 1. Configure o Webhook do Slack

Primeiro, você precisa de um webhook do Slack:

1. Vá para [Slack Apps](https://api.slack.com/apps)
2. Crie um novo app ou use um existente
3. Ative "Incoming Webhooks"
4. Crie um webhook para o canal desejado
5. Copie a URL do webhook

### 2. Adicione o Secret no GitHub

No seu repositório:

1. Vá para **Settings** > **Secrets and variables** > **Actions**
2. Clique em **New repository secret**
3. Nome: `SLACK_WEBHOOK_URL`
4. Valor: Cole a URL do webhook

### 3. Crie o Workflow

Crie o arquivo `.github/workflows/slack-notification.yml`:

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

## 📋 Exemplos de Uso

### Exemplo 1: Notificação de Deploy

```yaml
name: 'Deploy and Notify'

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: 'Checkout code'
        uses: actions/checkout@v4
      
      - name: 'Deploy to production'
        run: echo "Deploying to production..."
      
      - name: 'Notify Success'
        if: success()
        uses: samuelBarreto/Action-Slack@main
        with:
          webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
          message: '🎉 Deploy realizado com sucesso! A aplicação está no ar.'
          channel: '#deployments'
          username: 'Deploy Bot'
          icon-emoji: ':rocket:'
      
      - name: 'Notify Failure'
        if: failure()
        uses: samuelBarreto/Action-Slack@main
        with:
          webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
          message: '❌ Falha no deploy! Verifique os logs.'
          channel: '#alerts'
          username: 'Alert Bot'
          icon-emoji: ':warning:'
```

### Exemplo 2: Notificação de Pull Request

```yaml
name: 'PR Notifications'

on:
  pull_request:
    types: [ opened, closed, reopened ]

jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - name: 'Notify PR Event'
        uses: samuelBarreto/Action-Slack@main
        with:
          webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
          channel: '#code-review'
          username: 'PR Bot'
          icon-emoji: ':pull_request:'
```

### Exemplo 3: Notificação de Release

```yaml
name: 'Release Notifications'

on:
  release:
    types: [ published ]

jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - name: 'Notify Release'
        uses: samuelBarreto/Action-Slack@main
        with:
          webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
          message: '🎊 Nova versão lançada!'
          channel: '#releases'
          username: 'Release Bot'
          icon-emoji: ':package:'
```

### Exemplo 4: Notificação de Issues

```yaml
name: 'Issue Notifications'

on:
  issues:
    types: [ opened, closed, reopened ]

jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - name: 'Notify Issue Event'
        uses: samuelBarreto/Action-Slack@main
        with:
          webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
          channel: '#issues'
          username: 'Issue Bot'
          icon-emoji: ':bug:'
```

## 🔧 Configurações Avançadas

### Usando Tags Específicas

Para usar uma versão específica da action:

```yaml
- name: 'Send Slack Notification'
  uses: samuelBarreto/Action-Slack@v1.0.0  # Use uma tag específica
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
```

### Múltiplos Canais

Para enviar para diferentes canais baseado no evento:

```yaml
- name: 'Notify Main Channel'
  uses: samuelBarreto/Action-Slack@main
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
    channel: '#general'

- name: 'Notify Dev Channel'
  uses: samuelBarreto/Action-Slack@main
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
    channel: '#dev-team'
    message: '🔧 Atividade de desenvolvimento detectada'
```

### Condições Personalizadas

```yaml
- name: 'Notify on Success'
  if: success() && github.ref == 'refs/heads/main'
  uses: samuelBarreto/Action-Slack@main
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
    message: '✅ Pipeline principal executado com sucesso!'

- name: 'Notify on Failure'
  if: failure() && github.ref == 'refs/heads/main'
  uses: samuelBarreto/Action-Slack@main
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
    message: '❌ Pipeline principal falhou!'
```

## 🎨 Personalização de Mensagens

### Usando Variáveis do GitHub

```yaml
- name: 'Send Custom Message'
  uses: samuelBarreto/Action-Slack@main
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
    message: |
      🚀 Deploy realizado!
      
      **Repositório:** ${{ github.repository }}
      **Branch:** ${{ github.ref_name }}
      **Autor:** ${{ github.actor }}
      **Commit:** ${{ github.sha }}
```

### Mensagens Condicionais

```yaml
- name: 'Send Conditional Message'
  uses: samuelBarreto/Action-Slack@main
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
    message: ${{ github.event_name == 'push' && '🚀 Novo código enviado!' || '📝 Pull Request atualizado!' }}
```

## 🔒 Segurança

### Usando Secrets Organizacionais

Para usar em múltiplos repositórios da organização:

1. Vá para **Settings** da organização
2. **Secrets and variables** > **Actions**
3. Crie um secret `SLACK_WEBHOOK_URL`
4. Use no workflow:

```yaml
- name: 'Send Slack Notification'
  uses: samuelBarreto/Action-Slack@main
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
```

### Múltiplos Webhooks

Para diferentes tipos de notificação:

```yaml
- name: 'Notify General'
  uses: samuelBarreto/Action-Slack@main
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK_URL_GENERAL }}

- name: 'Notify Alerts'
  uses: samuelBarreto/Action-Slack@main
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK_URL_ALERTS }}
    channel: '#alerts'
```

## 🧪 Testando

### Teste Local

1. Clone o repositório da action
2. Configure a variável de ambiente:
   ```bash
   export SLACK_WEBHOOK_URL="sua-url-do-webhook"
   ```
3. Execute o teste:
   ```bash
   npm run test:action
   ```

### Teste no GitHub

1. Faça um push para testar
2. Vá para a aba Actions
3. Verifique se a notificação chegou no Slack

## 📞 Suporte

Se você tiver problemas:

1. Verifique se o webhook está configurado corretamente
2. Confirme se o secret está definido
3. Verifique os logs da action
4. Abra uma issue no repositório da action

---

Agora você está pronto para usar a Slack Notification Action em seus projetos! 🎉 