import { ProdutoStatus } from '../entities/produto.entity';

export class NovoProdutoDto {
  nome: string;
  destinacao: string;
  taxaRentabilidade: number;
  taxaAdministracao: number;
  vencimento: Date;
  status: ProdutoStatus;
}
