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
  recipeForm: any;
  selectedOption = this.options[1];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<FormComponent>,
    private formService: FormService,
    private recipeService: RecipeService,
    private util: UtilService
  ) {
    this.recipeForm = this.formService.getFormGroup();
    this.ingredients = this.recipeService.getIngredients();
    this.recipe = { ...data };
    if (this.recipe?.uuid) {
      this.btnText = 'Edit';
      this.recipeForm = this.formService.setFormValues(this.recipeForm, this.recipe);
    }
  }

  addDirection(direction: string): void {
    if (direction) {
      this.recipe = this.formService.addDirection(direction)(this.selectedOption)(this.recipe);
      this.nextDirection = '';
    }
  }

  submitRecipe(): void {
    this.recipeService.submitRecipes(this.recipeForm, this.recipe);
    this.dialogRef.close();
  }

  close(): void { this.dialogRef.close(); }

  allowSubmit(): boolean { return this.formService.allowSubmit(this.recipeForm, this.recipe); }

  allowIngredientSelection(): boolean { return this.util.isDef(this.amount) && this.util.isDef(this.measurement); }

  addIngredient(ingredient: any): void {
    this.recipe = this.formService.addIngredient(ingredient)(this.amount)(this.measurement)(this.recipe);
    this.resetIngredientDetails();
    this.clearLocalCache();
  }

  removeIngredient(index: number): void {
    this.recipe = this.formService.removeIngredient(index, this.recipe);
  }

  clearLocalCache(): void {
    this.amount = this.measurement = this._ingredient_ = '';    
  }

  resetIngredientDetails(): void {
    this.recipeForm.controls.amount.reset();
    this.recipeForm.controls.measurement.reset();
  }

  screenWidth = (value: Number): boolean => { return this.util.screenWidth(value); }
}
