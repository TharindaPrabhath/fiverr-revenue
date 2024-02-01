import { CreateRevenueStreamDto } from "@modules/revenue-stream/dto/create-revenue-stream.dto";
import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
// @Injectable()
// export class RequestConverterPipe implements PipeTransform {
//   transform(
//     body: any,
//     metadata: ArgumentMetadata
//   ): CreateRevenueConfigStreamDto[] {
//     console.log("the body:" + JSON.stringify(body));

//     const output = [];
//     // can of course contain more sophisticated mapping logic
//     console.log("the namein pipe modifed:" + body.data.attributes.payload.name);
//     const revenueConfigStreams = body.data.attributes.payload
//       .revenueConfigStreams as any[];
//     revenueConfigStreams.forEach((revenueConfigStream) => {
//       const revenueConfigStreamDto = new CreateRevenueConfigStreamDto();
//       revenueConfigStreamDto.chargeTemplateId =
//         revenueConfigStream.chargeTemplateId;
//       revenueConfigStreamDto.revenueStreamId =
//         revenueConfigStream.revenueStreamId;
//       revenueConfigStreamDto.revenueSharePercentage =
//         revenueConfigStream.revenueSharePercentage;
//       output.push(revenueConfigStreamDto);
//     });
//     return output;
//   }
// }
export class CreateRevenueConfigStreamDto {
  revenueSharePercentage: string;
  chargeTemplateId: string;
  revenueStreamId: number;
  taxCode: string;
}
