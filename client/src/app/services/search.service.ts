import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  search(keywords: String) {
    return axios.get(`/api/stocks/search?keywords=${keywords}`);
  }
}
