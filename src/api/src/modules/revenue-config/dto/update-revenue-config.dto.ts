import { PartialType } from '@nestjs/mapped-types';
import { CreateRevenueConfigDto } from './create-revenue-config.dto';

export class UpdateRevenueConfigDto extends PartialType(CreateRevenueConfigDto) {}
