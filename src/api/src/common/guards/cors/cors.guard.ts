import ERRORCODES from '@common/exceptions/error.codes';
import { LoggerService } from '@common/middleware/logger.service';
import { ConfigService } from '@config/config.service';
import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import * as URL from 'url';

@Injectable()
export class CORSGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector,
    private logger: LoggerService,
    private configService: ConfigService
  ) {
    this.logger = new LoggerService("CORSGuard");
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    if (process.env.NODE_ENV == "local") {
      this.logger.warn('Verification is skipped, since it is local development');
      return true;
    }
    const referer = context.getArgs()[0].headers["referer"];
    if (!referer) {
      this.logger.warn('Call is coming from unothorized referer website');
      return false;
    }

    this.logger.debug(`referer is ${referer}`);
    const referrerHostName = URL.parse(referer).hostname

    const allowedRefererDomains = [
      "hpf.dev.pnp-services.commerce-nonprod.dowjones.io",
      "hpf.int.pnp-services.commerce-nonprod.dowjones.io",
      "hpf.stag.pnp-services.commerce-stag.dowjones.io",
      "hpf.prod.pnp-services.commerce-prod.dowjones.io"
    ];

    const refererCheck = allowedRefererDomains.includes(referrerHostName);

    if (
      (!refererCheck ||
        refererCheck === undefined ||
        !referer ||
        referer === undefined) &&
      process.env.NODE_ENV !== "local"
    ) {
      this.logger.warn(`Invalid Referer detected.`);
      this.logger.warn(referer);
      throw new BadRequestException(ERRORCODES["ForbiddenAccess"]);
    }

    this.logger.debug(`Valid Referer: ${referer}`);

    return true;
  }
}
