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
import { RecipeService } from '../services/recipe.service';

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

  constructor(
    private http: HttpService,
    private loginService: LoginService,
    private recipeService: RecipeService
  ) {
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
    this.recipes = this.recipeService.getRecipes();
    this.specials = this.recipeService.getSpecials();
    this.ingredients = this.recipeService.getIngredients();
  }

  checkIngredient(id: string) {
    return this.recipeService.checkIngredient(id);
  }

  getIngredientDetails(id: string) {
    return this.recipeService.getIngredientDetails(id);
  }

  getRecipes() {
    this.recipeService.gatherRecipes();
  }

  getSpecials() {
    this.recipeService.gatherSpecials();
  }
}
