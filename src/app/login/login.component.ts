import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseFormComponent } from '../shared/models/BaseFormComponent';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseFormComponent implements OnInit {
  form = this.fb.group({
    emailControl: ['', [Validators.required, Validators.email]],
    passwordControl: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {}

  onSubmit() {}
}
