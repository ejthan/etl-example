import { Module } from '@nestjs/common';
import { EtlCommand } from './etl.command';
import { JsonFileExtractAdapter } from './extract/json-file.extract-adapter';
import { ProductTransformAdapter } from './transform/product.transform-adapter';
import { ElasticsearchLoadAdapter } from './load/elasticsearch.load-adapter';

@Module({
  imports: [],
  controllers: [],
  providers: [EtlCommand, JsonFileExtractAdapter, ProductTransformAdapter, ElasticsearchLoadAdapter],
})
export class AppModule {}
