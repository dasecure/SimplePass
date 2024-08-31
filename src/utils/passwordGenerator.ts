import CryptoJS from 'crypto-js';

const DERIVE_PASSWORD_PATH = 0x80505744;
const PASSWORD_LENGTH = 20;

export function generatePassword(seed: string, account: string): string {
  const data = seed + account;
  const hash = CryptoJS.SHA256(data);
  
  const derive = [DERIVE_PASSWORD_PATH];
  for (let i = 0; i < 8; i++) {
    derive.push(0x80000000 | (hash.words[i] & 0x7fffffff));
  }

  const seedBuffer = CryptoJS.enc.Utf8.parse(seed + account);
  const hmac = CryptoJS.HmacSHA512(
    derive.map(n => n.toString(16).padStart(8, '0')).join(''),
    seedBuffer
  );
  const entropy = hmac.toString(CryptoJS.enc.Hex);

  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
  let password = '';
  
  for (let i = 0; i < PASSWORD_LENGTH; i++) {
    const index = parseInt(entropy.substr(i * 2, 2), 16) % charset.length;
    password += charset[index];
  }

  return password;
}