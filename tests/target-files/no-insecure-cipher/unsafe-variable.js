const cipher = 'DES';
const key = Buffer.from(crypto.randomBytes(16));
const iv = crypto.randomBytes(12);

crypto.createCipheriv(cipher, key, iv);
