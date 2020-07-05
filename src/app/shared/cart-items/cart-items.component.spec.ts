import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CartItemsComponent } from './cart-items.component';
import {CounterComponent} from '../counter/counter.component';
import {RouterTestingModule} from '@angular/router/testing';
import {CustomCurrencyPipe} from '../../pipes/custom-currency.pipe';

describe('CartItemsComponent', () => {
  let component: CartItemsComponent;
  let fixture: ComponentFixture<CartItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ CartItemsComponent, CounterComponent, CustomCurrencyPipe ],
      providers: [CustomCurrencyPipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
