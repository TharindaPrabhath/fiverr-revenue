import { PartialType } from '@nestjs/mapped-types';
import { CreateRevenueStreamDto } from './create-revenue-stream.dto';

export class UpdateRevenueStreamDto extends PartialType(CreateRevenueStreamDto) {}
