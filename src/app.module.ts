import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { UsersController } from './controllers/users.controller';
import { CustomersController } from './controllers/customers.controller';
import { CategoriesController } from './controllers/categories.controller';
import { BrandsController } from './controllers/brands.controller';
import { UsersService } from './services/users.service';
import { CustomersService } from './services/customers.service';
import { CategoriesService } from './services/categories.service';
import { BrandsService } from './services/brands.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    ProductsController,
    UsersController,
    CustomersController,
    CategoriesController,
    BrandsController,
  ],
  providers: [
    AppService,
    ProductsService,
    UsersService,
    CustomersService,
    CategoriesService,
    BrandsService,
  ],
})
export class AppModule {}
