import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CounterComponent} from '../../shared/counter/counter.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {ProductsService} from '../../services/products.service';
import {of} from 'rxjs';
import {CustomCurrencyPipe} from '../../pipes/custom-currency.pipe';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let service: ProductsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductListComponent, CounterComponent, CustomCurrencyPipe],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule,
        RouterTestingModule,
      ],
      providers: [CustomCurrencyPipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    service = TestBed.get(ProductsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch the products', () => {
    // Arrange
    const fetchProductSpy = spyOn(
      service,
      'getProducts'
    ).and.returnValue(of([{id: '1aab-3213', name: 'Product name', quantity: 3, price: 10 }]));
    component.ngOnInit();
    expect(fetchProductSpy).toHaveBeenCalled();
  });
});
