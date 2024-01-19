// import * as AWS from "aws-sdk";

import { CognitoIdentityProvider as CognitoIdentityServiceProvider } from "@aws-sdk/client-cognito-identity-provider";
import { GetSecretValueCommand, SecretsManager, SecretsManagerClient } from "@aws-sdk/client-secrets-manager";
import { Connect } from "@aws-sdk/client-connect";

export class AWSSDK {

  private secrets: any;
  //cognitoidentityserviceprovider
  private cognitoISP: any;

  constructor() {
    this.loadAWSServices();
  }

  loadAWSServices() {
    this.loadSecretsManager();
    this.loadCognitoISP();
  }

  loadSecretsManager() {
    this.secrets = new SecretsManagerClient({
      apiVersion: "2017-10-17",
      region: "us-east-1",
    });
  }

  loadCognitoISP() {
    this.cognitoISP = new CognitoIdentityServiceProvider({
      apiVersion: "2016-04-18",
      region: "us-east-1",
    });
  }

  async loadSecrets() {
    const AWS_SECRET_NAMESPACE_PREFIX = "/pnp-services-";
    
    let env = process.env.NODE_ENV ? process.env.NODE_ENV : "local";

    if (process.env.NODE_ENV === "collab") env = "local";
    //if (process.env.NODE_ENV === "collab") return;
    if (env === "local") return {};
    let configParams = {
      SecretId: AWS_SECRET_NAMESPACE_PREFIX + env + "/config",
    };

    const command = new GetSecretValueCommand(configParams);

    try {
      const data = await this.secrets.send(command);
      return JSON.parse(data.SecretString); // For unit tests.
    } catch (err) {
      console.log("err", err);
    }

  }

  async loadChatSession() {
    const client = new Connect({
      region: "us-east-1",
    });

    let startChat = client
      .startChatContact({
        ContactFlowId: "07b6c1ce-7bae-489a-8d6e-976bc21cbe3b",
        InstanceId: "cc2cc6f4-1510-42d9-9c13-1a9abe069429",
        ParticipantDetails: {
          DisplayName: "John Doe",
        },
      });

    return startChat.then((chatConfig) => {
      return chatConfig;
    });
  }
}
