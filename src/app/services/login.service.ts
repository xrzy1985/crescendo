import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isLoggedIn: boolean;
  default: User = { name: '', email: '', pass: '' };
  user: User;

  constructor() {
    this.isLoggedIn = false;
    this.user = this.default;
  }

  isUserLoggedIn(): boolean { return this.isLoggedIn; }

  login(user: User) {
    if (user) {
      this.isLoggedIn = true;
      this.user = user;
    }
  }

  logout(user: User) {
    this.isLoggedIn = false;
    if (user.email === this.user.email) {
      this.isLoggedIn = false;
      this.user = this.default;
    }
  }
}
