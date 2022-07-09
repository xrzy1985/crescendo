import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  LOCAL_URL: string = 'http://localhost:3001';
  RECIPES: string = 'recipes';
  SPECIALS: string = '/specials';

  recipes: any[];

  constructor(private http: HttpClient) {
    this.recipes = [];
  }

  gatherRecipes() {
    this.getRecipes().subscribe({
      next: (resp: any[]) => {
        this.recipes.length = 0;
        for (let i = 0, iLen = resp.length; i < iLen; i++) {
          const recipe = resp[i];
          if (recipe) {
            this.recipes.push(recipe);
          }
        }
        this.setRecipes(this.recipes);
      },
      error: (error: any) => {
        console.error('ERROR: Recipes did not load correctly');
      },
    });
  }

  getRecipes() {
    return this.http.get<any>(`${this.LOCAL_URL}/${this.RECIPES}`);
  }

  setRecipes(recipes: any[]) {
    this.recipes = recipes;
  }
}
