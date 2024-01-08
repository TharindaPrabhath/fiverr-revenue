import ERRORCODES, { SetUncaughtError } from "@common/exceptions/error.codes";
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { tap, map } from "rxjs/operators";

@Injectable()
export class GetJsonInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const headers = context.switchToHttp().getRequest().headers;
    return next.handle().pipe(
      map((response) => {
         if (response && response) {
          return {
            data: [
              {
                id: headers.requestId,
                type: response.type,
                attributes: response,
              },
            ],
          };
        }

        return new BadRequestException(SetUncaughtError(response.type));
      })
    );
  }
}
