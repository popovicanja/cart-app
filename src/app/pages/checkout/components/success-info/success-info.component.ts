import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ca-success-info',
  templateUrl: './success-info.component.html',
  styleUrls: ['./success-info.component.scss']
})
export class SuccessInfoComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
