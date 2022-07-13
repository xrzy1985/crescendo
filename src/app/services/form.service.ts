import { Injectable } from '@angular/core';
import { Direction, Image, FullRecipe } from '../models/Recipe';
import { UtilService } from './util.service';
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
    constructor(private fb: FormBuilder, private util: UtilService) {}

    addDirection = (direction: String) => (option: String) => (recipe: FullRecipe) => {
        recipe.directions.push({instructions: this.util.capitalize(direction), optional: option === 'Optional'});
        return recipe;
    };

    /**
     * @function tbd
     */
    setFormValues(recipeForm: any, data: any) {
        recipeForm.controls['title'].setValue(data.title);
        recipeForm.controls['description'].setValue(data.description);
        recipeForm.controls['servings'].setValue(data.servings);
        recipeForm.controls['cookTime'].setValue(data.cookTime);
        recipeForm.controls['prepTime'].setValue(data.prepTime);
        return recipeForm;
    }

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
