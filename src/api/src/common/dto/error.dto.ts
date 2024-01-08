import { ApiProperty } from "@nestjs/swagger";

export class Source {
  @ApiProperty({
    example: "/data/attributes/firstName",
    description:
      " a JSON Pointer [RFC6901] to the associated entity in the request document",
  })
  pointer?: string;

  @ApiProperty({
    example: "firstName",
    description:
      "a string indicating which URI query parameter caused the error.",
  })
  parameter?: string;
}

export class Error {
  @ApiProperty({
    example: "56a38b7b-f563-7709-4bae-87aea",
    description:
      " a unique identifier for this particular occurrence of the problem.",
  })
  id?: string;

  @ApiProperty({
    example: "4XX",
    description:
      "the HTTP status code applicable to this problem, expressed as a string value.",
  })
  status: string;

  @ApiProperty({
    example: "001",
    description:
      "an application-specific error code, expressed as a string value.",
  })
  code: string;

  @ApiProperty({
    example: "Resource Not Found",
    description:
      "a short, human-readable summary of the problem that SHOULD NOT change from occurrence to occurrence of the problem, except for purposes of localization.",
  })
  title?: string;

  @ApiProperty({
    example: "title, this field’s value can be localized.",
    description:
      "a human-readable explanation specific to this occurrence of the problem. Like title, this field’s value can be localized.",
  })
  detail: string;

  @ApiProperty({
    type: () => Source,
  })
  source?: Source;
}

export class Errors {
  @ApiProperty({
    type: [Error],
  })
  errors: [Error];
}
