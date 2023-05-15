import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';

import { SubDoc, SubDocSchema } from './subdoc.entity';
import { Brand } from './brand.entity';

@Schema()
export class Product extends Document{
  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @ApiProperty()
  @Prop()
  description: string;

  @ApiProperty()
  @Prop({type: Number, index: true})
  price: number;

  @ApiProperty()
  @Prop({type: Number})
  stock: number;

  @ApiProperty()
  @Prop()
  image: string;
  
  @ApiProperty()
  @Prop(
    raw({
      name: { type: String },
      image: { type: String },
    }), 
  )
  category: Record<string, any>;
 
  @ApiProperty()
  @Prop({ type: Types.ObjectId,  ref: Brand.name })
  brand: Brand | Types.ObjectId;

  @ApiProperty()
  @Prop({ type: SubDocSchema })
  subDoc: SubDoc;  

  @ApiProperty()
  @Prop({ type: [SubDocSchema] })
  subDocs: Types.Array<SubDoc>;  
}

export const ProductsSchema = SchemaFactory.createForClass(Product); 
ProductsSchema.index({ price: 1, stock: -1}, {unique: true});