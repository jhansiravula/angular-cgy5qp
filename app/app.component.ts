import { Component } from '@angular/core';
import {
  ValidatorFn,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { FormControl, ValidationErrors } from '@angular/forms/src/forms';

export function beamValidator(): ValidatorFn {
  return (fg: FormGroup): ValidationErrors | null => {
    //const beam = fg.get('beam').value;
    // const length = fg.get('length').value;

    // return beam < length ? null : { beamError: true };

    const start = fg.get('beam').value;
    const end = fg.get('length').value;
    let re = /^[1-9]\d*$/;
    if (re.test(start) && re.test(end)) {
      return null;
    } else if (re.test(start) && !re.test(end)) {
      return null;
    } else if (!re.test(start) && re.test(end)) {
      return null;
    } else {
      return { range: true };
    }
  };
}

@Component({
  selector: 'my-app',
  template: `
  <form [formGroup]="form">
    <input formControlName="beam" type="text" />
    <input formControlName="length" type="text" />
  </form>


  {{ form.valid }}

  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  form: FormGroup;
  beam = new FormControl('', { validators: beamValidator() });
  length = new FormControl('', { validators: beamValidator() });
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      beam: this.beam,
      length: this.length,
    });
  }
}
