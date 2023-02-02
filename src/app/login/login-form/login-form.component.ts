import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user/user';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  constructor(
    private readonly userService: UserService,
    private readonly loginService: LoginService) {
  }

  @Output() login: EventEmitter<void> = new EventEmitter();

  public loginSubmit(loginForm: NgForm): void {
    const { username } = loginForm.value;

    this.loginService.login(username)
      .subscribe({
        next: (user: User) => {
          this.userService.user = user;
          this.login.emit();
        },
        error: (e) => {
          console.log(e);
        }
      });
  }
}
