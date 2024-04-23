import { TransformableInterface } from './transformable.interface';

export interface ElasticsearchProductInterface extends TransformableInterface {
  id: string;
  title: string;
  description: string;
  price: number;
  date: Date;
  facets: Facet[];
}

export interface Facet {
  key: string;
  value: string;
}