import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<app-nav [title]="title"></app-nav>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'Recipe Drop';
}
