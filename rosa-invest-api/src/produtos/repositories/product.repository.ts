import { Injectable } from '@nestjs/common';
import { ulid } from 'ulidx';
import { CreateProdutoDto } from '../dto/create-produto.dto';
import { InvestmentProduct } from '../entities/produto.entity';

@Injectable()
export class ProductRepository {
  private products: InvestmentProduct[] = [];

  constructor() {
    this.products.push({
      id: ulid(),
      name: 'CDB R1 2026',
      destination: 'Tecnologia de Jogos para Idosos',
      maturity: new Date(2026, 12, 31),
      rentabilityFee: 0.02,
    });
  }

  public all(): InvestmentProduct[] {
    return this.products;
  }

  public save(product: CreateProdutoDto): InvestmentProduct {
    const newProduct = { ...product, id: ulid() };

    this.products.push(newProduct);

    return newProduct;
  }
}
