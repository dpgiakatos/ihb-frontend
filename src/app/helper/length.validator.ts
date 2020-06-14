import { ValidatorFn, AbstractControl } from '@angular/forms';

export function minLength(min: number): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const surrogatePairs = control.value?.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g) || [];
    const len = (control.value?.length ?? 0) - surrogatePairs.length;
    return len < min ? { minlength: { requiredLength: min, actualLength: len } } : null;
  };
}

export function maxLength(max: number): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const surrogatePairs = control.value?.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g) || [];
    const len = (control.value?.length ?? 0) - surrogatePairs.length;
    return len > max ? { maxlength: { requiredLength: max, actualLength: len } } : null;
  };
}
