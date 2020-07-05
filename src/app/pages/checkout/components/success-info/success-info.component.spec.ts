import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessInfoComponent } from './success-info.component';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

describe('SuccessInfoComponent', () => {
  let component: SuccessInfoComponent;
  let fixture: ComponentFixture<SuccessInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessInfoComponent ],
      providers: [NgbActiveModal]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
