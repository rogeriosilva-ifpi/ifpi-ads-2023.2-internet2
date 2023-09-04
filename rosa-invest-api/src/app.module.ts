import { Module } from '@nestjs/common';
import { ProdutosModule } from './produtos/produtos.module';

@Module({
  imports: [ProdutosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
