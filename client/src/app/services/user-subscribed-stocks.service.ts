import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class UserSubscribedStocksService {

  constructor() { }

  getUserSubscribedStocks() {
    const headers = {
      'x-auth-token': localStorage.getItem('token')
    };
    return axios.get('/api/stocks/subscribed', {
      headers: headers
    })
  }
}
