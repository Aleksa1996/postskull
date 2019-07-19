import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { User } from '../../../../../shared/User';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../../../../../services/user.service';
import { fileIsImage } from '../../../../../shared/Helpers';
import { FormHelpers } from '../../../../../shared/FormHelpers';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {
  @Input() user: User;
  @Output('userChange') userChange = new EventEmitter();

  public form: FormGroup;
  public submitted: boolean = false;

  public selectedImage = null;
  public selectedImageUrl = null;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit() {
    this.selectedImageUrl = this.user.image;
    this.form = this.fb.group({
      image: [''],
      description: [this.user.description, [Validators.required, Validators.minLength(2)]]
    });
  }

  selectImage(e) {
    this.selectedImage = e.target.files[0];

    if (!fileIsImage(this.selectedImage)) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.selectedImage);
    reader.onload = (ev: any) => {
      this.selectedImageUrl = ev.target.result;
    };
  }

  updateProfile() {
    this.submitted = true;
    if (this.form.invalid) return;

    const { value } = this.form;
    const fd = new FormData();

    if (value.image.length != 0) {
      fd.append('image', this.selectedImage);
    }

    fd.append('_method', 'PUT');
    fd.append('description', value.description);

    this.userService.updateUser(this.user.id, fd).subscribe(
      (succResponse: any) => {
        this.userChange.emit();
      },
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
