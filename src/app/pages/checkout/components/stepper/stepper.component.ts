import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CheckoutStep} from '../../models/checkout-step.model';

@Component({
  selector: 'ca-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {

  @Input() steps: CheckoutStep[];

  @Output() stepChange: EventEmitter<{id: number, name: string}> = new EventEmitter<{id: number, name: string}>();

  activeStep: CheckoutStep;
  activeStepIndex;

  isActive = (step: CheckoutStep) => step.id === this.activeStep.id;

  constructor() { }

  ngOnInit() {
    if (this.steps) {
      this.setActiveStep(0);
    }
  }

  setActiveStep(index: number) {
    this.activeStep = {...this.steps[index]};
    this.activeStepIndex = index;
    this.stepChange.emit({id: this.activeStep.id, name: this.activeStep.name});
  }

  switchToStep(stepId: number) {
    const index = this.getStepIndex(stepId);
    if (this.activeStepIndex < index) {
      let cnt = 0;
      for (let i = 0; i < index; i++) {
        if (this.steps[i].isCompleted) {
          cnt++;
        }
      }
      if (cnt === index) {
        this.setActiveStep(index);
      }
    } else {
      this.setActiveStep(index);
    }
  }

  getStepIndex(id: number) {
    return this.steps.findIndex(el => el.id === id);
  }

  completeStep(stepId: number) {
    const index = this.getStepIndex(stepId);
    this.steps[index].isCompleted = true;
    this.activateNextStep(index);
  }

  activateNextStep(index) {
    if (index < this.steps.length - 1) {
      this.setActiveStep(index + 1);
    }
  }

  incompleteStep(stepId: number) {
    const index = this.getStepIndex(stepId);
    this.steps[index].isCompleted = false;
  }

}
