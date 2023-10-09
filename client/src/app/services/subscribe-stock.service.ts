import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class SubscribeStockService {

  constructor() { }

  subscribeStock(symbol: String, targetPrice: Number) {
    const headers = {
      'x-auth-token': localStorage.getItem('token')
    };

    const data = {
      symbol,
      targetPrice
    }

    return axios.post('/api/stocks/subscribe', data, {
      headers: headers
    })
  }
}
