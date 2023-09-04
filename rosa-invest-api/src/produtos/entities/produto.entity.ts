import { ApiProperty } from '@nestjs/swagger';

export class InvestmentProduct {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  destination: string;

  @ApiProperty()
  rentabilityFee: number;

  @ApiProperty()
  maturity: Date;
}
