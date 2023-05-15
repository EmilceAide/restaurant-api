import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { SubDoc, SubDocSchema } from './subdoc.entity';
import { Brand } from './brand.entity';

@Schema()
export class Product extends Document{
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({type: Number, index: true})
  price: number;

  @Prop({type: Number})
  stock: number;

  @Prop()
  image: string;
  
  @Prop(
    raw({
      name: { type: String },
      image: { type: String },
    }), 
  )
  category: Record<string, any>;
 
  @Prop({ type: Types.ObjectId,  ref: Brand.name })
  brand: Brand | Types.ObjectId;

  @Prop({ type: SubDocSchema })
  subDoc: SubDoc;  

  @Prop({ type: [SubDocSchema] })
  subDocs: Types.Array<SubDoc>;  
}

export const ProductsSchema = SchemaFactory.createForClass(Product); 
ProductsSchema.index({ price: 1, stock: -1}, {unique: true});