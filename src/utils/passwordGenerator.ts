import CryptoJS from 'crypto-js';

const DERIVE_PASSWORD_PATH = 0x80505744;

export interface PasswordOptions {
  length: number;
  useUppercase: boolean;
  useLowercase: boolean;
  useNumbers: boolean;
  useSpecialChars: boolean;
}

export function generatePassword(seed: string, account: string, options: PasswordOptions): string {
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

  let charset = '';
  if (options.useUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (options.useLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
  if (options.useNumbers) charset += '0123456789';
  if (options.useSpecialChars) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

  if (charset === '') {
    throw new Error('At least one character set must be selected');
  }

  let password = '';
  
  for (let i = 0; i < options.length; i++) {
    const index = parseInt(entropy.substr(i * 2, 2), 16) % charset.length;
    password += charset[index];
  }

  return password;
}