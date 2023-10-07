import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  loginUser(username: String, password: String) {
    return axios.post('/api/auth/login', {
      username,
      password
    });
  }
}
