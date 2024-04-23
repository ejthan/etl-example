import { Command, CommandRunner } from 'nest-commander';
import { Inject, Logger } from '@nestjs/common';
import { JsonFileExtractAdapter } from './extract/json-file.extract-adapter';
import { catchError, concat, concatMap, finalize, lastValueFrom, of } from 'rxjs';
import { ProductTransformAdapter } from './transform/product.transform-adapter';
import { ElasticsearchLoadAdapter } from './load/elasticsearch.load-adapter';
import { ExtractProductInterface } from './interfaces/extract-product.interface';
import { ElasticsearchProductInterface } from './interfaces/elasticsearch-product.interface';

@Command({
  name: 'etl',
  description: 'An etl-example tool to show the possibilities to transform the given dataset with rxjs',
})
export class EtlCommand extends CommandRunner {
  private readonly logger = new Logger(EtlCommand.name);

  @Inject(JsonFileExtractAdapter)
  private readonly jsonFileExtractAdapter: JsonFileExtractAdapter;

  @Inject(ProductTransformAdapter)
  private readonly productTransformAdapter: ProductTransformAdapter;

  @Inject(ElasticsearchLoadAdapter)
  private readonly elasticsearchLoadAdapter: ElasticsearchLoadAdapter;

  async run(): Promise<void> {
    const config = { chunkSize: 1000 };
    this.logger.log('Starting ETL process');
    await lastValueFrom(
      concat(
        this.jsonFileExtractAdapter.extract(config).pipe(
          concatMap((data: ExtractProductInterface[]) => this.productTransformAdapter.transform(data, config)),
          concatMap((transformedData: ElasticsearchProductInterface[]) => this.elasticsearchLoadAdapter.load(transformedData, config)),
        ),
        this.elasticsearchLoadAdapter.finalize(config),
      ).pipe(finalize(() => this.logger.log('EtL process completed!'))),
    );
  }
}
