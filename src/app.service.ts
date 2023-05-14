import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';

@Injectable()
export class AppService {

  constructor(
    @Inject(config.KEY) private configType: ConfigType<typeof config>) {}

  getHello(): string {
    const apiKey = this.configType.apiKey;
    const db= this.configType.database.name; 
    return `Hello World! ${db} ${apiKey}`;
  }
}
