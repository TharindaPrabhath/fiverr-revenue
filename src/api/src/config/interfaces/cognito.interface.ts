export interface Cognito {
  pool_id: string;
  region: string;
  pool_arn: string;
  domain: string;
}

export interface CognitoUser {
  UserPoolId: string;
  Username?: string;
  ClientMetadata?: {
    [key: string]: string;
  };
  DesiredDeliveryMediums?: string;
  TemporaryPassword?: string;
  UserAttributes?: {
    [key: string]: string;
  };
}

export interface CognitoUserAttributes {
  Name: string;
  Value: string;
}
