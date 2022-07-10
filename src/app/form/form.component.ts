import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  recipeForm = this.fb.group({
    cookTime: [null, Validators.required],
    description: [null],
    ingredients: [null],
    prepTime: [null, Validators.required],
    servings: [null, Validators.required],
    title: [null, Validators.required],
  });
  nextDirection: any = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  addDirection(dir: string) {
    if (dir) {
      this.data.directions.push(dir[0].toUpperCase() + dir.slice(1));
      this.nextDirection = '';
    }
  }

  addRecipe(): void {
    const _recipe = {
      ...this.recipeForm.value,
      directions: this.data.directions,
      images: { full: '', medium: '', small: '' },
      editDate: new Date().toLocaleString(),
      postDate: new Date().toLocaleString(),
      uuid: uuid()
    };
    console.log(_recipe);
  }
}
