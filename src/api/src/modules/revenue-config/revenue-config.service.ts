import { Injectable } from '@nestjs/common';
import { CreateRevenueConfigDto } from './dto/create-revenue-config.dto';
import { UpdateRevenueConfigDto } from './dto/update-revenue-config.dto';

@Injectable()
export class RevenueConfigService {
  create(createRevenueConfigDto: CreateRevenueConfigDto) {
    return 'This action adds a new revenueConfig';
  }

  findAll() {
    return `This action returns all revenueConfig`;
  }

  findOne(id: number) {
    return `This action returns a #${id} revenueConfig`;
  }

  update(id: number, updateRevenueConfigDto: UpdateRevenueConfigDto) {
    return `This action updates a #${id} revenueConfig`;
  }

  remove(id: number) {
    return `This action removes a #${id} revenueConfig`;
  }
}
