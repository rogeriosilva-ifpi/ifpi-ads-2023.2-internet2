import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Redirect,
  Render,
} from '@nestjs/common';
import { NovoProdutoDto } from './dtos/novo-produto.dto';
import { ProdutosService } from './produtos.service';

@Controller('produtos')
export class ProdutosController {
  constructor(private produtosService: ProdutosService) {}

  @Get('/novo')
  @Render('produtos/form')
  public formularioProduto() {
    return;
  }

  @Post('/salvar')
  @Redirect('/produtos/listar')
  public salvarProduto(@Body() input: NovoProdutoDto) {
    this.produtosService.cadastrar(input);
  }

  @Get('/listar')
  @Render('produtos/listar')
  public listarProdutos() {
    return { produtos: this.produtosService.todos() };
  }

  @Get('/alternar-status')
  @Redirect('/produtos/listar')
  public alternarStatus(@Query('id') idProduto: string) {
    this.produtosService.alternarStatus(idProduto);
  }

  @Get('/remover')
  @Redirect('/produtos/listar')
  public removerProduto(@Query('id') idProduto: string) {
    this.produtosService.remover(idProduto);
  }
}
