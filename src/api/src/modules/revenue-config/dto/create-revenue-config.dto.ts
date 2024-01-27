import { CreateRevenueConfigStreamDto } from "@modules/revenue-config-stream/dto/create-revenue-config-stream.dto";
import { CreateRevenueStreamDto } from "@modules/revenue-stream/dto/create-revenue-stream.dto";
import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
@Injectable()
export class RequestConverterPipe implements PipeTransform {
  transform(body: any, metadata: ArgumentMetadata): CreateRevenueConfigDto {
    console.log("the body:" + JSON.stringify(body));

    const result = new CreateRevenueConfigDto();
    // can of course contain more sophisticated mapping logic
    console.log("the namein pipe modifed:" + body.data.attributes.payload.name);
    result.name = body.data.attributes.payload.name;
    result.description = body.data.attributes.payload.description;
    result.audience = body.data.attributes.payload.audience;
    result.edition = body.data.attributes.payload.edition;

    let output = [];
    const revenueConfigStreams =
      body.data.attributes.payload.revenue_stream_links ?? [];
    revenueConfigStreams.forEach((revenueConfigStream) => {
      output = [];
      const revenueConfigStreamDto = new CreateRevenueConfigStreamDto();
      revenueConfigStreamDto.chargeTemplateId =
        revenueConfigStream.charge_template_id;
      revenueConfigStreamDto.revenueStreamId =
        revenueConfigStream.revenue_stream_id;
      revenueConfigStreamDto.revenueSharePercentage =
        revenueConfigStream.revenue_share_percentage;
      output.push(revenueConfigStreamDto);
      result.revenueConfigStreams = output;
    });

    return result;
  }
}
export class CreateRevenueConfigDto {
  name: string;
  description: string;
  audience: string;
  edition: string;
  revenueConfigStreams: CreateRevenueConfigStreamDto[];
}
