#!/usr/bin/env node

/**
 * Script de teste local corrigido que usa arquivo temporário
 * Execute: npx ts-node test-local-fixed.ts
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

// Interfaces TypeScript
interface GitHubData {
  repository: string;
  ref_name: string;
  sha: string;
  actor: string;
  event_name: string;
  job_status: string;
}

interface SlackField {
  title: string;
  value: string;
  short: boolean;
}

interface SlackAttachment {
  color: string;
  title: string;
  fields: SlackField[];
  footer: string;
  ts: number;
}

interface SlackMessage {
  text: string;
  attachments?: SlackAttachment[];
  username?: string;
  icon_emoji?: string;
  channel?: string;
}

// Configuração do webhook e variáveis
const SLACK_WEBHOOK_URL: string = process.env['SLACK_WEBHOOK_URL'] || '';
const CUSTOM_MESSAGE: string = process.env['CUSTOM_MESSAGE'] || '';
const SLACK_CHANNEL: string = process.env['SLACK_CHANNEL'] || '';
const SLACK_USERNAME: string = process.env['SLACK_USERNAME'] || 'GitHub Action Bot';
const SLACK_ICON_EMOJI: string = process.env['SLACK_ICON_EMOJI'] || ':rocket:';
const INCLUDE_EVENT_DETAILS: string = process.env['INCLUDE_EVENT_DETAILS'] || 'true';

// Dados do GitHub (com variáveis de ambiente)
const githubData: GitHubData = {
  repository: process.env['GITHUB_REPOSITORY'] || 'seu-usuario/seu-repositorio',
  ref_name: process.env['GITHUB_REF_NAME'] || 'main',
  sha: process.env['GITHUB_SHA'] || 'abc123def456',
  actor: process.env['GITHUB_ACTOR'] || 'seu-usuario',
  event_name: process.env['GITHUB_EVENT_NAME'] || 'push',
  job_status: process.env['GITHUB_JOB_STATUS'] || 'success'
};

// Cria a mensagem usando variáveis
const message: SlackMessage = {
  text: CUSTOM_MESSAGE || "🧪 GitHub Action - Slack Notification",
  username: SLACK_USERNAME,
  icon_emoji: SLACK_ICON_EMOJI
};

// Adiciona canal se especificado
if (SLACK_CHANNEL) {
  message.channel = SLACK_CHANNEL;
}

// Adiciona attachments se incluir detalhes do evento
if (INCLUDE_EVENT_DETAILS === 'true') {
  message.attachments = [
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
      footer: "GitHub Action do Slack",
      ts: Math.floor(Date.now() / 1000)
    }
  ];
}

// Função para enviar mensagem via curl usando arquivo temporário
function sendSlackMessage(): void {
  try {
    console.log('🧪 Teste Local - GitHub Action do Slack\n');
    console.log('📡 Enviando mensagem para o Slack...');
    console.log('URL:', SLACK_WEBHOOK_URL);
    console.log('');
    
    // Cria arquivo temporário com a mensagem JSON
    const tempFile: string = path.join(process.cwd(), 'temp_message.json');
    fs.writeFileSync(tempFile, JSON.stringify(message, null, 2));
    
    console.log('📄 Arquivo temporário criado:', tempFile);
    console.log('📋 Conteúdo do arquivo:');
    console.log(JSON.stringify(message, null, 2));
    console.log('');
    
    // Comando curl usando arquivo
    const curlCommand: string = `curl -X POST -H 'Content-type: application/json' --data @${tempFile} ${SLACK_WEBHOOK_URL}`;
    
    console.log('Comando curl:');
    console.log(curlCommand);
    console.log('');
    
    const result: string = execSync(curlCommand, { encoding: 'utf8' });
    
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
    console.error('❌ Erro ao enviar mensagem:', (error as Error).message);
  }
}

// Executa o teste
sendSlackMessage(); 