import { Observable } from 'rxjs';

export interface ExtractAdapterInterface<P, T> {
  extract(config: T): Observable<P>;
}