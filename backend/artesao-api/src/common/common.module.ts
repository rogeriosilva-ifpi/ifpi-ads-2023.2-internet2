import { Global, Module } from '@nestjs/common';
import { Common } from './entities/common.entity';

@Global()
@Module({
  exports: [Common],
})
export class CommonModule {}
