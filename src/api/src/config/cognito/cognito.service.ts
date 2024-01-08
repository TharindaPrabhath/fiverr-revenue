import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { AWSService } from "src/config/aws/aws.service";
import {
  Cognito,
  CognitoUser,
  CognitoUserAttributes,
  Clients,
  Client,
  Endpoints,
} from "@config/interfaces";
import { stringify } from "querystring";
import { HttpService } from "@nestjs/axios";
import { CognitoJwtVerifier } from "aws-jwt-verify";
// import { User } from "@modules/users/entities/user.entity";
// import {
//   CONFIRMATION_EMAIL_SUBJECT,
//   FORGOT_PASSWORD_EMAIL_SUBJECT,
// } from "@config/constants";
var crypto = require("crypto");

@Injectable()
export class CognitoService {
  private logger: any;
  private poolId: string;
  private region: string;
  // private poolARN: string;
  // private domain: string;
  private cognitoConfig: Cognito;
  private clients: Clients;
  private baseURL: string = "auth.us-east-1.amazoncognito.com";
  private endpoints: Endpoints = {
    authorization: "/oauth2/authorize",
    token: "/oauth2/token",
  };
  private cognitoISP: any;
  private defaultParams: CognitoUser;
  private params: any;

  constructor(
    private readonly awsService: AWSService,
    private readonly http: HttpService
  ) {
    this.logger = new Logger("CognitoService");
    this.cognitoConfig = awsService.getCognitoValue();
    this.clients = awsService.getClients();
    this.poolId = this.cognitoConfig.pool_id;
    this.region = this.cognitoConfig.region;
    // this.poolARN = this.cognitoConfig.pool_arn;
    // this.domain = this.cognitoConfig.domain;
    this.cognitoISP = awsService.getCognitoISP();

    this.defaultParams = {
      UserPoolId: this.poolId,
    };

    this.params = {};
  }

  getSESService() {

  }

  getParams() {
    return {
      UserPoolId: this.poolId,
      ...this.params,
    };
  }

  addParam(key: string, value: any) {
    this.params[key] = value;
  }

  /**
   * 
   * @param user 
   * @returns {
        User: {
          Username: 'john.doe@dj.com',
          Attributes: [ [Object], [Object], [Object] ],
          UserCreateDate: 2023-02-02T18:09:24.332Z,
          UserLastModifiedDate: 2023-02-02T18:09:24.332Z,
          Enabled: true,
          UserStatus: 'FORCE_CHANGE_PASSWORD'
        }
      }
   */
  // async addUser(user?: User): Promise<any> {
  //   this.params = {};
  //   this.addParam("Username", user.username);
  //   this.addParam("ClientMetadata", {
  //     TemporaryPassword: user.confirmationCode,
  //     SubjectLine: CONFIRMATION_EMAIL_SUBJECT,
  //     BaseUrl: this.awsService.getUserInterfaceUrl(),
  //   });
  //   this.addParam("DesiredDeliveryMediums", ["EMAIL"]);
  //   this.addParam("TemporaryPassword", user.confirmationCode);
  //   this.addParam("UserAttributes", [
  //     {
  //       Name: "email",
  //       Value: user.email,
  //     },
  //     {
  //       Name: "name",
  //       Value: `${user.firstName} ${user.lastName}`,
  //     },
  //   ]);

  //   return new Promise((resolve, reject) => {
  //     this.cognitoISP.adminCreateUser(this.getParams(), function (err, data) {
  //       if (err) {
  //         console.log(err);
  //         console.log(err.stack);
  //         reject(err);
  //       }
  //       // an error occurred
  //       else {
  //         console.log(data); // successful response
  //         resolve(data);
  //       }
  //     });
  //   });
  // }

  // async updateUserAttributes(
  //   username: string,
  //   attributes: CognitoUserAttributes[]
  // ): Promise<any> {
  //   this.params = {};
  //   this.addParam("UserAttributes", attributes);
  //   this.addParam("Username", username);

