import { INestApplication } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import {
  SWAGGER_API_ROOT,
  SWAGGER_API_NAME,
  SWAGGER_API_DESCRIPTION,
  SWAGGER_API_CURRENT_VERSION,
  COGNITO_DOMAINS,
  COGNITO_SCOPES,
} from "./constants";

const env = process.env.NODE_ENV ? process.env.NODE_ENV : "local";

export const setupSwagger = (app: INestApplication) => {

  const options = new DocumentBuilder()
    .setTitle(SWAGGER_API_NAME)
    // .setBasePath("api")
    .setDescription(SWAGGER_API_DESCRIPTION)
    .setVersion(SWAGGER_API_CURRENT_VERSION)
    .addOAuth2({
      type: "oauth2",
      flows: {
        clientCredentials: {
          tokenUrl: `https://${COGNITO_DOMAINS[env]}.auth.us-east-1.amazoncognito.com/oauth2/token`,
          scopes: COGNITO_SCOPES,
        },
      },
    })
    .build();
  const document = SwaggerModule.createDocument(app, options);
  if (env === "prod" || env === "stag")
    SwaggerModule.setup("hfbYUBHbfehwnwewY", app, document);
  else SwaggerModule.setup(SWAGGER_API_ROOT, app, document);
};
