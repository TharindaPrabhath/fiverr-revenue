import { ApiProperty } from "@nestjs/swagger";
import { BadRequestErrorDto } from "./badRequest.error.dto";


export class BadRequestErrorsDto {
    @ApiProperty({
        type: [BadRequestErrorDto],
    })
    errors: [BadRequestErrorDto];
}