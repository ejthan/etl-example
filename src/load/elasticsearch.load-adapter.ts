import { LoadAdapterInterface } from '../interfaces/load-adapter.interface';
import { Observable } from 'rxjs';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ElasticsearchLoadAdapter implements LoadAdapterInterface<any, any> {
  private readonly logger = new Logger(ElasticsearchLoadAdapter.name);

  load(transformed: any[], config: any): Observable<boolean> {
    this.logger.log(`Loading ${transformed.length} objects to Elasticsearch`);
    return undefined;
  }

  finalize(config: any): Observable<boolean> {
    return undefined;
  }
}
