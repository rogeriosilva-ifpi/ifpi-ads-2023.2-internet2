import { ApiProperty } from '@nestjs/swagger';

export class CreateProdutoDto {
  @ApiProperty({ description: 'Nome do Produto a ser produto' })
  name: string;

  @ApiProperty()
  destination: string;

  @ApiProperty({
    description: 'Valor real que representa a taxa de adm sobre o lucro',
    default: 0,
  })
  rentabilityFee: number;

  @ApiProperty()
  maturity: Date;
}
