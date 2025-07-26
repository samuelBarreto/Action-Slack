#!/usr/bin/env node

/**
 * Script de teste para a GitHub Action
 * Simula o comportamento da action localmente
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuração do webhook
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL || '';

if (!SLACK_WEBHOOK_URL) {
  console.error('❌ Erro: SLACK_WEBHOOK_URL não configurada');
  console.log('Configure a variável de ambiente: export SLACK_WEBHOOK_URL="sua-url"');
  process.exit(1);
}

// Simular contexto do GitHub
const mockContext = {
  eventName: process.env.GITHUB_EVENT_NAME || 'push',
  repo: {
    owner: process.env.GITHUB_REPOSITORY_OWNER || 'samuelBarreto',
    repo: process.env.GITHUB_REPOSITORY_NAME || 'Action-Slack'
  },
  actor: process.env.GITHUB_ACTOR || 'samuelBarreto',
  sha: process.env.GITHUB_SHA || 'abc123def456',
  ref: process.env.GITHUB_REF || 'refs/heads/main'
};

// Função para determinar status baseado no evento
function getEventStatus(eventName) {
  switch (eventName) {
    case 'pull_request':
      return { status: 'pull_request', color: '#0066cc', emoji: '🔀' };
    case 'issues':
      return { status: 'issue', color: '#ff9500', emoji: '📝' };
    case 'release':
      return { status: 'release', color: '#6f42c1', emoji: '🚀' };
    default:
      return { status: 'success', color: '#36a64f', emoji: '✅' };
  }
}

// Função para criar mensagem (mesmo formato da action)
function createMessage(options = {}) {
  const {
    customMessage = '',
    channel = '',
    username = 'GitHub Action Bot',
    iconEmoji = ':rocket:',
    includeEventDetails = true
  } = options;

  const eventStatus = getEventStatus(mockContext.eventName);
  
  let message = {
    username: username,
    icon_emoji: iconEmoji
  };

  if (channel) {
    message.channel = channel;
  }

  if (customMessage) {
    message.text = customMessage;
  } else {
    message.text = `${eventStatus.emoji} GitHub Action - ${mockContext.eventName}`;
    
    if (includeEventDetails) {
      message.attachments = [{
        color: eventStatus.color,
        title: `Evento: ${mockContext.eventName}`,
        fields: [
          {
            title: 'Repositório',
            value: `${mockContext.repo.owner}/${mockContext.repo.repo}`,
            short: true
          },
          {
            title: 'Branch/Ref',
            value: mockContext.ref.replace('refs/heads/', '').replace('refs/tags/', ''),
            short: true
          },
          {
            title: 'Autor',
            value: mockContext.actor,
            short: true
          },
          {
            title: 'Commit',
            value: mockContext.sha.substring(0, 8),
            short: true
          }
        ],
        footer: 'GitHub Action do Slack',
        ts: Math.floor(Date.now() / 1000)
      }];
    }
  }

  return message;
}

// Função para enviar mensagem
async function sendSlackMessage(message) {
  try {
    const response = await fetch(SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    });

    if (response.ok) {
      console.log('✅ Mensagem enviada com sucesso!');
      return true;
    } else {
      console.error(`❌ Erro ao enviar mensagem: ${response.status} ${response.statusText}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Erro ao enviar mensagem: ${error.message}`);
    return false;
  }
}

// Função principal de teste
async function testAction() {
  console.log('🧪 Testando GitHub Action do Slack\n');
  
  // Teste 1: Mensagem básica
  console.log('📋 Teste 1: Mensagem básica');
  const basicMessage = createMessage();
  console.log('Mensagem:', JSON.stringify(basicMessage, null, 2));
  await sendSlackMessage(basicMessage);
  console.log('');

  // Teste 2: Mensagem personalizada
  console.log('📋 Teste 2: Mensagem personalizada');
  const customMessage = createMessage({
    customMessage: '🧪 Teste da Action - Mensagem personalizada',
    channel: '#testes',
    username: 'Test Bot',
    iconEmoji: ':test_tube:'
  });
  console.log('Mensagem:', JSON.stringify(customMessage, null, 2));
  await sendSlackMessage(customMessage);
  console.log('');

  // Teste 3: Sem detalhes do evento
  console.log('📋 Teste 3: Sem detalhes do evento');
  const simpleMessage = createMessage({
    includeEventDetails: false
  });
  console.log('Mensagem:', JSON.stringify(simpleMessage, null, 2));
  await sendSlackMessage(simpleMessage);
  console.log('');

  console.log('🎉 Testes concluídos!');
  console.log('\n📋 Próximos passos:');
  console.log('1. Verifique se as mensagens chegaram no Slack');
  console.log('2. Configure o secret SLACK_WEBHOOK_URL no GitHub');
  console.log('3. Teste a action em um repositório real');
}

// Executar teste
testAction().catch(console.error); 