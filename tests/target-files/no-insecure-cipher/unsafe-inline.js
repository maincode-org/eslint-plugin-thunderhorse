const key = Buffer.from(crypto.randomBytes(16));
const iv = crypto.randomBytes(12);

crypto.createCipheriv('DES', key, iv);
