import ERRORCODES, { SetUncaughtError } from "@common/exceptions/error.codes";
import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    BadRequestException,
} from "@nestjs/common";
import { response } from "express";
import { Observable } from "rxjs";
import { tap, map } from "rxjs/operators";

@Injectable()
export class HttpRequestInterceptor implements NestInterceptor {

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest();
        const headers = req.headers;
        const ip = req.headers['x-forwarded-for'] || req.ip;
        console.log(`Request from client IP [${ip}] - ${req.originalUrl}`);

        return next.handle().pipe();
    }
}
