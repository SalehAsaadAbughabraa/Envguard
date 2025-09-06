#!/usr/bin/env node

const { Command } = require('commander');
const encryptCommand = require('./commands/encrypt');

const program = new Command();

program
  .name('envguard')
  .description('🛡️  A CLI tool to encrypt and securely share your .env files')
  .version('1.0.0');

program.addCommand(encryptCommand);

program.parse();
