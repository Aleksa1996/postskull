import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { FormHelpers } from '../../../shared/FormHelpers';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public form: FormGroup;
  public submitted: boolean = false;

  constructor(private authService: AuthService, fb: FormBuilder) {
    this.form = fb.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  signup() {
    this.submitted = true;
    if (this.form.invalid) return;

    const {
      value: { username, email, password }
    } = this.form;

    this.authService.register({ username, email, password }).catch(errResponse => {
      const errors = FormHelpers.transformBackendErrors(errResponse);
      this.form.setErrors(errors);
    });
  }

  fieldHasErrors(name: string, error: string) {
    const control = this.form.get(name);
    return control && (control.touched || this.submitted) && control.hasError(error);
  }
}
