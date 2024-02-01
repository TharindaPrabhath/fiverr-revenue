import { Injectable } from "@nestjs/common";
import { CreateRevenueStreamDto } from "./dto/create-revenue-stream.dto";
import { UpdateRevenueStreamDto } from "./dto/update-revenue-stream.dto";
import { EntityManager, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { RevenueStream } from "./entities/revenue-stream.entity";
@Injectable()
export class RevenueStreamService {
  constructor(
    // @InjectRepository(RevenueStream)
    // private readonly itemsRepository: Repository<RevenueStream>,
    private readonly entityManager: EntityManager
  ) {}
  async create(createRevenueStreamDto: CreateRevenueStreamDto) {
    const revenueStream = new RevenueStream({
      ...createRevenueStreamDto,
    });

    return await this.entityManager.save(revenueStream);
    //return 'This action adds a new revenueStream';
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
