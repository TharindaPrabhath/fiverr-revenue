import { ApiProperty } from "@nestjs/swagger";
import { ErrorDto } from "./error.dto";

export class BadRequestErrorDto extends ErrorDto {

    @ApiProperty({
        example: "[form_components is required, allowed_payment_methods is an array]",
        description:
            "Form vallidation error messages",
    })
    messages: string[]

}
