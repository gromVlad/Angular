import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'main-child',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  formValueObj: {} | null = null;

  ngOnInit(): void {
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
