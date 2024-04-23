import { Observable } from 'rxjs';

export interface TransformAdapterInterface<P, O, T> {
  transform(payload: P, config: T): Observable<O[]>;
}