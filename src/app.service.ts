import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Db } from 'mongodb';
import config from './config';

@Injectable()
export class AppService {

  constructor(
    @Inject('MONGO') private database: Db, 
    @Inject(config.KEY) private configType: ConfigType<typeof config>) {}

  getHello(): string {
    // const apiKey = this.configType.apiKey;
    // const db= this.configType.database.name; 
    return `Welcome!`;
  }
  async getProduc(){
      const produc = this.database.collection('produc');
       return await produc.find().toArray();
  }
}
