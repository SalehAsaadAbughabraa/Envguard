const { Command } = require('commander');
const { encrypt } = require('../utils/crypto');
const fs = require('fs');

const encryptCommand = new Command('encrypt');

encryptCommand
  .description('Encrypt a .env file')
  .argument('<inputFile>', 'path to the .env file to encrypt')
  .option('-o, --output <outputFile>', 'output file for encrypted data')
  .action((inputFile, options) => {
    try {
      const password = process.env.ENVGUARD_PASSWORD;
      
      if (!password) {
        console.error('Error: ENVGUARD_PASSWORD environment variable is not set');
        console.log('Example: export ENVGUARD_PASSWORD="your-secret-password"');
        process.exit(1);
      }

      const plaintext = fs.readFileSync(inputFile, 'utf8');
      const encryptedData = encrypt(plaintext, password);
      const outputFile = options.output || `${inputFile}.encrypted`;
      
      fs.writeFileSync(outputFile, encryptedData);
      console.log(`✅ File encrypted successfully: ${outputFile}`);
      
    } catch (error) {
      console.error('❌ Encryption failed:', error.message);
      process.exit(1);
    }
  });

module.exports = encryptCommand;
