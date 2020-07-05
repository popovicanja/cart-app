import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../models/product.model';

@Component({
  selector: 'ca-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.scss']
})
export class CartItemsComponent implements OnInit {

  @Input() items: Product[];
  @Input() totalSum: number;

  @Output() remove: EventEmitter<string> = new EventEmitter<string>();
  @Output() quantityChange: EventEmitter<{item: Product, quantity: number}> = new EventEmitter<{item: Product, quantity: number}>();

  constructor() { }

  ngOnInit() {
  }

  onQuantityChange(item: Product, quantity: number) {
    this.quantityChange.emit({item, quantity});
  }

  onRemove(productId: string) {
    this.remove.emit(productId);
  }

}
