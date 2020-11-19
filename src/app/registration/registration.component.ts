import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { BaseFormComponent } from '../shared/models/BaseFormComponent';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent extends BaseFormComponent implements OnInit {
  form = this.fb.group({
    nameControl: ['', [Validators.required]],
    emailControl: ['', [Validators.required, Validators.email]],
    dateControl: ['', [Validators.required]],
    passwordControl: ['', [Validators.required]],
    passwordReapeatControl: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private userService: UserService) {
    super();
  }

  ngOnInit(): void {}

  onSumbit() {}
}
