import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { LoginService } from '../../services/login.service'
import { RegisterService } from '../../services/register.service'



@Component({
  selector: 'login-container',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.css']
})
export class LoginContainerComponent {
  loginForm: FormGroup;
  isRegistering: Boolean;
  alertMessage: String;
  isSuccessMessage: Boolean;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private registerService: RegisterService) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.isRegistering = false;

    this.alertMessage = '';

    this.isSuccessMessage = false;


  }

  switchRegister(): void {
    this.isRegistering = !this.isRegistering
  }

  onSubmit(): void {
    if (!this.isRegistering) {

      this.loginService.loginUser(
        this.loginForm.value.username,
        this.loginForm.value.password).then(
          (response) => localStorage.setItem('token', response.data.token)).catch(
            (err) => {
              this.isSuccessMessage = false;
              this.alertMessage = err.message;
            });
    } else {

      this.registerService.registerUser(
        this.loginForm.value.username,
        this.loginForm.value.password).then(
          (response) => {
            localStorage.setItem('token', response.data.token);
            this.isSuccessMessage = true;
            this.alertMessage = 'Registration Successful!'
          }).catch(
            (err) => {
              this.isSuccessMessage = false;
              console.log(err)
              this.alertMessage = err.response.data.message;
            });
    }
  }
}
