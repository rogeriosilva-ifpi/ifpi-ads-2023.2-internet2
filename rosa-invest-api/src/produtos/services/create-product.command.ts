import { Injectable } from '@nestjs/common';
import { CreateProdutoDto } from '../dto/create-produto.dto';
import { ProductRepository } from '../repositories/product.repository';

@Injectable()
export class CreateProductCommand {
  constructor(private productRepo: ProductRepository) {}

  public execute(createProdutoDto: CreateProdutoDto) {
    return this.productRepo.save(createProdutoDto);
  }
}