  //   return new Promise((resolve, reject) => {
  //     this.cognitoISP.adminUpdateUserAttributes(
  //       this.getParams(),
  //       (err, data) => {
  //         if (err) {
  //           console.log(err, err.stack);
  //           reject(err);
  //         }
  //         // an error occurred
  //         else {
  //           console.log(data); // successful response
  //           resolve(data);
  //         }
  //       }
  //     );
  //   });
  // }

  // async setUserPassword(username: string, password: string): Promise<any> {
  //   this.params = {};
  //   this.addParam("Password", password);
  //   this.addParam("Username", username);
  //   this.addParam("Permanent", true);

  //   return new Promise((resolve, reject) => {
  //     this.cognitoISP.adminSetUserPassword(this.getParams(), (err, data) => {
  //       if (err) {
  //         console.log(err, err.stack);
  //         reject(err);
  //       }
  //       // an error occurred
  //       else {
  //         console.log(data); // successful response
  //         resolve(data);
  //       }
  //     });
  //   });
  // }

  getSecretHash(username: string, clientName: string) {
    return crypto
      .createHmac("sha256", this.getClientByName(clientName).secret)
      .update(username + this.getClientByName(clientName).id)
      .digest("base64");
  }

  // async forgotPassword(user: User) {
  //   this.params = {};
  //   this.addParam("ClientId", this.getClientByName("cpp").id);
  //   this.addParam("Username", user.username);
  //   this.addParam("SecretHash", this.getSecretHash(user.username, "cpp"));

  //   this.addParam("ClientMetadata", {
  //     SubjectLine: FORGOT_PASSWORD_EMAIL_SUBJECT,
  //     BaseUrl: this.awsService.getUserInterfaceUrl(),
  //     email: user.email,
  //     name: `${user.firstName} ${user.lastName}`,
  //   });

  //   return new Promise((resolve, reject) => {
  //     this.cognitoISP.forgotPassword(this.params, (err, data) => {
  //       if (err) {
  //         console.log(err, err.stack);
  //         reject(err);
  //       }
  //       // an error occurred
  //       else {
  //         console.log(`data from forgotPassword`); // successful response
  //         console.log(data); // successful response
  //         resolve(data);
  //       }
  //     });
  //   });
  // }

  async confirmForgotPassword(
    username: string,
    password: string,
    confirmationCode: string
  ) {
    this.params = {};
    this.addParam("ClientId", this.getClientByName("cpp").id);
    this.addParam("Password", password);
    this.addParam("ConfirmationCode", confirmationCode);
    this.addParam("Username", username);
    this.addParam("SecretHash", this.getSecretHash(username, "cpp"));

    return new Promise((resolve, reject) => {
      this.cognitoISP.confirmForgotPassword(this.params, (err, data) => {
        if (err) {
          console.log(err, err.stack);
          reject(err);
        }
        // an error occurred
        else {
          console.log(`data from confirmForgotPassword`); // successful response
          console.log(data); // successful response
          resolve(data);
        }
      });
    });
  }

  // async loginUser(
  //   username: string,
  //   password: string,
  //   authFlow: string = "ADMIN_NO_SRP_AUTH"
  // ): Promise<any> {
  //   this.params = {};
  //   this.addParam("AuthFlow", authFlow);
  //   // if (this.awsService.getEnv() === "local")
  //   //   this.addParam("ClientId", this.getClientByName("cpplocal").id);
  //   // else this.addParam("ClientId", this.getClientByName("cpp").id);
  //   this.addParam("ClientId", this.getClientByName("cpp").id);
  //   this.addParam("AuthParameters", {
  //     USERNAME: username,
  //     PASSWORD: password,
  //     SECRET_HASH: this.getSecretHash(username, "cpp"),
  //     // this.awsService.getEnv() === "local"
  //     //   ? this.getSecretHash(username, "cpplocal")
  //     //   : this.getSecretHash(username, "cpp"),
  //   });

