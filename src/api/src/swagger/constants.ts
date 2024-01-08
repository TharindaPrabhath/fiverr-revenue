export const SWAGGER_API_ROOT = "swagger";
export const SWAGGER_API_NAME = "PNP Billing Configuration API";
export const SWAGGER_API_DESCRIPTION = "API for PNP Billing Configuration solution";
export const SWAGGER_API_CURRENT_VERSION = "1.0";

export const COGNITO_DOMAINS = {
  local: "pnp-billing-config-lab",
  dev: "pnp-billing-config-dev"
};

export const COGNITO_SCOPES = {
  "api/app:admin": "Manage all the internal APIs",
  "api/session:create": "Create Session",
  "api/session:read": "Get details for a particular session"
};
