import { IsString } from "class-validator";

export class CreateAuditlogDto {
  @IsString()
  readonly requestId: string;

  @IsString()
  readonly body: string;

  @IsString()
  readonly headers: string;

  @IsString()
  readonly url: string;
}
