import { ExtractAdapterInterface } from '../interfaces/extract-adapter.interface';
import { Observable, of } from 'rxjs';
import * as fs from 'fs';
import * as path from 'path';
import { ExtractProductInterface } from '../interfaces/extract-product.interface';
import { EtlConfigInterface } from '../interfaces/etl-config.interface';
import { Injectable, Logger } from '@nestjs/common';

const FILE_NAME = 'products_dataset.json';

@Injectable()
export class JsonFileExtractAdapter implements ExtractAdapterInterface<ExtractProductInterface[], EtlConfigInterface> {
  private readonly logger = new Logger(JsonFileExtractAdapter.name);

  extract(config: EtlConfigInterface): Observable<ExtractProductInterface[]> {
    const rawData = fs.readFileSync(path.resolve(__dirname, `../../data/${FILE_NAME}`), 'utf-8');
    const data = JSON.parse(rawData);
    this.logger.log(`Extracted ${data.length} products from ${FILE_NAME}`);
    return of(data);
  }
}
