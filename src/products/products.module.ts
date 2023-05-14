import { Module } from '@nestjs/common';

import { BrandsController } from './controllers/brands.controller';
import { BrandsService } from './services/brands.service';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';

@Module({
    imports: [],
    controllers: [BrandsController, CategoriesController, ProductsController],
    providers: [BrandsService, CategoriesService, ProductsService],
    exports: [ProductsService]
})
export class ProductsModule {}
