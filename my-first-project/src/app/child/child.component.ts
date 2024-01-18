import { Component, OnInit} from '@angular/core';
import { BeatyLoggerServiceService } from '../beaty/beaty-logger-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'main-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
})
export class ChildComponent implements OnInit {
  formValueObj: {} | null = null;

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  profileForm = new FormGroup({
    firstName: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]*')]),
    lastName: new FormControl('', Validators.required),
  });

  submitForm() {
    this.formValueObj = this.profileForm.value;
  }

  get firstName() {
    return this.profileForm.get('firstName');
  }

  get lastName() {
    return this.profileForm.get('firstName');
  }
}
