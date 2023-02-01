import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent {
  constructor(
    private readonly router: Router) {
  }

  handleLogin(): void {
    this.router.navigateByUrl('/catalogue')
  }
}
