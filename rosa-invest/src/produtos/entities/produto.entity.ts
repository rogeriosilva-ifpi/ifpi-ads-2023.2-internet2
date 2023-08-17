export enum ProdutoStatus {
  DISPONIVEL = 'Disponível',
  INDISPONIVEL = 'Indisponível',
}

export class Produto {
  id: string;
  nome: string;
  destinacao: string;
  taxaRentabilidade: number;
  taxaAdministracao: number;
  vencimento: Date;
  status: ProdutoStatus;

  alternarStatus(): void {
    this.status =
      this.status === ProdutoStatus.DISPONIVEL
        ? ProdutoStatus.INDISPONIVEL
        : ProdutoStatus.DISPONIVEL;
  }

  get disponivel(): boolean {
    return this.status === ProdutoStatus.DISPONIVEL;
  }
}
