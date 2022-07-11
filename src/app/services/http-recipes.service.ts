import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  LOCAL_URL: string = 'http://localhost:3001';
  RECIPES: string = 'recipes';
  SPECIALS: string = 'specials';

  constructor(private http: HttpClient) {}

  getRecipes() {
    return this.http.get<any>(`${this.LOCAL_URL}/${this.RECIPES}`);
  }

  getSpecials() {
    return this.http.get<any>(`${this.LOCAL_URL}/${this.SPECIALS}`);
  }

  /**
   * @todo WRITE POST REQUESTS TO RECIPES AND SPECIALS
   */
}
