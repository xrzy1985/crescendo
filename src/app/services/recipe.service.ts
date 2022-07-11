import { Injectable } from '@angular/core';
import { HttpService } from './http-recipes.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  ingredients: any[];
  recipes: any[];
  specials: any[];
  specialsMap: Map<string, any> = new Map();

  constructor(private http: HttpService) {
    this.ingredients = [];
    this.recipes = [];
    this.specials = [];
  }

  gatherRecipes() {
    this.http.getRecipes().subscribe({
      next: (resp: any[]) => {
        this.recipes.length = 0;
        for (let i = 0, iLen = resp.length; i < iLen; i++) {
          const recipe = resp[i];
          this.ingredients = Array.from(
            new Set(this.ingredients.concat(recipe.ingredients))
          );
          this.recipes.push(recipe);
        }
      },
      error: (error: any) => {
        console.error('ERROR: GET REQUEST');
      },
    });
  }

  getRecipes(): any[] {
    return this.recipes;
  }

  pushRecipe(recipe: any): void {
    if (!this.recipes.find(r => r.uuid === recipe.uuid)) {
      this.recipes.push(recipe);
    }
  }

  getIngredients(): any[] {
    return this.ingredients;
  }

  setIngredients(container: any[]): void {
    if (container.length) {
      this.ingredients = Array.from(new Set(container));
    }
  }

  gatherSpecials(): void {
    this.http.getSpecials().subscribe({
      next: (resp: any[]) => {
        this.specials.length = 0;
        for (let i = 0, iLen = resp.length; i < iLen; i++) {
          this.specials.push(resp[i]);
        }
      },
      error: (error: any) => {
        console.error('ERROR: GET REQUEST');
      },
    });
  }
  
  getSpecials(): any[] {
    return this.specials;
  }

  setSpecials(container: any[]): void {
    if (container.length) {
      this.specials = Array.from(new Set(container));
    }
  }

  getIngredientDetails(id: string) {
    let i = this.specialsMap.get(id);
    return `${i.title} ${i.type} ${i.text}`;
  }

  checkIngredient(id: string) {
    let test = !!this.specialsMap.has(id);
    if (this.specials.length && !test) {
      let container = this.specials.filter((s: any) => {
        if (s.ingredientId === id) {
          this.specialsMap.set(id, {
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

}
