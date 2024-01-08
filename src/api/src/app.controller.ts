import { Controller, Get } from '@nestjs/common';


@Controller()
export class AppController {

  @Get('_health')
  async _health(): Promise<string> {
    return "Success";
  }


}
