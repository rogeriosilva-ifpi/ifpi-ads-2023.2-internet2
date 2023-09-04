import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { InvestmentProduct } from './entities/produto.entity';
import { CreateProductCommand } from './services/create-product.command';
import { GetAllProductsQuery } from './services/get-all-products.query';

@Controller('produtos')
export class ProdutosController {
  constructor(
    private readonly getAllProductQuery: GetAllProductsQuery,
    private readonly createProductCommand: CreateProductCommand,
  ) {}

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, type: InvestmentProduct })
  create(@Body() createProdutoDto: CreateProdutoDto) {
    return this.createProductCommand.execute(createProdutoDto);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    type: InvestmentProduct,
    isArray: true,
  })
  findAll() {
    return this.getAllProductQuery.execute();
  }
}
