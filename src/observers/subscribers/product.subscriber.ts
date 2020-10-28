import { Connection, DeleteResult, EntitySubscriberInterface, InsertEvent, RemoveEvent, UpdateEvent } from 'typeorm';
import { Product } from '../../components/product/entity/product.entity';
import { ProductElasticIndex } from '../../services/search/search-index/product.elastic.index';
import { InjectConnection } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostSubscriber implements EntitySubscriberInterface<Product> {

  constructor(
    @InjectConnection() readonly connection: Connection,
    private readonly productEsIndex: ProductElasticIndex) {
    connection.subscribers.push(this);
  }

  public listenTo(): any {
    return Product;
  }
 
  public async afterInsert(event: InsertEvent<Product>): Promise<any> {
    return await this.productEsIndex.insertProductDocument(event.entity);
  }

  public async afterUpdate(event: UpdateEvent<Product>): Promise<any> {
    return await this.productEsIndex.updateProductDocument(event.entity);
  }

  public async afterRemove(event: RemoveEvent<Product>): Promise<any> {
    console.log(event.entityId);
    return await this.productEsIndex.deleteProductDocument(event.entityId);
  }
}
