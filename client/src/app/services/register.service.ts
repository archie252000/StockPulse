import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor() { }

  registerUser(username: String, password: String) {
    return axios.post('/api/auth/register', {
      username,
      password
    });
  }
}