  //   return new Promise((resolve, reject) => {
  //     this.cognitoISP.adminInitiateAuth(this.getParams(), (err, data) => {
  //       if (err) {
  //         console.log(err, err.stack);
  //         reject(err);
  //       }
  //       // an error occurred
  //       else {
  //         console.log(`data from loginUser`); // successful response
  //         console.log(data); // successful response
  //         resolve(data);
  //       }
  //     });
  //   });
  // }

  // async getUser(username: string) {
  //   this.params = {};
  //   this.addParam("Username", username);
  //   return new Promise((resolve, reject) => {
  //     this.cognitoISP.adminGetUser(this.getParams(), (err, data) => {
  //       // an error occurred
  //       if (err) {
  //         console.log(err, err.stack);
  //         reject(err);
  //       } else {
  //         console.log(data); // successful response
  //         resolve(data);
  //       }
  //     });
  //   });
  // }

  // async removeAndAddUser(username: string, user: User) {
  //   let disableUserAction;

  //   try {
  //     disableUserAction = await this.disableUser(username);
  //   } catch (error) {
  //     this.logger.error(`Error disabling user: ${username}`);
  //     throw new InternalServerErrorException(
  //       `AWS Cognito Exception while disabling existing user: ${username}`
  //     );
  //   }

  //   if (disableUserAction) {
  //     let deleteUserAction;

  //     try {
  //       deleteUserAction = await this.deleteUser(username);
  //     } catch (error) {
  //       this.logger.error(`Error deleting user: ${username}`);
  //       throw new InternalServerErrorException(
  //         `AWS Cognito Exception while deleting existing user: ${username}`
  //       );
  //     }

  //     if (deleteUserAction) {
  //       let addUserAction;

  //       try {
  //         addUserAction = await this.addUser(user);
  //       } catch (error) {
  //         this.logger.error(`Error adding user: ${username}`);
  //         throw new InternalServerErrorException(
  //           `AWS Cognito Exception while adding new user: ${username}`
  //         );
  //       }

  //       return addUserAction;
  //     }
  //   }
  // }

  // async removeUser(username: string) {
  //   let disableUserAction = {
  //     error: false,
  //     code: "",
  //     message: "",
  //   };

  //   try {
  //     disableUserAction = await this.disableUser(username);
  //   } catch (error) {
  //     let message = `Exception while disabling the user: ${username} in AWS Cognito.`;
  //     let code = `DisableUserAWSCognitoError`;
  //     disableUserAction = {
  //       error: true,
  //       code,
  //       message,
  //     };
  //     if (error) {
  //       console.log(JSON.stringify(error));
  //       if (error.code) disableUserAction.code = error.code;
  //       if (error.message) disableUserAction.message = error.message;
  //     }
  //     this.logger.error(`Error disabling user: ${username}`);
  //     this.logger.error(JSON.stringify(disableUserAction));
  //   }

  //   let deleteUserAction = {
  //     error: false,
  //     code: "",
  //     message: "",
  //   };

  //   try {
  //     deleteUserAction = await this.deleteUser(username);
  //   } catch (error) {
  //     let message = `Exception while deleting the user: ${username} in AWS Cognito.`;
  //     let code = `DeleteUserAWSCognitoError`;
  //     deleteUserAction = {
  //       error: true,
  //       code,
  //       message,
  //     };
  //     if (error) {
  //       console.log(JSON.stringify(error));
  //       if (error.code) deleteUserAction.code = error.code;
  //       if (error.message) deleteUserAction.message = error.message;
  //     }
  //     this.logger.error(`Error deleting user: ${username}`);
  //     this.logger.error(JSON.stringify(deleteUserAction));
  //   }

  //   return {
  //     disableUserAction,
  //     deleteUserAction,
  //   };
  // }

