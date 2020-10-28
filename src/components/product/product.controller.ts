import {
  Body,
  Controller, Delete, Get, Inject, Param, Patch,
  Post,
  Query
} from "@nestjs/common";
import { ProductServiceInterface } from "./interface/product.service.interface";
import { CreateProductDto } from "./dto/create-product.dto";
import { Product } from "./entity/product.entity";
import { ProductService } from './product.service';

@Controller("products")
export class ProductController {

  constructor(@Inject("ProductServiceInterface")
              private readonly productService: ProductServiceInterface) {
  }

  @Post()
  public async create(@Body() productDto: CreateProductDto): Promise<Product> {
    return await this.productService.create(productDto);
  }

  @Delete(':id')
  public async delete(@Param('id') idProduct: string) {
    return await this.productService.delete(idProduct);
  }

  @Patch("/:id")
  public async update(@Param("id") id: string, @Body() updateProduct: any): Promise<Product> {
    return await this.productService.update(id, updateProduct);
  }

  @Get('/search')
  public async search(@Query() query: any): Promise<any> {
    return await this.productService.search(query.q);
  }

}
