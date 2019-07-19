import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../../../services/user.service';
import { User } from '../../../../../shared/User';
import { AuthService } from '../../../../../services/auth.service';
import { FormHelpers } from '../../../../../shared/FormHelpers';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss']
})
export class AccountFormComponent implements OnInit, OnChanges {
  public showDeleteAccountForm: boolean = false;

  public formAcc: FormGroup;
  public submittedAcc: boolean = false;

  public formAccDel: FormGroup;
  public submittedAccDel: boolean = false;

  @Input() user: User;

  @Output('userChange') userChange = new EventEmitter();

  constructor(private fb: FormBuilder, private userService: UserService, private authService: AuthService) {
    this.formAcc = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.email]]
    });

    this.formAccDel = this.fb.group({
      currentPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {}

  ngOnChanges() {
    this.formAcc.patchValue({
      username: this.user.username,
      email: this.user.email
    });
  }

  accountUpdate() {
    this.submittedAcc = true;
    if (this.formAcc.invalid) return;

    const { value } = this.formAcc;

    this.userService.updateUser(this.user.id, value).subscribe(
      (succResponse: any) => {
        this.userChange.emit();
      },
      errResponse => {
        const errors = FormHelpers.transformBackendErrors(errResponse);
        this.formAcc.setErrors(errors);
      }
    );
  }

  accountDelete() {
    this.submittedAccDel = true;
    if (this.formAccDel.invalid) return;

    const { value } = this.formAccDel;

    this.userService.destroy(this.user.id, value).subscribe(
      (succResponse: any) => {
        this.authService.logout();
      },
      errResponse => {
        const errors = FormHelpers.transformBackendErrors(errResponse);
        this.formAccDel.setErrors(errors);
      }
    );
  }

  fieldHasErrorsAcc(name: string, error: string) {
    const control = this.formAcc.get(name);
    return control && (control.touched || this.submittedAcc) && control.hasError(error);
  }

  fieldHasErrorsAccDel(name: string, error: string) {
    const control = this.formAccDel.get(name);
    return control && (control.touched || this.submittedAccDel) && control.hasError(error);
  }
}
