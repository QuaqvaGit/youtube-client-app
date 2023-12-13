import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export default class FormComponent {
  @Input({ required: true }) form!: FormGroup;

  @Input({ required: true }) onSubmit!: (() => void) | (() => Promise<void>);

  @Input() title = '';

  @Input() submitText = 'submit';
}