  // async disableUser(username: string): Promise<any> {
  //   this.params = {};
  //   this.addParam("Username", username);

  //   return new Promise((resolve, reject) => {
  //     this.cognitoISP.adminDisableUser(this.getParams(), (err, data) => {
  //       if (err) {
  //         console.log(err, err.stack);
  //         reject(err);
  //       }
  //       // an error occurred
  //       else {
  //         console.log(data); // successful response
  //         resolve(data);
  //       }
  //     });
  //   });
  // }

  // async deleteUser(username: string): Promise<any> {
  //   this.params = {};
  //   this.addParam("Username", username);

  //   return new Promise((resolve, reject) => {
  //     this.cognitoISP.adminDeleteUser(this.getParams(), (err, data) => {
  //       if (err) {
  //         console.log(err, err.stack);
  //         reject(err);
  //       }
  //       // an error occurred
  //       else {
  //         console.log(data); // successful response
  //         resolve(data);
  //       }
  //     });
  //   });
  // }

  // async enableUser(username: string): Promise<any> {
  //   this.params = {};
  //   this.addParam("Username", username);

  //   return new Promise((resolve, reject) => {
  //     this.cognitoISP.adminEnableUser(this.getParams(), (err, data) => {
  //       if (err) {
  //         console.log(err, err.stack);
  //         reject(err);
  //       }
  //       // an error occurred
  //       else {
  //         console.log(data); // successful response
  //         resolve(data);
  //       }
  //     });
  //   });
  // }

  // getPoolId(): string {
  //   return this.poolId;
  // }

  // getRegion(): string {
  //   return this.region;
  // }

  // getPoolARN(): string {
  //   return this.poolARN;
  // }

  // getDomain(): string {
  //   return this.domain;
  // }

  getCognitoURL(serviceName: string, domain: string) {
    return `https://${domain}.${this.baseURL}${this.endpoints[serviceName]}`;
  }

  getClientByName(name: string): Client {
    return <Client>this.clients[name];
    // find((e) => e.name === name);
  }

  getBase64Token(clientDetails: Client): string {
    return Buffer.from(
      clientDetails.id + ":" + clientDetails.secret,
      "utf-8"
    ).toString("base64");
  }

  async getCognitoToken(
    clientDetails: Client,
    grant_type: string = "client_credentials",
    scope: string = "admin/app:admin"
  ): Promise<any> {

    let apiResponse: any;
    const requestBody = { grant_type, scope };

    const config = {
      headers: {
        Authorization: `Basic ${this.getBase64Token(clientDetails)}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    const baseurl = this.getCognitoURL("token", clientDetails.domain);

    try {
      apiResponse = await this.http
        .post(baseurl, stringify(requestBody), config)
        .toPromise();
    } catch (err) {
      console.log(err);
      return err;
    }

    return apiResponse.data;
  }


  async verifyCognitoToken(jwtToken: string, scopes: string[]): Promise<boolean> {
    var flag = false;
    const verifier = CognitoJwtVerifier.create({
      userPoolId: this.poolId, //"us-east-1_hVsM0OPXe", 
      tokenUse: "access",
      clientId: this.getClientIds(), //["2sbbmngkckl1jt4i7fn3748ln8", "3o2ajm7fvdoi2pvei6a3f56int"],
      scope: scopes
    });


    try {
      const payload = await verifier.verify(jwtToken);

      flag = true;
    } catch (err) {
      console.log(err);
      flag = false;
    }

    if (flag) {
      this.logger.debug(`Successfully granted access to the resource`);
    } else {
      this.logger.debug(`Failed to authenticate or authorize for the resource access`);
    }

    return flag;
  }


  getClientIds(): string[] {
    var cognitoClientIds = [];
    Object.values(this.clients).forEach(obj => {
      cognitoClientIds.push(obj.id);
    })
    return cognitoClientIds;
  }

}


