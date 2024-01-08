import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import helmet from 'helmet';
// import { ValidationPipe } from '@nestjs/common';
import { ErrorFilter } from "@common/filters/http-exception.filter";
import { setupSwagger } from './swagger';
import { HttpRequestInterceptor } from '@common/interceptors/http.interceptor';

async function bootstrap() {

  var allowlist = [
    "http://localhost:3000/"
  ]

  var corsOptions: CorsOptions = {
    allowedHeaders: [
      "Origin",
      "Referer",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
      "Cookie",
      "x-csrf-Token",
      "x-dj-client-id",
    ],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,POST,DELETE",
    origin: allowlist,
    preflightContinue: false,
  }

  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: corsOptions });
  const port = process.env.PORT ? process.env.PORT : '3000';

  app.use(
    helmet({
      contentSecurityPolicy: false,
      hidePoweredBy: true
    })
  );

  app.useGlobalInterceptors(new HttpRequestInterceptor());

  setupSwagger(app);

  app.useGlobalFilters(new ErrorFilter());
  await app.listen(port);
}


bootstrap();
