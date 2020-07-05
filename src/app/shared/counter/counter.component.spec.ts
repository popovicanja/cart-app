import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterComponent } from './counter.component';

describe('QuantityCounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be increased by 1 when increase clicked', () => {
    expect(component).toBeTruthy();

    component.counter = 1;
    fixture.detectChanges();
    component.increase();
    expect(component.counter).toEqual(2);
  });

  it('should be increased by 2 when increase clicked two times', () => {
    expect(component).toBeTruthy();

    component.counter = 1;
    fixture.detectChanges();
    component.increase();
    component.increase();
    expect(component.counter).toEqual(3);
  });

  it('should stay 1 when decrease clicked', () => {
    expect(component).toBeTruthy();

    component.counter = 1;
    fixture.detectChanges();
    component.decrease();
    expect(component.counter).toEqual(1);
  });

  it('should decrease by one when counter bigger then 1', () => {
    expect(component).toBeTruthy();

    component.counter = 1;
    fixture.detectChanges();
    component.increase();
    component.decrease();
    expect(component.counter).toEqual(1);
  });
});
