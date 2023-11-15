import { Component } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import GenericValidationMessagePipe from 'src/app/shared/pipes/generic-validation-message.pipe';
import pastDateValidator from '../../validators/past-date.validator';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export default class AdminPageComponent {
  form = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    description: ['', [Validators.maxLength(255)]],
    thumbnailLink: ['', [Validators.required]],
    videoLink: ['', [Validators.required]],
    creationDate: ['', [Validators.required, pastDateValidator]],
    tags: this.formBuilder.array([this.formBuilder.control('', [Validators.required])])
  });

  mainInputs = Object.values(this.form.controls).slice(0, -1);

  names = ['title', 'description', 'thumbnail link', 'video link', 'creation date', 'tag'];

  validationPipes = this.names.map((name) => {
    const pipe = new GenericValidationMessagePipe();
    pipe.inputName = name;
    return pipe;
  });

  tagsForm = this.form.get('tags') as FormArray;

  public constructor(private formBuilder: FormBuilder) {}

  onTagAdd(): void {
    this.tagsForm.push(this.formBuilder.control('', [Validators.required]));
  }

  onReset(): void {
    this.form.reset();
    this.tagsForm.clear();
    this.onTagAdd();
  }

  // eslint-disable-next-line class-methods-use-this
  onSubmit(): void {}
}
