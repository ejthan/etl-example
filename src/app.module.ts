import { Module } from '@nestjs/common';
import { EtlCommand } from './etl.command';

@Module({
  imports: [],
  controllers: [],
  providers: [EtlCommand],
})
export class AppModule {}
