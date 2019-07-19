import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SectionService } from '../../../services/section.service';
import { FormHelpers } from '../../../shared/FormHelpers';
import { Section } from '../../../shared/Section';

@Component({
  selector: 'app-section-edit-form',
  templateUrl: './section-edit-form.component.html',
  styleUrls: ['./section-edit-form.component.scss']
})
export class SectionEditFormComponent implements OnInit {
  public form: FormGroup;
  public submitted: boolean = false;
  public isEditMode: boolean = false;

  public sectionToEdit: Section = null;

  constructor(fb: FormBuilder, private router: Router, private route: ActivatedRoute, private sectionService: SectionService) {
    this.form = fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.isEditMode = params.has('id');
      if (this.isEditMode) {
        this.initForm(params.get('id'));
      }
    });
  }

  handleSubmit() {
    this.submitted = true;
    if (this.form.invalid) return;
    this.isEditMode ? this.updateSection() : this.createSection();
  }

  initForm(id) {
    this.sectionService.find(id).subscribe((section: Section) => {
      this.sectionToEdit = section;
      this.form.patchValue({ name: section.name });
    });
  }

  createSection() {
    const { value } = this.form;

    this.sectionService.create(value).subscribe(
      succResponse => {
        this.sectionService.sectionsChanged.next();
        this.router.navigate(['/admin']);
      },
      errResponse => {
        const errors = FormHelpers.transformBackendErrors(errResponse);
        this.form.setErrors(errors);
      }
    );
  }

  updateSection() {
    const { value } = this.form;

    this.sectionService.update(this.sectionToEdit.id, value).subscribe(
      succResponse => {
        this.sectionService.sectionsChanged.next();
        this.router.navigate(['/admin']);
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

  cancel() {
    this.router.navigate(['/admin']);
  }
}
