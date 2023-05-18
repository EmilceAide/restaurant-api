import { Controller, Get, UseGuards} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AppService } from './app.service';
import { Public } from './auth/decorators/public.decorator';
import { ApiKeyGuard } from './auth/guards/api-key/api-key.guard';

@UseGuards(ApiKeyGuard)
@ApiTags('/')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  @Public()
  getHello(): string {
    return this.appService.getHello();
  }
}
