import { Injectable } from '@angular/core';
import { Image } from '../models/Recipe';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
  AbstractControl,
  ValidatorFn,
  Validator,
  NG_VALIDATORS,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(private fb: FormBuilder) {}

    /**
     * @function getFormGroup
     * @returns FormGroup
     */
    getFormGroup() {
        return this.fb.group({
            title: [null, Validators.required],
            description: [null],
            amount: [null, Validators.required],
            measurement: [null, Validators.required],
            cookTime: [null, [Validators.required, Validators.min(1), Validators.max(360)],],
            prepTime: [null, [Validators.required, Validators.min(1), Validators.max(60)],],
            servings: [null, [Validators.required, Validators.min(1), Validators.max(20)],],
        });
    }

  /**
   * @function buildIngredient
   * @description Build out Ingredient Object
   * @returns Ingredient
   * @Note example of currying
   */
  buildIngredient = (amount: string) => (measurement: string) => (name: string) => (uuid: string) => {
        return {
            amount: parseInt(amount),
            measurement: measurement,
            name: name,
            uuid: uuid
        };
    };

  /**
   * @function getDefaultImage
   * @returns Image default empty instance
   */
  getDefaultImage(): Image {
    return { full: '', medium: '', small: '' };
  }
}
