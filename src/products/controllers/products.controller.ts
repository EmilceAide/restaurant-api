import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MongoIdPipe } from '../../common/mongo-id.pipe';
import { AuthGuard } from '@nestjs/passport';

import { ProductsService } from '../services/products.service';
import { CreateProductDto, UpdateProductDto, FilterProductsDto } from '../dtos/products.dtos';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { Public } from '../../auth/decorators/public.decorator';
import { Roles } from '../../auth/decorators/roles.decorator'; 
import { Role } from '../../auth/models/roles.model'; 

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Public()
  // @Roles(Role.ADMIN, Role.CUSTOMER)
  @Get()
  // @ApiOperation({ summary: 'List of products'})
  getProducts(
    @Query() params: FilterProductsDto,
  ) {
    return this.productsService.findAll(params);
  }

  @Public()
  // @Roles(Role.ADMIN, Role.CUSTOMER)
  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('productId', MongoIdPipe) productId: string) {
    return this.productsService.findOne(productId);
  }

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Roles(Role.ADMIN)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productsService.update(id, payload);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productsService.delete(id);
  }
}
