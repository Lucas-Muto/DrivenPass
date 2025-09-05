import bcrypt from 'bcrypt';
import Cryptr from 'cryptr';

const cryptr = new Cryptr(process.env.CRYPTR_SECRET!);

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

export function encryptData(data: string): string {
  return cryptr.encrypt(data);
}

export function decryptData(encryptedData: string): string {
  return cryptr.decrypt(encryptedData);
}
