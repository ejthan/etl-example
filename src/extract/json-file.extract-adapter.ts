import { ExtractAdapterInterface } from '../interfaces/extract-adapter.interface';
import { Observable } from 'rxjs';

export class JsonFileExtractAdapter implements ExtractAdapterInterface<unknown, any> {
  extract(): Observable<unknown> {
    throw new Error('Method not implemented.');
  }
}