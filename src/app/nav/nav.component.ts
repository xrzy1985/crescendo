import { Component, Inject, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from '../services/login.service';
import { User } from '../models/User';
import { RecipeService } from '../services/recipe.service';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  @Input() title = '';
  isUserLoggedIn: boolean = false;
  name: string = '';

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    private loginService: LoginService,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    this.isUserLoggedIn = this.loginService.isUserLoggedIn();
    this.name = 'Guest';
  }

  getGreeting(): string {
    return this.isUserLoggedIn ? 'Welcome back, ' : 'Hello, ';
  }

  login(user: User) {
    if (user) {
      this.loginService.login(user);
      this.name = user.name;
      this.switchStatus();
    }
  }

  logout(user: User) {
    if (user.email === this.loginService.getUser().email) {
      this.loginService.logout(user);
      this.name = 'Guest';
      this.switchStatus();
    }
  }

  switchStatus(): void {
    this.isUserLoggedIn = !this.isUserLoggedIn;
  }

  signup(user: User) {
    console.log(user);
  }

  openDialog(): void {
    this.dialog
      .open(FormComponent, {
        width: '80vw',
        height: '80vh',
        data: {
          title: '',
          description: '',
          servings: '',
          prepTime: '',
          cookTime: '',
          ingredients: [],
          directions: [{ instructions: 'Gather materials', optional: false }],
        },
      })
      .afterClosed();
  }
}
