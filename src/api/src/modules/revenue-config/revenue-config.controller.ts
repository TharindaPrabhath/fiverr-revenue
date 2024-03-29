import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
} from "@nestjs/common";
import { RevenueConfigService } from "./revenue-config.service";
import {
  CreateRevenueConfigDto,
  RequestConverterPipe,
} from "./dto/create-revenue-config.dto";
import { UpdateRevenueConfigDto } from "./dto/update-revenue-config.dto";

@Controller("revenue-config")
export class RevenueConfigController {
  constructor(private readonly revenueConfigService: RevenueConfigService) {}

  @Post()
  @UsePipes(new RequestConverterPipe())
  create(@Body() createRevenueConfigDto: CreateRevenueConfigDto) {
    return this.revenueConfigService.create(createRevenueConfigDto);
  }

  @Get()
  findAll() {
    return this.revenueConfigService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.revenueConfigService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateRevenueConfigDto: UpdateRevenueConfigDto
  ) {
    return this.revenueConfigService.update(Number(id), updateRevenueConfigDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.revenueConfigService.remove(+id);
  }
}
