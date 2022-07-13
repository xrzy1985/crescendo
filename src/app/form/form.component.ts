import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { v4 as uuid } from 'uuid';
import { Ingredient, Recipe } from '../models/Recipe';
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
  btnText: String = this.formService.getButtonText();;
  ingredients: any[];
  _ingredient_: any;
  nextDirection: any = '';
  measurement: any = '';
  options: string[] = ['Optional', 'Not Optional'];
  recipe: any = {};
  recipeForm: any;
  selectedOption = this.options[1];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
      private dialogRef: MatDialogRef<FormComponent>,
      private formService: FormService,
      private recipeService: RecipeService,
      private util: UtilService) {
    this.recipe = { ...data };
    this.recipeForm = this.formService.getFormGroup();
    this.ingredients = this.recipeService.getIngredients();
    this.btnText = this.formService.getButtonText(!!data.uuid);
    if (this.recipe?.uuid) {
      this.recipeForm = this.formService.setFormValues(this.recipeForm, this.recipe);
    }
  }
  
  /**
   * @function submitRecipe
   * @description To add recipe from user to the data source
   * @todo Add functional to PUT the data onto the JSON server data source
   */
  submitRecipe(): void {
    this.recipeService.submitRecipes(this.recipeForm, this.recipe);
    this.close();
  }

  /**
   * @function addDirection
   * @note Utilizes currying to achieve a more concise look
   */
  addDirection(direction: string): void {
    if (direction) {
      this.recipe = this.formService.addDirection(direction)(this.selectedOption)(this.recipe);
      this.nextDirection = '';
    }
  }

  /**
   * @function addIngredient
   */
  addIngredient(ingredient: any): void {
    this.recipe = this.formService.addIngredient(ingredient)(this.amount)(this.measurement)(this.recipe);
    this.resetIngredientDetails();
    this.clearLocalCache();
  }

  /**
   * @function removeIngredient
   */
  removeIngredient(index: number): void {
    this.recipe = this.formService.removeIngredient(index, this.recipe);
  }

  /**
   * @function clearLocalCache
   * @todo Cleanup
   */
  clearLocalCache(): void {
    this.amount = this.measurement = this._ingredient_ = '';    
  }

  /**
   * @function resetIngredientDetails
   * @todo Cleanup
   */
  resetIngredientDetails(): void {
    this.recipeForm.controls.amount.reset();
    this.recipeForm.controls.measurement.reset();
  }
  
  /**
   * @function close
   * @description closes the dialog currently open in app
   */
  close(): void { this.dialogRef.close(); }

  /**
   * @function screenWidth
   * @returns boolean 
   */
  screenWidth = (value: Number): boolean => { return this.util.screenWidth(value); }

  /**
   * @function allowSubmit
   * @description Checks the form for validity within reactive controls, and ngModel values to enable/disable button
   * @note Normally, you would not mix the two, but in the preservation of time, I chose to use both initially
   */
  allowSubmit(): boolean { return this.formService.allowSubmit(this.recipeForm, this.recipe); }

  /**
   * @function allowIngredientSelection
   * @description ngModel validation for the ingredient select component
   */
  allowIngredientSelection(): boolean { return this.util.isDef(this.amount) && this.util.isDef(this.measurement); }

  /**
   * @todo Cleanup
   */
  ngOnDestroy() {
    this.amount = '';
    this.nextDirection = '';
    this.measurement = '';
    this.recipe = {};
    this.selectedOption = this.options[1];
  }
}
