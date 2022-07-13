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
import { FormService } from '../services/form.service';
import { RecipeService } from '../services/recipe.service';
import { UtilService } from '../services/util.service';
import { Image, Ingredient, Recipe } from '../models/Recipe';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  recipeForm = this.formService.getFormGroup();
  options: string[] = ['Optional', 'Not Optional'];
  btnText: String = 'Submit';
  ingredients: any[];
  selectedOption = this.options[1];
  nextDirection: any = '';
  amount: any = '';
  measurement: any = '';
  _ingredient_: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FormComponent>,
    private formService: FormService,
    private recipeService: RecipeService,
    private util: UtilService
  ) {
    this.ingredients = this.recipeService.getIngredients();
    if (data.uuid) {
      this.btnText = 'Edit';
      this.recipeForm.controls['title'].setValue(data.title);
      this.recipeForm.controls['description'].setValue(data.description);
      this.recipeForm.controls['servings'].setValue(data.servings);
      this.recipeForm.controls['cookTime'].setValue(data.cookTime);
      this.recipeForm.controls['prepTime'].setValue(data.prepTime);
    }
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
      images: this.formService.getDefaultImage(),
      editDate: new Date().toLocaleString(),
      postDate: new Date().toLocaleString(),
      uuid: uuid(),
    };
    this.recipeService.pushRecipe(_recipe);
    this.dialogRef.close();
  }

  close() { this.dialogRef.close(); }

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
      let _ingredient: Ingredient = this.formService.buildIngredient(this.amount)(this.measurement)(ingredient.name)(ingredient.uuid);
      this.data.ingredients.push(_ingredient);
    }
    this.resetIngredientDetails();
    this.clearLocalCache();
  }

  removeIngredient(ingredient: Ingredient) {
    if (ingredient) {
      let index = this.data.ingredients.findIndex((i: Ingredient) => i.uuid === ingredient.uuid);
      if (index > -1) {
        this.data.ingredients.splice(index, 1);
      }
    }
  }

  clearLocalCache() {
    this.amount = this.measurement = this._ingredient_ = '';    
  }

  resetIngredientDetails(): void {
    this.recipeForm.controls.amount.reset();
    this.recipeForm.controls.measurement.reset();
  }

  isDef = (value: any) => { return this.util.isDef(value); }

  screenWidth = (value: Number) => { return this.util.screenWidth(value); }
}
