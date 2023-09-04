import { Injectable } from '@nestjs/common';
import { InvestmentProduct } from '../entities/produto.entity';
import { ProductRepository } from '../repositories/product.repository';

@Injectable()
export class GetAllProductsQuery {
  constructor(private productRepo: ProductRepository) {}

  public execute(): InvestmentProduct[] {
    return this.productRepo.all();
  }
}
