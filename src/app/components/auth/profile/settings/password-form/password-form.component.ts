import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../../../services/user.service';
import { User } from '../../../../../shared/User';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormHelpers } from '../../../../../shared/FormHelpers';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss']
})
export class PasswordFormComponent implements OnInit {
  @Input() user: User;

  public form: FormGroup;
  public submitted: boolean = false;

  constructor(private userService: UserService, fb: FormBuilder) {
    this.form = fb.group({
      current_password: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {}

  changePassword() {
    this.submitted = true;
    if (this.form.invalid) return;
    const { value } = this.form;

    this.userService.updateUser(this.user.id, value).subscribe(
      (succResponse: any) => {},
      errResponse => {
        const errors = FormHelpers.transformBackendErrors(errResponse);
        this.form.setErrors(errors);
      }
    );
  }

  fieldHasErrors(name: string, error: string) {
    const control = this.form.get(name);
    return control && (control.touched || this.submitted) && control.hasError(error);
  }
}
