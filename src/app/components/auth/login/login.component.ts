import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

import { FormHelpers } from '../../../shared/FormHelpers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public submitted: boolean = false;

  constructor(private authService: AuthService, fb: FormBuilder) {
    this.form = fb.group({
      email: ['', [Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  login() {
    this.submitted = true;
    if (this.form.invalid) return;
    const { value } = this.form;

    this.authService.attempt({ email: value.email, password: value.password }).catch(errResponse => {
      const errors = FormHelpers.transformBackendErrors(errResponse);
      this.form.setErrors(errors);
    });
  }

  fieldHasErrors(name: string, error: string) {
    const control = this.form.get(name);
    return control && (control.touched || this.submitted) && control.hasError(error);
  }
}
