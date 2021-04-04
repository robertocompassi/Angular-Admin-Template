import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { UserService } from './../common-services/user.service';
import { User } from 'src/app/models/User';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  submitted = false;
  loginForm: FormGroup;
  showLoad = false;
  showDetailsError = false;
  errorMsg = '';
  presentSession = false;
  userSession: User;


  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

  // recebe as notificacoes do subscribe
  subscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private titleDocument: Title,
    private userService: UserService) { }

  async ngOnInit() {

    this.titleDocument.setTitle(`Login`);

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.userSession = new User();
    this.verifySessionEnable();

    // dica para login
    console.log('dica para login: ', {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka'
    })
  }

  get f() { return this.loginForm.controls; }

  onRetryLogin() {
    this.showLoad = false;
    this.showDetailsError = false;
    this.loginForm.controls.email.setValue('');
    this.loginForm.controls.password.setValue('');
  }

  onSubmit() {
    const email = this.loginForm.controls.email.value;
    const password = this.loginForm.controls.password.value;

    this.submitted = true;
    
    if (this.loginForm.invalid) {
      return;
    }

    this.showLoad = true;
    this.loginService.login(email, password)
      .subscribe(data => {
        if (data.token !== undefined) {
          const userSuccess = new User();
          userSuccess.Email = email;
          userSuccess.Name = 'Usuário';
          userSuccess.Role = 'Administrator';
          userSuccess.ProfilePicture = '/assets/images/user-no-picture.png';
          localStorage.setItem('user', JSON.stringify(userSuccess));
        }
      },
        error => {
          this.showLoad = false;
          this.showDetailsError = true;

          if (error.error.error === 'user not found') {
            this.errorMsg = 'Usuário não encontrado';
            this.loginForm.controls.email.setValue('');
            this.loginForm.controls.password.setValue('');
          } else {
            this.errorMsg = error.message;
          }
          console.log(error);
        });
  }

  verifySessionEnable() {
    const userLocalStorage = this.userService.getSessionUser();
    if (userLocalStorage !== undefined && userLocalStorage !== null) {
      this.userSession = userLocalStorage;
      this.presentSession = true;
    }
  }

  clearSession() {
    this.presentSession = false;
    localStorage.clear();
  }
}
