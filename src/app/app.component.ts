import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<app-nav [title]="title"></app-nav>`,
  styles: ['']
})
export class AppComponent {
  title: string = 'Recipe Drop';
}
