import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RevenueStreamService } from './revenue-stream.service';
import { CreateRevenueStreamDto } from './dto/create-revenue-stream.dto';
import { UpdateRevenueStreamDto } from './dto/update-revenue-stream.dto';

@Controller('revenue-stream')
export class RevenueStreamController {
  constructor(private readonly revenueStreamService: RevenueStreamService) {}

  @Post()
  create(@Body() createRevenueStreamDto: CreateRevenueStreamDto) {
    return this.revenueStreamService.create(createRevenueStreamDto);
  }

  @Get()
  findAll() {
    return this.revenueStreamService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.revenueStreamService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRevenueStreamDto: UpdateRevenueStreamDto) {
    return this.revenueStreamService.update(+id, updateRevenueStreamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.revenueStreamService.remove(+id);
  }
}
