import { TransformAdapterInterface } from '../interfaces/transform-adapter.interface';
import { Observable, of } from 'rxjs';

export class ProductTransformAdapter implements TransformAdapterInterface<any[], any, any> {
  transform(payload: any[], config: any): Observable<any[]> {
    return of(payload.map((product) => {
      product.price = product.price * 2;
      return product;
    }));
  }
}