import { Module } from '@nestjs/common';
import { ProdutosController } from './produtos.controller';
import { ProductRepository } from './repositories/product.repository';
import { CreateProductCommand } from './services/create-product.command';
import { GetAllProductsQuery } from './services/get-all-products.query';

@Module({
  controllers: [ProdutosController],
  providers: [GetAllProductsQuery, CreateProductCommand, ProductRepository],
})
export class ProdutosModule {}
