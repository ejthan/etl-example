import { TransformAdapterInterface } from '../interfaces/transform-adapter.interface';
import { bufferCount, concatMap, forkJoin, mergeMap, Observable, of } from 'rxjs';
import { ExtractProductInterface } from '../interfaces/extract-product.interface';
import { EtlConfigInterface } from '../interfaces/etl-config.interface';
import { Injectable, Logger } from '@nestjs/common';
import { ElasticsearchProductInterface } from '../interfaces/elasticsearch-product.interface';

@Injectable()
export class ProductTransformAdapter implements TransformAdapterInterface<ExtractProductInterface[], any, EtlConfigInterface> {
  private readonly logger = new Logger(ProductTransformAdapter.name);

  transform(payload: ExtractProductInterface[], config: EtlConfigInterface): Observable<any[]> {
    return of(payload).pipe(
      mergeMap((o: ExtractProductInterface[]) => o),
      bufferCount(config.chunkSize),
      concatMap((objects: ExtractProductInterface[]) => {
        this.logger.log(`Transforming batch of ${objects.length} products`);
        const transformedObjects: Observable<ElasticsearchProductInterface>[] = [];
        for (const object of objects) {
          transformedObjects.push(this.transformProduct(object));
        }

        return forkJoin(transformedObjects);
      }),
    );
  }

  transformProduct(object: ExtractProductInterface): Observable<ElasticsearchProductInterface> {
    return forkJoin({
      _etlBase: of({
        id: object._id,
        transformDate: new Date(),
      }),
      id: of(object._id),
      title: of(object.title),
      description: of(object.description),
      price: of(+object.selling_price),
      date: of(new Date(object.crawled_at)),
      facets: of([]),
    });
  }
}
