import { Error } from "@common/dto/error.dto";

const ERRORCODES: CODES = {
  XDJClientIdMissing: {
    status: "400",
    code: "4001",
    title: "Bad Request",
    detail: "Missing header in the request",
    source: {
      pointer: "headers/X-DJ-Client-ID",
      parameter: "X-DJ-Client-ID",
    },
  },
  InsufficientPermission: {
    status: "400",
    code: "4001",
    title: "Bad Request",
    detail: "Access denied due to insufficient permission",
  },
  BadRequest: {
    status: "400",
    code: "4002",
    title: "Bad Request",
    detail: "Provided request is not valid",
  },
  RateLimitingError: {
    status: "429",
    code: "4291",
    title: "Requests exceeded",
    detail: "Access denied due to rate limiting",
  },
  ForbiddenAccess: {
    status: "403",
    code: "4031",
    title: "Forbidden",
    detail: "Access forbidden due to insufficient perimssion",
  },
  UnauthorizedAccess: {
    status: "401",
    code: "4011",
    title: "Unauthorized",
    detail: "Access denied due to unauthorized access",
  },
  UncaughtError: {
    status: "500",
    code: "5001",
    title: "UncaughtError",
    detail: "There was an uncaughtError in Paymnet gateway Service",
    source: {
      pointer: "paymentgateway/get",
      parameter: "get",
    },
  },
};

interface CODES {
  [key: string]: Error | Function;
}

export default ERRORCODES;

export const SetUncaughtError = (
  serviceName: string,
  pointer: string = "undefined",
  parameter: string = ""
) => {
  return {
    status: "500",
    code: "5001",
    title: "UncaughtError",
    detail: `There was an uncaughtError in ${serviceName} Service`,
    source: {
      pointer,
      parameter,
    },
  };
};
