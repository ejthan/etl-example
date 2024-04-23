import { Observable } from 'rxjs';

export interface LoadAdapterInterface<I, T> {
    load(transformed: I[], config: T): Observable<boolean>;
    finalize(config: T): Observable<boolean>;
}