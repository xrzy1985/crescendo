import { Component, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoginService } from '../services/login.service';
import { User } from '../models/User';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  @Input() title = '';
  isUserLoggedIn: boolean = false;
  name: string = '';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private loginService: LoginService) {}

  ngOnInit() {
    this.isUserLoggedIn = this.loginService.isUserLoggedIn();
    this.name = 'Guest';
  }

  getGreeting(): string {
    return this.isUserLoggedIn ? 'Welcome back, ' : 'Hello, ';
  }

  loggedIn(): boolean {
    return this.isUserLoggedIn;
  }

  login(user: User) {
    if (user) {
      this.loginService.login(user);
      this.name = user.name;
      this.isUserLoggedIn = true;
    }
  }

  logout(user: User) {
    if (user.email === this.loginService.getUser().email) {
      this.loginService.logout(user);
      this.name = 'Guest';
      this.isUserLoggedIn = false;
    }
  }

  signup(user: User) {
    console.log(user);
  }

}
