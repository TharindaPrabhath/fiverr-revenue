import { Injectable } from "@nestjs/common";
import { AWSService } from "src/config/aws/aws.service";
import { CryptoLib } from "./crypto.sdk";

@Injectable()
export class CryptoService {
  private encryptionKey: string;
  private hmacSecret: string;
  private cryptoLib: any;

  constructor(awsService: AWSService) {
    this.encryptionKey = awsService.getSecretValue("crypto_enc_key");
    this.cryptoLib = new CryptoLib(this.encryptionKey);
  }

  getEncryptionKey(): string {
    return this.encryptionKey;
  }

  encrypt(text: string) {
    return this.cryptoLib.encrypt(text);
  }

  decrypt(text: string) {
    return this.cryptoLib.decrypt(text);
  }

  encryptHMAC(text: string) {
    return this.cryptoLib.encryptHMAC(text, this.hmacSecret);
  }
}
