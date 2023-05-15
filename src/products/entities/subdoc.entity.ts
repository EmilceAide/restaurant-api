import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class SubDoc {
  @ApiProperty()
  @Prop()
  name: String;

  @ApiProperty()
  @Prop()
  description: String;
}

export const SubDocSchema = SchemaFactory.createForClass(SubDoc);