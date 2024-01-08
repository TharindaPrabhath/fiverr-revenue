import {
  randomBytes,
  createCipheriv,
  createDecipheriv,
  createHmac,
} from "crypto";

export class CryptoLib {
  private IV_LENGTH: number;
  private ENCRYPTION_KEY: string;

  constructor(ENCRYPTION_KEY_IN: string) {
    this.IV_LENGTH = 16;
    this.ENCRYPTION_KEY = ENCRYPTION_KEY_IN;
  }

  encrypt(text: string) {
    let iv = randomBytes(this.IV_LENGTH);
    const bufferedValue = Buffer.from(this.ENCRYPTION_KEY);
    let cipher = createCipheriv("aes-256-cbc", bufferedValue, iv);
    let encrypted = cipher.update(text);

    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return iv.toString("hex") + ":" + encrypted.toString("hex");
  }

  encryptHMAC(data: string, secret: string) {
    let hmac = createHmac("sha256", secret);
    hmac.update(data);
    return hmac.digest("base64");
  }

  decrypt(text: string) {
    let textParts = text.split(":");
    let iv = Buffer.from(textParts.shift(), "hex");
    let encryptedText = Buffer.from(textParts.join(":"), "hex");
    let decipher = createDecipheriv(
      "aes-256-cbc",
      Buffer.from(this.ENCRYPTION_KEY),
      iv
    );
    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
  }

  randomBytes(length: number) {
    return randomBytes(64)
      .toString("base64")
      .replace(/[^A-Z0-9]/g, "")
      .substring(0, length);
  }
}
