import { Module } from '@nestjs/common';
import * as Joi from 'joi'; 
import { ConfigModule } from '@nestjs/config';

// import { HttpModule, HttpService } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';

import { enviroment } from './enviroments';
import { AuthModule } from './auth/auth.module';
import config from './config';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroment[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        DB_NAME: Joi.string().required(), 
        DB_PORT: Joi.number().required(),
      })
    }),
    // HttpModule,
    UsersModule,
    ProductsModule,
    DatabaseModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}