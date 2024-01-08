import { SetMetadata } from '@nestjs/common';

export const CognitoScopes = (...args: string[]) => SetMetadata('cognitoScopes', args);
