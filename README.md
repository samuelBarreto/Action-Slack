# Slack Notification GitHub Action

Uma GitHub Action reutilizável para enviar notificações para o Slack sobre eventos do GitHub.

## 🚀 Características

- ✅ **Reutilizável**: Pode ser usada em qualquer repositório
- 🔧 **Flexível**: Suporte a mensagens personalizadas
- 📊 **Detalhado**: Inclui informações do evento automaticamente
- 🎨 **Customizável**: Cores e emojis diferentes por tipo de evento
- 🔒 **Seguro**: Usa secrets para URLs do webhook

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

## 🧪 Teste Local

Para testar localmente, use o script incluído:

```bash
# Configure a variável de ambiente
export SLACK_WEBHOOK_URL="sua-url-do-webhook"

# Execute o teste
npm run test:fixed
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