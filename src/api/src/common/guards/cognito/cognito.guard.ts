import ERRORCODES from '@common/exceptions/error.codes';
import { LoggerService } from '@common/middleware/logger.service';
import { CognitoService } from '@config/cognito/cognito.service';
import { ConfigService } from '@config/config.service';
import { BadGatewayException, BadRequestException, CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import axios from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class CognitoScopesGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector,
    private logger: LoggerService,
    private configService: ConfigService

  ) {
    this.logger = new Logger("CognitoScopesGuard");
  }

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {

    if (process.env.NODE_ENV == 'local') {
      this.logger.warn("is disabled, since it is development mode");
      return true;
    }
    const routeCognitoScopes = this.reflector.get<string[]>(
      "cognitoScopes",
      context.getHandler()
    );
    const request = context.switchToHttp().getRequest<Request>();
    var headers = request.headers;
    var authorization = request.headers['authorization']
    this.logger.debug(`Verifying authentication for token : ${authorization} againest scopes : ${routeCognitoScopes}`);
    if (!authorization) {
      this.logger.warn("No authorization token has been sent");
      return false;
    }
    authorization = authorization.split(" ")[1];
    //const cognitoService = this.configService.getCognitoService();
    let flag;
    try {
    //  flag = cognitoService.verifyCognitoToken(authorization, routeCognitoScopes);
    } catch (err) {
      console.log(err);
      this.logger.error(`Cognito authentication is failed for the ${authorization}`);
      throw new BadGatewayException(`Error: Authenticating with cognito`);
    }

    return flag;
  }


}
