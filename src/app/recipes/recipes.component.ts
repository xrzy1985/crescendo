import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { RecipesDataSource, RecipesItem } from './recipes-datasource';
import { HttpService } from '../services/http-recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements AfterViewInit {

  recipes: any[];
  
  constructor(private http: HttpService) {
    this.recipes = [];
    this.getRecipes();
  }

  ngAfterViewInit(): void {}

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

}