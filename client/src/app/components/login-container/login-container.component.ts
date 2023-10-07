import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { LoginService } from '../../services/login.service'


@Component({
  selector: 'login-container',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.css']
})
export class LoginContainerComponent {
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private loginService: LoginService) {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })

  }
  onSubmit(): void {

    this.loginService.loginUser(
      this.loginForm.value.username,
      this.loginForm.value.password).then(
        (response) => console.log(response)).catch(
          (err) => console.log(err.message))


  }
}
