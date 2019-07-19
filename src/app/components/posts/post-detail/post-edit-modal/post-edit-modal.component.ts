import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SectionService } from '../../../../services/section.service';
import { PostService } from '../../../../services/post.service';
import { Section } from '../../../../shared/Section';
import { FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Post } from '../../../../shared/Post';
import { fileIsImage } from '../../../../shared/Helpers';
import { FormHelpers } from '../../../../shared/FormHelpers';

@Component({
  selector: 'app-post-edit-modal',
  templateUrl: './post-edit-modal.component.html',
  styleUrls: ['./post-edit-modal.component.scss']
})
export class PostEditModalComponent implements OnInit {
  @Input() post: Post;
  public sections: Section[];

  public form: FormGroup = null;
  public submitted: boolean = false;

  public selectedImage = null;
  public selectedImageUrl = null;

  constructor(
    private fb: FormBuilder,
    private sectionService: SectionService,
    public postService: PostService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.sectionService.all().subscribe((sections: Section[]) => {
      this.sections = sections;
    });

    this.selectedImageUrl = this.post.image;
    this.form = this.fb.group({
      image: [''],
      title: [this.post.title, [Validators.required]],
      description: [this.post.description, [Validators.required]],
      sensitive: [this.post.sensitive == 1 ? true : false, [Validators.required]],
      section_id: [this.post.section_id, [Validators.required, Validators.min(1)]],
      tags: this.fb.array(this.post.tags.map(t => this.fb.group({ name: [t.name, [Validators.required]] })))
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

  closeModal() {
    this.activeModal.close();
  }

  editPost() {
    this.submitted = true;
    if (this.form.invalid) return;

    const { value } = this.form;
    const fd = new FormData();

    Object.entries(value).forEach(([key, val]: any) => fd.append(key, val));
    fd.delete('image');
    fd.append('_method', 'PUT');
    if (value.image.length != 0) {
      fd.set('image', this.selectedImage);
    }
    fd.set('sensitive', value.sensitive ? '1' : '0');
    fd.set('tags', JSON.stringify(value.tags));

    this.postService.update(this.post.id, fd).subscribe(
      succResponse => {
        this.postService.find(this.post.id);
        this.activeModal.close();
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
