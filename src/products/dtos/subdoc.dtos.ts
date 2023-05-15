import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateSubDocDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: String;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly description: String;
}

export class UpdateSubDocDto extends PartialType(CreateSubDocDto) {}