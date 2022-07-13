import { Injectable } from '@angular/core';
import { Direction, Ingredient, Image, FullRecipe } from '../models/Recipe';
import { UtilService } from './util.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {

    constructor(private fb: FormBuilder, private util: UtilService) {}

    addDirection = (direction: String) => (option: String) => (recipe: FullRecipe): FullRecipe => {
        recipe.directions.push({instructions: this.util.capitalize(direction), optional: option === 'Optional'});
        return recipe;
    };

    /**
     * @function setFormValues
     */
    setFormValues(recipeForm: any, data: any) {
        recipeForm.controls['title'].setValue(data.title);
        recipeForm.controls['description'].setValue(data.description);
        recipeForm.controls['servings'].setValue(data.servings);
        recipeForm.controls['cookTime'].setValue(data.cookTime);
        recipeForm.controls['prepTime'].setValue(data.prepTime);
        return recipeForm;
    }

    setFormValue(form: any, value: keyof any, val: any) {
        form.controls[value].setValue(val);
        return form;
    }

    /**
     * @function getFormGroup
     * @returns FormGroup
     */
    getFormGroup(): FormGroup {
        return this.fb.group({
            title: [null, Validators.required],
            description: [null],
            amount: [null],
            measurement: [null],
            cookTime: [null, [Validators.required, Validators.min(1), Validators.max(360)],],
            prepTime: [null, [Validators.required, Validators.min(1), Validators.max(60)],],
            servings: [null, [Validators.required, Validators.min(1), Validators.max(20)],],
        });
    }

    allowSubmit(recipeForm: any, recipe: FullRecipe) {
        return recipeForm.status !== 'INVALID' && recipe.directions.length > 1 && recipe.ingredients.length > 0;
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

    addIngredient = (ingredient: any) => (amount: any) => (measurement: any) => (recipe: FullRecipe) => {
        if (ingredient && new RegExp('[0-9]').test(amount) && this.util.isDef(amount) && this.util.isDef(measurement)) {
            recipe.ingredients.push(this.buildIngredient(amount)(measurement)(ingredient.name)(ingredient.uuid));
        }
        return recipe;
    }

    removeIngredient(index: number, recipe: FullRecipe) {
        recipe.ingredients.splice(index, 1);
        return recipe;
    }

    /**
     * @function getDefaultImage
     * @returns Image default empty instance
     */
    getDefaultImage(): Image {
        return { full: '', medium: '', small: '' };
    }
}
