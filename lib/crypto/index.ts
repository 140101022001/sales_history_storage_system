import { createCipheriv, createDecipheriv } from 'crypto';

const algorithm = 'aes-256-cbc';
const key = '6efc98d3061e86bf132f6231bce685b03c54ddc38c5802222f52901c95a8e554';
const iv = '346be68b2e11e28f763eef4fd4c6f7b5';

const enCryptData = (data: string) => {
    const cipher = createCipheriv(
        algorithm,
        Buffer.from(key, 'hex'),
        Buffer.from(iv, 'hex'),
    );

    let encryptedData = cipher.update(data, 'utf8', 'hex');
    encryptedData += cipher.final('hex');
    return encryptedData;
}

const deCryptData = (data: string) => {
    try {
        const decipher = createDecipheriv(
            algorithm,
            Buffer.from(key, 'hex'),
            Buffer.from(iv, 'hex'),
        );
        let decryptedData = decipher.update(data, 'hex', 'utf8');
        decryptedData += decipher.final('utf8');
        return decryptedData;
    } catch (error) {
        console.log(error);
        throw error
    }
}

export {enCryptData, deCryptData}