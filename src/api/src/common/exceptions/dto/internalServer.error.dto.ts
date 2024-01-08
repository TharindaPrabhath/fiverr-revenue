import { Source } from "@common/dto/error.dto";
import { ApiProperty } from "@nestjs/swagger";

export class InternalServerErrorDto {
  @ApiProperty({
    example: "56a38b7b-f563-7709-4bae-87aea",
    description:
      "a unique identifier for this particular occurrence of the problem.",
  })
  id?: string;

  @ApiProperty({
    example: "500",
    description:
      "the HTTP status code applicable to this problem, expressed as a string value.",
  })
  status: string;

  @ApiProperty({
    example: "5001",
    description:
      "an application-specific error code, expressed as a string value.",
  })
  code: string;

  @ApiProperty({
    example: "UncaughtError",
    description:
      "a short, human-readable summary of the problem that SHOULD NOT change from occurrence to occurrence of the problem, except for purposes of localization.",
  })
  title: string;

  @ApiProperty({
    example: "There was an uncaughtError in the Service",
    description:
      "a human-readable explanation specific to this occurrence of the problem. Like title, this field’s value can be localized.",
  })
  detail: string;

  @ApiProperty({
    type: () => Source,
  })
  source: Source;
}
