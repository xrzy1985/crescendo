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
  ingredients: any[];
  titles: string[];
  isLoggedIn: boolean;
  showAdditionalDetails: boolean;
  mainState: boolean = false;
  ingredientState: boolean = false;
  directionState: boolean = false;
  specialMap: Map<string, any> = new Map();

  constructor(private http: HttpService, private loginService: LoginService) {
    this.titles = ['Recipes', 'Specials'];
    this.isLoggedIn = false;
    this.showAdditionalDetails = false;
    this.recipes = [];
    this.specials = [];
    this.ingredients = [];
  }

  ngOnInit() {
    this.getRecipes();
    this.getSpecials();
  }

  ngAfterContentChecked(): void {
    this.isLoggedIn = this.loginService.isUserLoggedIn();
  }

  checkIngredient(id: string) {
    let test = !!this.specialMap.has(id);
    if (this.specials.length && !test) {
      let container = this.specials.filter((s) => {
        if (s.ingredientId === id) {
          this.specialMap.set(id, {
            title: s.title,
            type: s.type,
            text: s.text,
          });
          test = true;
        }
      });
    }
    return test;
  }

  getIngredientDetails(id: string) {
    let i = this.specialMap.get(id);
    return `${i.title} ${i.type} ${i.text}`;
  }

  getRecipes() {
    this.http.getRecipes().subscribe({
      next: (resp: any[]) => {
        this.recipes.length = 0;
        for (let i = 0, iLen = resp.length; i < iLen; i++) {
          const recipe = resp[i];
          this.ingredients = Array.from(
            new Set(this.ingredients.concat(recipe.ingredients))
          );
          this.recipes.push(recipe);
          console.log(recipe);
        }
        this.http.setRecipes(this.recipes);
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
      },
      error: (error: any) => {
        console.error('ERROR: GET REQUEST');
      },
    });
  }
}
