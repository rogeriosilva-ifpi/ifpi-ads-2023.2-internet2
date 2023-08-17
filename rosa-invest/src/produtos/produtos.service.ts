import { Injectable } from '@nestjs/common';
import { ulid } from 'ulidx';
import { NovoProdutoDto } from './dtos/novo-produto.dto';
import { Produto, ProdutoStatus } from './entities/produto.entity';

const p = new Produto();

Object.assign(p, {
  id: ulid(),
  nome: 'CDB ROSA 2024',
  destinacao: 'Investimento Educacional',
  status: ProdutoStatus.DISPONIVEL,
  taxaAdministracao: 0,
  taxaRentabilidade: 10,
  vencimento: new Date(2023, 11, 31),
});

const produtos: Produto[] = [p];

@Injectable()
export class ProdutosService {
  public todos(): Produto[] {
    return produtos;
  }

  public cadastrar(input: NovoProdutoDto) {
    const novoProduto = {
      ...input,
      id: ulid(),
      status: ProdutoStatus.DISPONIVEL,
    } as Produto;

    produtos.push(novoProduto);

    return novoProduto;
  }

  public obterPorId(id: string): Produto | undefined {
    const produto = produtos.find((p) => p.id === id);
    return produto;
  }

  public alternarStatus(idProduto: string): void {
    const produto = this.obterPorId(idProduto);

    if (!produto) return;

    produto.alternarStatus();
  }

  public remover(idProduto: string): void {
    const index = produtos.findIndex((p) => p.id == idProduto);

    if (index === -1) return;

    produtos.splice(index, 1);
  }
}
