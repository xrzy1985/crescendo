import {
  AfterContentChecked,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { HttpService } from '../services/http-recipes.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements AfterContentChecked, OnInit {
  recipes: any[];
  specials: any[];
  titles: string[];
  isLoggedIn: boolean;
  showAdditionalDetails: boolean;
  ingredientState: boolean = false;
  directionState: boolean = false;

  constructor(private http: HttpService, private loginService: LoginService) {
    this.titles = ['Recipes', 'Specials'];
    this.isLoggedIn = false;
    this.showAdditionalDetails = false;
    this.recipes = [];
    this.specials = [];
  }

  ngOnInit() {
    this.getRecipes();
    this.getSpecials();
  }

  ngAfterContentChecked(): void {
    this.isLoggedIn = this.loginService.isUserLoggedIn();
  }

  showDetails(): void {
    if (this.isLoggedIn) {
      this.showAdditionalDetails = !this.showAdditionalDetails;
      alert('You want to expand the details');
    }
  }

  checkIngredient(val: any) {
    if (this.specials.length) {
      console.log(val);
    }
  }

  getRecipes() {
    this.http.getRecipes().subscribe({
      next: (resp: any[]) => {
        this.recipes.length = 0;
        for (let i = 0, iLen = resp.length; i < iLen; i++) {
          const recipe = resp[i];
          this.recipes.push(recipe);
        }
        this.http.setRecipes(this.recipes);
        console.log(this.recipes);
      },
      error: (error: any) => {
        console.error('ERROR: GET REQUEST');
      },
    });
  }

  getSpecials() {
    this.http.getSpecials().subscribe({
      next: (resp: any[]) => {
        this.specials.length = 0;
        for (let i = 0, iLen = resp.length; i < iLen; i++) {
          const special = resp[i];
          this.specials.push(special);
        }
        this.http.setSpecials(this.specials);
        console.log(this.specials);
      },
      error: (error: any) => {
        console.error('ERROR: GET REQUEST');
      },
    });
  }
}
