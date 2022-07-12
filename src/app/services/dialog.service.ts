// this.dialog
//       .open(FormComponent, {
//         width: '80vw',
//         height: '80vh',
//         data: partial,
//       })
//       .afterClosed();
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Recipe } from '../models/Recipe';
import { FormComponent } from '../form/form.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {

  constructor(public dialog: MatDialog) {}

  editDialog(recipe: Recipe): void {
    this.dialog
      .open(FormComponent, {
        width: '80vw',
        height: '80vh',
        data: recipe,
      })
      .afterClosed();
  }
}
