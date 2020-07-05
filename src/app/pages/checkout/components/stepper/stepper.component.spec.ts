import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperComponent } from './stepper.component';
import {CheckoutStep} from '../../models/checkout-step.model';

describe('StepperComponent', () => {
  let component: StepperComponent;
  let fixture: ComponentFixture<StepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should activate step with defined index', () => {
    expect(component).toBeTruthy();

    const steps = [
      {id: 1, name: 'Test', isCompleted: true},
      {id: 2, name: 'Test', isCompleted: false}
    ];
    component.steps = steps;
    const index = 0;
    component.setActiveStep(index);

    expect(component.activeStep.id).toBe(steps[index].id);
    expect(component.activeStepIndex).toBe(index);
  });

  it('should switch to next step if current is completed', () => {
    expect(component).toBeTruthy();

    const steps = [
      {id: 1, name: 'Test', isCompleted: true},
      {id: 2, name: 'Test', isCompleted: false}
    ];
    component.steps = steps;
    component.activeStepIndex = 0;

    const newIndex = 1;
    component.switchToStep(steps[newIndex].id);

    expect(component.activeStepIndex).toBe(newIndex);
  });

  it('shouldn\'t go to next step if current step is inCompleted', () => {
    expect(component).toBeTruthy();

    const steps = [
      {id: 1, name: 'Test', isCompleted: false},
      {id: 2, name: 'Test', isCompleted: false}
    ];
    component.steps = steps;
    const currIndex = 0;
    component.activeStepIndex = 0;

    const newIndex = 1;
    component.switchToStep(steps[newIndex].id);

    expect(component.activeStepIndex).toBe(currIndex);
  });

  it('should switch to step with lower index', () => {
    expect(component).toBeTruthy();

    const steps = [
      {id: 1, name: 'Test', isCompleted: true},
      {id: 2, name: 'Test', isCompleted: true}
    ];
    component.steps = steps;
    component.activeStepIndex = 1;

    const newIndex = 0;
    component.switchToStep(steps[newIndex].id);

    expect(component.activeStepIndex).toBe(newIndex);
  });


  it('shouldn\'t switch to next completed step if current is not completed', () => {
    expect(component).toBeTruthy();

    const steps = [
      {id: 1, name: 'Test', isCompleted: false},
      {id: 2, name: 'Test', isCompleted: true}
    ];
    component.steps = steps;
    const currIndex = 0;
    component.activeStepIndex = 0;

    const newIndex = 1;
    component.switchToStep(steps[newIndex].id);

    expect(component.activeStepIndex).toBe(currIndex);
  });

  it('should complete step', () => {
    expect(component).toBeTruthy();

    const steps = [{id: 1, name: 'Test', isCompleted: false}];
    component.steps = steps;
    const index = 0;
    component.completeStep(steps[index].id);

    expect(component.steps[index].isCompleted).toBeTruthy();
  });

  it('should incomplete step', () => {
    expect(component).toBeTruthy();

    const steps = [{id: 1, name: 'Test', isCompleted: true}];
    component.steps = steps;
    const index = 0;
    component.incompleteStep(steps[index].id);

    expect(component.steps[index].isCompleted).toBeFalsy();
  });

});
