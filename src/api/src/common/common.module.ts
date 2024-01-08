import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { GetJsonInterceptor } from "./interceptors/get.interceptor";
// import { LoggingMiddleware } from "./middleware/logging.middleware";
import { LoggerModule } from "./middleware/logger.module";
// import { AuditlogModule } from "@modules/auditlog/auditlog.module";
// import { CSRFMiddleware } from "./middleware/csrf.middleware";
// import { UserMiddleware } from "./middleware/user.middleware";
import { InternationalizationModule } from './internationalization/internationalization.module';
import { CognitoScopesGuard } from "./guards";

@Module({
  imports: [LoggerModule], // AuditlogModule],
  // imports : [InternationalizationModule],
  providers: [
    CognitoScopesGuard
    // {provide: APP_INTERCEPTOR, useClass: GetJsonInterceptor}
  ],
  exports: [
    CognitoScopesGuard
  ]
})

export class CommonModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    // if (process.env.NODE_ENV !== "collab") {
    //   consumer
    //     .apply(LoggingMiddleware)
    //     .forRoutes({ path: "*", method: RequestMethod.ALL });
    //   consumer
    //     .apply(UserMiddleware)
    //     .forRoutes(
    //       { path: "users*", method: RequestMethod.ALL },
    //       { path: "role*", method: RequestMethod.ALL },
    //       { path: "permission*", method: RequestMethod.ALL },
    //       { path: "compan*", method: RequestMethod.ALL }
    //     );
    //   // consumer
    //   //   .apply(CSRFMiddleware)
    //   //   .exclude("sessions/csrf")
    //   //   .forRoutes({ path: "*", method: RequestMethod.ALL });
    // } else {
    //   consumer
    //     .apply(LoggingMiddleware)
    //     .exclude("users")
    //     .forRoutes("*");
    //   consumer
    //     .apply(UserMiddleware)
    //     .forRoutes({ path: "users", method: RequestMethod.ALL });
    // }
  }

  // CSRFMiddleware
}
