import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  constructor(
    private readonly router: Router,
    private readonly trainerService: TrainerService) {
      // in case a logged in user tries to access login page again.
      // could be refactored into a guard if more use cases arises.
      if (trainerService.trainer) {
        router.navigateByUrl('/catalogue')
      }
  }

  handleLogin(): void {
    this.router.navigateByUrl('/catalogue')
  }
}
