import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { fileIsImage, filterObjectProperties } from '../../../shared/Helpers';
import { User } from '../../../shared/User';
import { RoleService } from '../../../services/role.service';
import { Role } from '../../../shared/Role';
import { FormHelpers } from '../../../shared/FormHelpers';

@Component({
  selector: 'app-user-edit-form',
  templateUrl: './user-edit-form.component.html',
  styleUrls: ['./user-edit-form.component.scss']
})
export class UserEditFormComponent implements OnInit {
  public form: FormGroup;
  public submitted: boolean = false;
  public isEditMode: boolean = false;

  public selectedImage = null;
  public selectedImageUrl = null;

  public userToEdit: User = null;
  public roles: Role[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private roleService: RoleService
  ) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    this.initRoles();
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.isEditMode = params.has('id');
      this.createForm();
      if (this.isEditMode) {
        this.initForm(params.get('id'));
      }
    });
  }

  createForm() {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.email]],
      password: ['', this.isEditMode ? [] : [Validators.required, Validators.minLength(6)]],
      image: ['', this.isEditMode ? [] : [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      role_id: ['0', [Validators.required, Validators.min(1)]]
    });
  }

  handleSubmit() {
    this.submitted = true;
    if (this.form.invalid) return;
    this.isEditMode ? this.updateUser() : this.createUser();
  }

  initRoles() {
    this.roleService.all().subscribe((roles: Role[]) => {
      this.roles = roles;
    });
  }

  initForm(id) {
    this.userService.find(id).subscribe((user: User) => {
      this.userToEdit = user;
      const filteredObj = filterObjectProperties(['username', 'email', 'description', 'role_id'], user);
      this.selectedImageUrl = user.image;
      this.form.patchValue({ ...filteredObj });
    });
  }

  createUser() {
    const { value } = this.form;
    const fd = new FormData();

    Object.entries(value).forEach(([key, val]: any) => fd.append(key, val));
    fd.set('image', this.selectedImage);

    this.userService.create(fd).subscribe(
      succResponse => {
        this.router.navigate(['/admin']);
      },
      errResponse => {
        const errors = FormHelpers.transformBackendErrors(errResponse);
        this.form.setErrors(errors);
      }
    );
  }

  updateUser() {
    const { value } = this.form;
    const fd = new FormData();

    Object.entries(value).forEach(([key, val]: any) => fd.append(key, val));
    if (this.selectedImage) {
      fd.set('image', this.selectedImage);
    } else {
      fd.delete('image');
    }
    fd.append('_method', 'PUT');

    this.userService.updateUser(this.userToEdit.id, fd).subscribe(
      succResponse => {
        this.router.navigate(['/admin']);
      },
      errResponse => {
        const errors = FormHelpers.transformBackendErrors(errResponse);
        this.form.setErrors(errors);
      }
    );
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

  fieldHasErrors(name: string, error: string) {
    const control = this.form.get(name);
    return control && (control.touched || this.submitted) && control.hasError(error);
  }

  cancel() {
    this.router.navigate(['/admin']);
  }
}
