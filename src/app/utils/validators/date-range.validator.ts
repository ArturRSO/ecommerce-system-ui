import { FormGroup } from '@angular/forms';

export function DateRange(startControlName: string, endControlName: string) {
  return (formGroup: FormGroup) => {
    const startControl = formGroup.controls[startControlName];
    const endControl = formGroup.controls[endControlName];

    if (endControl.errors && !endControl.errors.mustMatch) {

      return;
    }

    if (Date.parse(startControl.value) > Date.parse(endControl.value)) {
      endControl.setErrors({ dateRange: true });

    } else {
      endControl.setErrors(null);
    }
  }
}
