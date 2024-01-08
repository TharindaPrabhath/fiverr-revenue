import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import ERRORCODES from "../exceptions/error.codes";
import { Response } from "express";
import { LoggerService } from "@common/middleware/logger.service";
import { Errors, Error } from "@common/dto/error.dto";


@Catch()
export class ErrorFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {

        let logger = new LoggerService();
        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        if (status === 401) {
            logger.error(ERRORCODES["UnauthorizedAccess"]);
            logger.debug(response.req.headers.requestId);
            response.status(status).json({
                errors: [
                    Object.assign(
                        { id: response.req.headers.requestId },
                        ERRORCODES["UnauthorizedAccess"]
                    ),
                ],
            });
        } else if (status === 429) {
            logger.error(ERRORCODES["RateLimitingError"]);
            logger.debug(response.req.headers.requestId);
            response.status(status).json({
                errors: [
                    Object.assign(
                        { id: response.req.headers.requestId },
                        ERRORCODES["RateLimitingError"]
                    ),
                ],
            });
        } else if (status === 400) {
            logger.debug(response.req.headers.requestId);
            let exceptions: any;
            if (exception.response && exception.response.message) {
                logger.log(exception.response.message);
                if (Array.isArray(exception.response.message)) {
                    exceptions = exception.response.message.map((error) => {
                        let errorResp: Error = {
                            code: "RequestValidationFailed",
                            status: exception.status,
                            title: exception.message,
                            detail: error
                        }
                        return errorResp;
                    });
                } else {
                    console.log(exception);
                    let errorResp: Error = {
                        code: "RequestValidationFailed",
                        status: exception.status,
                        title: exception.message,
                        detail: exception.response.message
                    }
                    exceptions = [errorResp];
                }
            } else {
                let errorResp: Error = {
                    code: "RequestValidationFailed",
                    status: exception.status,
                    title: exception.message,
                    detail: exception.response
                }
                exceptions = [errorResp];
            }

            logger.error(exceptions);

            let errors: Errors = {
                errors: exceptions
            }

            response.status(status).json(errors);
        } else {
            logger.debug(`typeof exception: `);
            logger.debug(typeof exception);

            let exceptions: any;
            if (exception.response && exception.response.message) {
                logger.log(exception.response.message);
                if (Array.isArray(exception.response.message)) {
                    exceptions = exception.response.message.map((error) => {
                        let errorResp: Error = {
                            code: exception.name,
                            status: exception.status,
                            title: exception.message,
                            detail: error
                        }
                        return errorResp;
                    });
                } else {
                    console.log(exception);
                    let errorResp: Error = {
                        code: exception.name,
                        status: exception.status,
                        title: exception.message,
                        detail: exception.response.message
                    }
                    exceptions = [errorResp];
                }
            } else {
                let errorResp: Error = {
                    code: exception.name,
                    status: exception.status,
                    title: exception.message,
                    detail: exception.response
                }
                exceptions = [errorResp];
            }

            logger.error(exceptions);

            let errors: Errors = {
                errors: exceptions
            }

            response.status(status).json(errors);
        }
    }
} 