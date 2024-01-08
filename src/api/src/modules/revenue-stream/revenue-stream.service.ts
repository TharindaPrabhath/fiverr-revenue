import { Injectable } from '@nestjs/common';
import { CreateRevenueStreamDto } from './dto/create-revenue-stream.dto';
import { UpdateRevenueStreamDto } from './dto/update-revenue-stream.dto';

@Injectable()
export class RevenueStreamService {
  create(createRevenueStreamDto: CreateRevenueStreamDto) {
    return 'This action adds a new revenueStream';
  }

  findAll() {
    return `This action returns all revenueStream`;
  }

  findOne(id: number) {
    return `This action returns a #${id} revenueStream`;
  }

  update(id: number, updateRevenueStreamDto: UpdateRevenueStreamDto) {
    return `This action updates a #${id} revenueStream`;
  }

  remove(id: number) {
    return `This action removes a #${id} revenueStream`;
  }
}
