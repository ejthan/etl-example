import { LoadAdapterInterface } from '../interfaces/load-adapter.interface';
import { Observable } from 'rxjs';

export class ElasticsearchLoadAdapter implements LoadAdapterInterface<any, any> {
  load(transformed: any[], config: any): Observable<boolean> {
    return undefined;
  }

  finalize(config: any): Observable<boolean> {
    return undefined;
  }
}