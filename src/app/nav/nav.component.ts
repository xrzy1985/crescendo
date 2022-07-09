import { Component, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  @Input() title = '';
  isUserLoggedIn: boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private loginService: LoginService) {}

  ngOnInit() {
    this.isUserLoggedIn = this.loginService.isUserLoggedIn();
  }

  login(user: any) {
    this.loginService.login({name: 'James Patterson', email: 'jamespatterson.feswe@yahoo.com', pass: 'abc'});
  }

  logout(user: any) {
    this.loginService.logout({name: 'James Patterson', email: 'jamespatterson.feswe@yahoo.com', pass: 'abc'});
  }

}
