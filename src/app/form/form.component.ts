import { Component, Inject } from '@angular/core';
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
import { ErrorStateMatcher } from '@angular/material/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { v4 as uuid } from 'uuid';
import { RecipeService } from '../services/recipe.service';
import { Ingredient, Recipe } from '../models/Recipe';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  recipeForm = this.fb.group({
    cookTime: [
      null,
      [Validators.required, Validators.min(1), Validators.max(300)],
    ],
    description: [null],
    prepTime: [
      null,
      [Validators.required, Validators.min(1), Validators.max(60)],
    ],
    servings: [
      null,
      [Validators.required, Validators.min(1), Validators.max(20)],
    ],
    title: [null, Validators.required],
  });
  options: string[] = ['Optional', 'Not Optional'];
  selectedOption = this.options[1];
  nextDirection: any = '';
  _ingredient_: any;
  amount: any = '';
  measurement: any = '';
  ingredients: any[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FormComponent>,
    private recipeService: RecipeService
  ) {
    this.ingredients = this.recipeService.getIngredients();
  }

  addDirection(dir: string) {
    if (dir) {
      this.data.directions.push({
        instructions: dir[0].toUpperCase() + dir.slice(1),
        optional: this.selectedOption === 'Optional',
      });
      this.nextDirection = '';
    }
  }

  submitRecipe(): void {
    const _recipe = {
      ...this.recipeForm.value,
      directions: this.data.directions,
      ingredients: this.data.ingredients,
      images: { full: '', medium: '', small: '' },
      editDate: new Date().toLocaleString(),
      postDate: new Date().toLocaleString(),
      uuid: uuid(),
    };
    this.recipeService.pushRecipe(_recipe);
    this.dialogRef.close();
  }

  allowSubmit(): boolean {
    return (
      this.recipeForm.status !== 'INVALID' &&
      this.data.directions.length > 1 &&
      this.data.ingredients.length > 0
    );
  }

  allowIngredientSelection(): boolean {
    return this.isDef(this.amount) && this.isDef(this.measurement);
  }

  addIngredient(ingredient: any) {
    if (
      ingredient &&
      new RegExp('[0-9]').test(this.amount) &&
      this.isDef(this.amount) &&
      this.isDef(this.measurement)
    ) {
      let _ingredient: Ingredient = {
        amount: parseInt(this.amount),
        measurement: this.measurement,
        name: ingredient.name,
        uuid: ingredient.uuid,
      };
      this.data.ingredients.push(_ingredient);
    }
    this.clearLocalCache();
  }

  clearLocalCache() {
    this.amount = '';
    this.measurement = '';
    this._ingredient_ = '';
  }

  isDef(val: any) {
    return val !== undefined && val !== null && val !== '';
  }
}
