import { ApiProperty } from "@nestjs/swagger";

export class ErrorDto {
  @ApiProperty({
    example: "MissingCaptureAmount",
    description:
      "The error returned by CPP for rejecting the request or internal error",
  })
  code: string;

  @ApiProperty({
    example: "Description of the error code",
    description: "Description of the error code",
  })
  description?: string;

  @ApiProperty({
    example: "Solution if any for the error",
    description: "Solution if any for the error",
  })
  solution?: string;

  @ApiProperty({
    example: "EPS",
    description: "System name from which the error was sent",
  })
  source?: string;
}
