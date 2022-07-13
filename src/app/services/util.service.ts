import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilService {

  constructor() {}

  isDef(val: any) {
    return val !== undefined && val !== null && val !== '';
  }

  screenWidth(val: Number) {
    return window.innerWidth > val;
  }
}
