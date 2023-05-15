import { ApiProperty } from '@nestjs/swagger';
export class Category {
    id: number;
    @ApiProperty()
    name: string;
  }