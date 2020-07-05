import {Product} from './product.model';

export class Cart {
  items: Product[];
  totalSum: number;
  totalItems: number;

  constructor() {
    this.items = [];
    this.totalSum = 0;
    this.totalItems = 0;
  }
}
