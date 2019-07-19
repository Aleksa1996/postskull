import { Component, OnInit } from '@angular/core';
import { SectionService } from '../../../services/section.service';
import { PostService } from '../../../services/post.service';
import { Section } from '../../../shared/Section';

import { FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { fileIsImage } from '../../../shared/Helpers';
import { FormHelpers } from '../../../shared/FormHelpers';

@Component({
  selector: 'app-post-new-form',
  templateUrl: './post-new-form.component.html',
  styleUrls: ['./post-new-form.component.scss']
})
export class PostNewFormComponent implements OnInit {
  public form: FormGroup;
  public submitted: boolean = false;

  public selectedImage = null;
  public selectedImageUrl = null;

  public sections: Section[];

  constructor(
    private fb: FormBuilder,
    private sectionService: SectionService,
    public postService: PostService,
    private router: Router
  ) {
    this.form = fb.group({
      image: ['', [Validators.required]],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      sensitive: [false, [Validators.required]],
      section_id: ['0', [Validators.required, Validators.min(1)]],
      tags: this.fb.array([this.createTag()])
    });
  }

  ngOnInit() {
    this.sectionService.all().subscribe((sections: Section[]) => {
      this.sections = sections;
    });
  }

  get tagsArray() {
    return this.form.get('tags') as FormArray;
  }

  createTag() {
    return this.fb.group({ name: ['', [Validators.required]] });
  }

  addTag() {
    (<FormArray>this.form.controls.tags).push(this.createTag());
  }

  removeTag(index: number) {
    (<FormArray>this.form.controls.tags).removeAt(index);
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

  createPost() {
    this.submitted = true;
    if (this.form.invalid) return;

    const { value } = this.form;
    const fd = new FormData();

    Object.entries(value).forEach(([key, val]: any) => fd.append(key, val));
    fd.set('image', this.selectedImage);
    fd.set('sensitive', value.sensitive ? '1' : '0');
    fd.set('tags', JSON.stringify(value.tags));

    this.postService.create(fd).subscribe(
      (succResponse: any) => {
        this.router.navigate(['/post', succResponse.id]);
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
