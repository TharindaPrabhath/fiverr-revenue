import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { CreateRevenueConfigDto } from "./dto/create-revenue-config.dto";
import { UpdateRevenueConfigDto } from "./dto/update-revenue-config.dto";
import { RevenueConfig } from "./entities/revenue-config.entity";

@Injectable()
export class RevenueConfigService {
  constructor(
    @InjectRepository(RevenueConfig)
    private readonly itemsRepository: Repository<RevenueConfig>,
    private readonly entityManager: EntityManager
  ) {}

  async create(createRevenueConfigDto: CreateRevenueConfigDto) {
    const revenueConfig = new RevenueConfig({
      name: createRevenueConfigDto.name,
      description: createRevenueConfigDto.description,
      audience: createRevenueConfigDto.audience,
      edition: createRevenueConfigDto.edition,
      creation_date: new Date(),
      modified_date: new Date(),
    });
    await this.entityManager.save(revenueConfig);

    const revenueConfigStreams = createRevenueConfigDto.revenueConfigStreams;
    await this.entityManager.save(revenueConfigStreams);
  }
  async findAll() {
    return await this.itemsRepository.find();
  }

  async findOne(id: number) {
    return await this.itemsRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateRevenueConfigDto: UpdateRevenueConfigDto) {
    return await this.itemsRepository.update(id, updateRevenueConfigDto);
  }

  async remove(id: number) {
    return await this.itemsRepository.delete(id);
  }
}
