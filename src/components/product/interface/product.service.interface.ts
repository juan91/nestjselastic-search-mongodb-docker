import { DeleteResult } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { Product } from "../entity/product.entity";

export interface ProductServiceInterface {
  create(productDto: CreateProductDto): Promise<Product>;

  update(productId: any, updateProduct: any): Promise<Product>;

  delete(idProduct: string):Promise<DeleteResult>

  search(q: any): Promise<any>;
}
