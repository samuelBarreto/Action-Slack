#!/usr/bin/env node

/**
 * Script de teste local corrigido que usa arquivo temporário
 * Execute: node test-local-fixed.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuração do webhook (do seu test.yaml)
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL || '';

// Dados simulados do GitHub
const githubData = {
  repository: process.env.GITHUB_REPOSITORY || 'seu-usuario/seu-repositorio',
  ref_name: process.env.GITHUB_REF_NAME || 'main',
  sha: process.env.GITHUB_SHA || 'abc123def456',
  actor: process.env.GITHUB_ACTOR || 'seu-usuario',
  event_name: process.env.GITHUB_EVENT_NAME || 'push',
  job_status: process.env.GITHUB_JOB_STATUS || 'success'
};

// Cria a mensagem (mesmo formato do GitHub Action)
const message = {
  text: "🧪 Teste Local - GitHub Action do Slack",
  attachments: [
    {
      color: githubData.job_status === 'success' ? "#36a64f" : "#ff0000",
      title: `GitHub Action - ${githubData.event_name}`,
      fields: [
        {
          title: "Repositório",
          value: githubData.repository,
          short: true
        },
        {
          title: "Branch",
          value: githubData.ref_name,
          short: true
        },
        {
          title: "Autor",
          value: githubData.actor,
          short: true
        },
        {
          title: "Status",
          value: githubData.job_status,
          short: true
        },
        {
          title: "Commit",
          value: githubData.sha.substring(0, 8),
          short: true
        },
        {
          title: "Evento",
          value: githubData.event_name,
          short: true
        }
      ],
      footer: "GitHub Action do Slack - Teste Local",
      ts: Math.floor(Date.now() / 1000)
    }
  ]
};

// Função para enviar mensagem via curl usando arquivo temporário
function sendSlackMessage() {
  try {
    console.log('🧪 Teste Local - GitHub Action do Slack\n');
    console.log('📡 Enviando mensagem para o Slack...');
    console.log('URL:', SLACK_WEBHOOK_URL);
    console.log('');
    
    // Cria arquivo temporário com a mensagem JSON
    const tempFile = path.join(process.cwd(), 'temp_message.json');
    fs.writeFileSync(tempFile, JSON.stringify(message, null, 2));
    
    console.log('📄 Arquivo temporário criado:', tempFile);
    console.log('📋 Conteúdo do arquivo:');
    console.log(JSON.stringify(message, null, 2));
    console.log('');
    
    // Comando curl usando arquivo
    const curlCommand = `curl -X POST -H 'Content-type: application/json' --data @${tempFile} ${SLACK_WEBHOOK_URL}`;
    
    console.log('Comando curl:');
    console.log(curlCommand);
    console.log('');
    
    const result = execSync(curlCommand, { encoding: 'utf8' });
    
    // Remove arquivo temporário
    fs.unlinkSync(tempFile);
    console.log('🗑️ Arquivo temporário removido');
    console.log('');
    
    if (result.trim() === 'ok') {
      console.log('✅ Mensagem enviada com sucesso!');
      console.log('📨 Resposta:', result.trim());
    } else {
      console.log('⚠️ Resposta inesperada:', result);
    }
    
    console.log('\n📋 Próximos passos:');
    console.log('1. Verifique se a mensagem chegou no Slack');
    console.log('2. Configure o secret SLACK_WEBHOOK_URL no GitHub');
    console.log('3. Teste o GitHub Action fazendo um push ou PR');
    
  } catch (error) {
    console.error('❌ Erro ao enviar mensagem:', error.message);
  }
}

// Executa o teste
sendSlackMessage(); 