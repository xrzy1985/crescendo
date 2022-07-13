import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilService {

  constructor() {}

  capitalize(s: String) { return !s ? '' : s[0].toUpperCase() + s.slice(1); }

  isDef(val: any) {
    return val !== undefined && val !== null && val !== '';
  }

  screenWidth(val: Number) {
    return window.innerWidth > val;
  }
}
