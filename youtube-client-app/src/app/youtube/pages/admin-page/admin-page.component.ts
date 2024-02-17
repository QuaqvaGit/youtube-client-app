import { Component } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';

import GenericValidationMessagePipe from 'src/app/shared/pipes/generic-validation-message.pipe';

import { Store } from '@ngrx/store';
import addCustomVideo from 'src/app/redux/actions/add-custom-video.action';
import selectCustomId from 'src/app/redux/selectors/custom-id.selector';
import { AppState } from 'src/app/redux/state.model';
import { firstValueFrom } from 'rxjs';

import pastDateValidator from '../../validators/past-date.validator';
import { Video } from '../../models/video.model';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export default class AdminPageComponent {
  form = this.formBuilder.group({
    title: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    ],
    description: ['', [Validators.maxLength(255)]],
    thumbnailLink: ['', [Validators.required]],
    videoLink: ['', [Validators.required]],
    creationDate: ['', [Validators.required, pastDateValidator]],
    tags: this.formBuilder.array([
      this.formBuilder.control('', [Validators.required]),
    ]),
  });

  mainInputs = Object.values(this.form.controls).slice(0, -1);

  names = [
    'title',
    'description',
    'thumbnail link',
    'video link',
    'creation date',
    'tag',
  ];

  validationPipes = this.names.map((name) => {
    const pipe = new GenericValidationMessagePipe();
    pipe.inputName = name;
    return pipe;
  });

  tagsForm = this.form.get('tags') as FormArray;

  // eslint-disable-next-line @ngrx/no-typed-global-store
  public constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private toast: ToastService,
  ) {}

  onTagAdd(): void {
    this.tagsForm.push(this.formBuilder.control('', [Validators.required]));
  }

  onReset(): void {
    this.form.reset();
    this.tagsForm.clear();
    this.onTagAdd();
  }

  async onSubmit(): Promise<void> {
    const generatedId = await firstValueFrom(this.store.select(selectCustomId));
    const video: Video = {
      id: generatedId,
      title: this.form.get('title')!.value!,
      thumbnail: this.form.get('thumbnailLink')!.value!,
      videoUrl: this.form.get('videoLink')!.value!,
      publishDate: this.form.get('creationDate')!.value!,
      tags: this.tagsForm.value,
    };
    const description = this.form.get('description')?.value;
    if (description) video.description = description;
    this.store.dispatch(addCustomVideo({ video }));
    this.router.navigateByUrl('videos');
    this.toast.error('Video added successfully');
  }
}
