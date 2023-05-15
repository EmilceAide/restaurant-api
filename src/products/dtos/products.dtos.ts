import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsOptional,
  Min,
  ValidateIf,
  ValidateNested,
  IsMongoId, 
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import  { PartialType, ApiProperty }  from '@nestjs/swagger';
import { CreateCategoryDto } from '../dtos/category.dtos';
import { CreateSubDocDto } from './subdoc.dtos'; 


export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly description: string;
  
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly price: number;
  
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly stock: number;
  
  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  readonly image: string;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  readonly category: CreateCategoryDto; 

  @IsMongoId()
  @ApiProperty()
  readonly brand: string;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  readonly subDoc: CreateSubDocDto;  

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSubDocDto)
  readonly subDocs: CreateSubDocDto[]; 
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductsDto {
  @ApiProperty()
  @IsOptional()
  @IsPositive()
  limit: number;

  @ApiProperty()
  @IsOptional()
  @Min(0)
  offset: number;

  @ApiProperty()
  @IsOptional()
  @Min(0)
  minPrice: number;

  @ApiProperty()
  @ValidateIf((params) => params.minPrice)
  @IsPositive()
  maxPrice: number;
}
