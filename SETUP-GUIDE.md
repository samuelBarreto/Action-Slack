# 🚀 Guia de Configuração - Slack Notification Action

Este guia mostra como configurar e usar a **Slack Notification Action** em outros repositórios.

## 📋 Pré-requisitos

### 1. Webhook do Slack
1. Acesse [Slack Apps](https://api.slack.com/apps)
2. Clique em "Create New App" → "From scratch"
3. Dê um nome ao app (ex: "GitHub Notifications")
4. Vá para "Incoming Webhooks" → "Activate Incoming Webhooks"
5. Clique em "Add New Webhook to Workspace"
6. Selecione o canal e copie a URL

### 2. Secret no GitHub
1. No seu repositório, vá para **Settings** → **Secrets and variables** → **Actions**
2. Clique em "New repository secret"
3. Nome: `SLACK_WEBHOOK_URL`
4. Valor: Cole a URL do webhook do Slack

## 🛠️ Configuração Rápida

### Passo 1: Criar o Workflow
Crie o arquivo `.github/workflows/slack-notifications.yml`:

```yaml
name: 'Slack Notifications'

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - name: 'Checkout code'
        uses: actions/checkout@v4
      
      - name: 'Send Slack Notification'
        uses: samuelBarreto/Action-Slack@main
        with:
          webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
          message: '🚀 Atividade detectada no repositório!'
          channel: '#general'
          username: 'GitHub Bot'
          icon-emoji: ':rocket:'
```

### Passo 2: Testar
1. Faça um push para a branch `main`
2. Verifique se a notificação chegou no Slack
3. Se não chegou, verifique os logs do workflow

## 📝 Exemplos de Uso

### Exemplo 1: Notificação Simples
```yaml
- name: 'Send Notification'
  uses: samuelBarreto/Action-Slack@main
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
    message: '✅ Deploy realizado com sucesso!'
```

### Exemplo 2: Com Variáveis do GitHub
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
    channel: '#deployments'
```

### Exemplo 3: Notificação Condicional
```yaml
- name: 'Notify Success'
  if: success()
  uses: samuelBarreto/Action-Slack@main
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
    message: '✅ Build realizado com sucesso!'
    channel: '#success'

- name: 'Notify Failure'
  if: failure()
  uses: samuelBarreto/Action-Slack@main
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
    message: '❌ Build falhou! Verifique os logs.'
    channel: '#alerts'
```

## 🔧 Configurações Avançadas

### Variáveis de Ambiente
```yaml
env:
  SLACK_CHANNEL: '#deployments'
  SLACK_USERNAME: 'Deploy Bot'

- name: 'Send Notification'
  uses: samuelBarreto/Action-Slack@main
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
    channel: ${{ env.SLACK_CHANNEL }}
    username: ${{ env.SLACK_USERNAME }}
```

### Workflow Dispatch (Manual)
```yaml
on:
  workflow_dispatch:
    inputs:
      custom_message:
        description: 'Mensagem personalizada'
        required: false
        default: '🚀 Deploy manual!'

jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - name: 'Checkout code'
        uses: actions/checkout@v4
      
      - name: 'Send Manual Notification'
        uses: samuelBarreto/Action-Slack@main
        with:
          webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
          message: ${{ github.event.inputs.custom_message }}
```

## 🎯 Casos de Uso Comuns

### 1. Notificação de Deploy
```yaml
- name: 'Notify Deploy'
  if: success()
  uses: samuelBarreto/Action-Slack@main
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
    message: '🎉 Deploy realizado com sucesso!'
    channel: '#deployments'
```

### 2. Notificação de Release
```yaml
- name: 'Notify Release'
  uses: samuelBarreto/Action-Slack@main
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
    message: |
      🎊 Nova versão lançada!
      Versão: ${{ github.event.release.name }}
      Tag: ${{ github.event.release.tag_name }}
    channel: '#releases'
```

### 3. Notificação de Pull Request
```yaml
- name: 'Notify Pull Request'
  uses: samuelBarreto/Action-Slack@main
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
    message: |
      🔀 Pull Request ${{ github.event.action }}
      Título: ${{ github.event.pull_request.title }}
      Autor: ${{ github.event.pull_request.user.login }}
    channel: '#code-review'
```

## 🔍 Troubleshooting

### Problema: Erro "Dependencies lock file is not found"
**Causa**: O repositório não tem `package-lock.json` e a action está tentando usar cache de dependências.

**Soluções:**
1. **Solução 1**: Use a versão atualizada da action (já corrigida)
2. **Solução 2**: Adicione um `package-lock.json` vazio no repositório
3. **Solução 3**: Use a versão sem cache: `samuelBarreto/Action-Slack@no-cache`

### Problema: Notificação não chega no Slack
**Soluções:**
1. Verifique se o secret `SLACK_WEBHOOK_URL` está configurado
2. Confirme se a URL do webhook está correta
3. Verifique os logs do workflow no GitHub
4. Teste o webhook manualmente com curl

### Problema: Erro de permissão
**Soluções:**
1. Verifique se o app do Slack tem permissão para o canal
2. Confirme se o webhook está ativo
3. Verifique se o canal existe no workspace

### Problema: Action não executa
**Soluções:**
1. Verifique se o arquivo workflow está no local correto
2. Confirme se o trigger está configurado corretamente
3. Verifique se a branch está correta

## 📞 Suporte

Se você encontrar problemas:
- Abra uma [Issue](https://github.com/samuelBarreto/Action-Slack/issues)
- Verifique a documentação completa no [README.md](README.md)
- Teste com o exemplo simples primeiro

---

⭐ **Dica**: Comece com o exemplo simples e depois evolua para configurações mais complexas! 