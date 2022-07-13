import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { v4 as uuid } from 'uuid';
import { Image, Ingredient, Recipe } from '../models/Recipe';
import { FormService } from '../services/form.service';
import { RecipeService } from '../services/recipe.service';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  amount: any = '';
  btnText: String = 'Submit';
  ingredients: any[];
  _ingredient_: any;
  nextDirection: any = '';
  measurement: any = '';
  options: string[] = ['Optional', 'Not Optional'];
  recipe: any = {};
  recipeForm = this.formService.getFormGroup();
  selectedOption = this.options[1];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FormComponent>,
    private formService: FormService,
    private recipeService: RecipeService,
    private util: UtilService
  ) {
    this.ingredients = this.recipeService.getIngredients();
    this.recipe = { ...data };
    if (this.recipe?.uuid) {
      this.btnText = 'Edit';
      this.recipeForm = this.formService.setFormValues(this.recipeForm, this.recipe);
    }
  }

  addDirection(direction: string) {
    if (direction) {
      this.recipe = this.formService.addDirection(direction)(this.selectedOption)(this.recipe);
      this.nextDirection = '';
    }
  }

  submitRecipe(): void {
    this.recipeService.pushRecipe({
      ...this.recipeForm.value,
      directions: this.recipe.directions,
      ingredients: this.recipe.ingredients,
      images: this.formService.getDefaultImage(),
      editDate: new Date().toLocaleString(),
      postDate: new Date().toLocaleString(),
      uuid: uuid(),
    });
    this.dialogRef.close();
  }

  close() { this.dialogRef.close(); }

  allowSubmit(): boolean { return this.formService.allowSubmit(this.recipeForm, this.recipe); }

  allowIngredientSelection(): boolean { return this.util.isDef(this.amount) && this.util.isDef(this.measurement); }

  addIngredient(ingredient: any) {
    this.recipe = this.formService.addIngredient(ingredient)(this.amount)(this.measurement)(this.recipe);
    this.resetIngredientDetails();
    this.clearLocalCache();
  }

  removeIngredient(index: number) {
    this.recipe = this.formService.removeIngredient(index, this.recipe);
  }

  clearLocalCache() {
    this.amount = this.measurement = this._ingredient_ = '';    
  }

  resetIngredientDetails(): void {
    this.recipeForm.controls.amount.reset();
    this.recipeForm.controls.measurement.reset();
  }

  screenWidth = (value: Number) => { return this.util.screenWidth(value); }
}
