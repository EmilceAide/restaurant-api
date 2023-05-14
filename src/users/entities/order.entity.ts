import { User } from './user.entity';
import { Product } from './../../products/entities/products.entity';

export class Order {
    date: Date;
    user: User;
    products: Product[]; 
}