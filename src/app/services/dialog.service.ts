// this.dialog
//       .open(FormComponent, {
//         width: '80vw',
//         height: '80vh',
//         data: partial,
//       })
//       .afterClosed();
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Recipe, PartialRecipe } from '../models/Recipe';
import { FormComponent } from '../form/form.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {

  constructor(public dialog: MatDialog) {}

  openDialog(partial: PartialRecipe) {
    this.dialog
      .open(FormComponent, {
        width: '80vw',
        height: '80vh',
        data: partial,
      })
      .afterClosed();
  }

  editDialog(recipe: Recipe): void {
    this.dialog
      .open(FormComponent, {
        width: '80vw',
        height: '80vh',
        data: recipe,
        disableClose: true
      })
      .afterClosed();
  }
}
