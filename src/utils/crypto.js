const crypto = require('crypto');

const ALGORITHM = 'aes-256-gcm';
const KEY_LENGTH = 32;
const IV_LENGTH = 12;

function encrypt(plaintext, password) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const key = crypto.scryptSync(password, iv.toString('hex'), KEY_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  let encrypted = cipher.update(plaintext, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag();
  return iv.toString('hex') + encrypted + authTag.toString('hex');
}

module.exports = { encrypt };
