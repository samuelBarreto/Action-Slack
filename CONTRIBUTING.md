# Contribuindo para a Slack Notification Action

Obrigado por considerar contribuir para este projeto! 🎉

## 🚀 Como Contribuir

### 1. Fork e Clone

```bash
# Faça um fork do repositório
# Clone o seu fork
git clone https://github.com/samuelBarreto/Action-Slack.git
cd Action-Slack
```

### 2. Instale as Dependências

```bash
npm install
```

### 3. Configure o Ambiente de Teste

```bash
# Configure a variável de ambiente para testes
export SLACK_WEBHOOK_URL="sua-url-do-webhook"

# Teste a action localmente
npm run test:action
```

### 4. Faça suas Mudanças

- Crie uma branch para sua feature: `git checkout -b feature/nova-funcionalidade`
- Faça suas mudanças
- Teste localmente
- Commit suas mudanças: `git commit -m "feat: adiciona nova funcionalidade"`

### 5. Envie um Pull Request

```bash
git push origin feature/nova-funcionalidade
# Crie um Pull Request no GitHub
```

## 📋 Diretrizes de Contribuição

### Commits

Use o padrão [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` para novas funcionalidades
- `fix:` para correções de bugs
- `docs:` para documentação
- `style:` para formatação
- `refactor:` para refatoração
- `test:` para testes
- `chore:` para tarefas de manutenção

### Código

- Mantenha o código limpo e bem documentado
- Adicione comentários quando necessário
- Siga as convenções de nomenclatura do JavaScript
- Teste suas mudanças antes de enviar

### Documentação

- Atualize o README.md se necessário
- Adicione exemplos de uso
- Documente novas funcionalidades

## 🧪 Testando

### Teste Local

```bash
# Teste básico
npm run test:fixed

# Teste da action
npm run test:action

# Teste com diferentes eventos
GITHUB_EVENT_NAME=pull_request npm run test:action
GITHUB_EVENT_NAME=release npm run test:action
```

### Teste da Action

1. Faça push das suas mudanças
2. Vá para a aba Actions no GitHub
3. Execute o workflow "Test Action"
4. Verifique se as notificações chegaram no Slack

## 🐛 Reportando Bugs

Se você encontrar um bug:

1. Verifique se já existe uma issue sobre isso
2. Crie uma nova issue com:
   - Descrição clara do problema
   - Passos para reproduzir
   - Comportamento esperado vs atual
   - Screenshots se aplicável

## 💡 Sugerindo Melhorias

Para sugerir melhorias:

1. Crie uma issue com a tag "enhancement"
2. Descreva a funcionalidade desejada
3. Explique o benefício da mudança
4. Se possível, implemente a funcionalidade

## 📝 Checklist do Pull Request

Antes de enviar um PR, verifique:

- [ ] Código funciona corretamente
- [ ] Testes passam
- [ ] Documentação atualizada
- [ ] Commits seguem o padrão conventional
- [ ] Não há conflitos
- [ ] Código está limpo e bem formatado

## 🎯 Áreas para Contribuição

### Funcionalidades

- [ ] Suporte a mais tipos de eventos
- [ ] Templates de mensagem personalizáveis
- [ ] Integração com outros serviços
- [ ] Suporte a threads do Slack
- [ ] Notificações condicionais

### Melhorias

- [ ] Melhor tratamento de erros
- [ ] Logs mais detalhados
- [ ] Performance otimizada
- [ ] Mais opções de customização

### Documentação

- [ ] Mais exemplos de uso
- [ ] Guia de troubleshooting
- [ ] FAQ
- [ ] Vídeos tutoriais

## 🤝 Código de Conduta

- Seja respeitoso e inclusivo
- Ajude outros contribuidores
- Mantenha discussões construtivas
- Siga as diretrizes da comunidade

## 📞 Suporte

Se você tiver dúvidas:

- Abra uma issue
- Entre em contato: [@samuelBarreto](https://github.com/samuelBarreto)
- Consulte a documentação

---

Obrigado por contribuir! 🙏 