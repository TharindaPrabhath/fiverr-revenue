import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateRevenueConfigDto } from "./dto/create-revenue-config.dto";
import { UpdateRevenueConfigDto } from "./dto/update-revenue-config.dto";
import { RevenueConfig } from "./entities/revenue-config.entity";
import { RevenueConfigStream } from "@modules/revenue-config-stream/entities/revenue-config-stream.entity";
import { RevenueStream } from "@modules/revenue-stream/entities/revenue-stream.entity";

@Injectable()
export class RevenueConfigService {
  constructor(
    @InjectRepository(RevenueConfig)
    private readonly revenueConfigRepository: Repository<RevenueConfig>,
    @InjectRepository(RevenueStream)
    private readonly revenueStreamRepository: Repository<RevenueStream>,
    @InjectRepository(RevenueConfig)
    private readonly revenueConfigStreamRepository: Repository<RevenueConfigStream>
  ) {}

  async create(createRevenueConfigDto: CreateRevenueConfigDto) {
    console.log("createRevenueConfigDto", createRevenueConfigDto);

    const revenueConfig = new RevenueConfig({
      name: createRevenueConfigDto.name,
      description: createRevenueConfigDto.description,
      audience: createRevenueConfigDto.audience,
      edition: createRevenueConfigDto.edition,
      creation_date: new Date(),
      modified_date: new Date(),
    });
    await this.revenueConfigRepository.save(revenueConfig);

    const revenueStreams = await this.revenueStreamRepository.findByIds(
      createRevenueConfigDto.revenueConfigStreams.map(
        (record) => record.revenueStreamId
      )
    );

    if (revenueStreams.length === 0)
      throw new BadRequestException(
        "No such matching revenue streams were found."
      );

    const revenueConfigStreams =
      createRevenueConfigDto.revenueConfigStreams.map((record) => ({
        revsharepct: record.revenueSharePercentage,
        chargetemplateid: record.chargeTemplateId,
        taxcode: record.taxCode,
        creation_date: new Date(),
        modified_date: new Date(),
        revenueConfig: revenueConfig,
        revenueStream: revenueStreams.find(
          (revenueStream) => revenueStream.id === record.revenueStreamId
        ),
      }));
    await this.revenueConfigStreamRepository.save(revenueConfigStreams);
  }

  async findAll() {
    return await this.revenueConfigRepository.find();
  }

  async findOne(id: number) {
    return await this.revenueConfigRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateRevenueConfigDto: UpdateRevenueConfigDto) {
    return await this.revenueConfigRepository.update(id, {
      name: updateRevenueConfigDto.name,
      description: updateRevenueConfigDto.description,
      audience: updateRevenueConfigDto.audience,
      edition: updateRevenueConfigDto.edition,
    });
  }

  async remove(id: number) {
    return await this.revenueConfigRepository.delete(id);
  }
}
