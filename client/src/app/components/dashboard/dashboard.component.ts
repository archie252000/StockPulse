import { Component } from '@angular/core';
import { UserSubscribedStocksService } from '../../services/user-subscribed-stocks.service'

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  stocks: Array<any>

  constructor(private userSubscribedStocksService: UserSubscribedStocksService) {
    this.stocks = [];
  }

  ngOnInit(): void {
    this.userSubscribedStocksService.getUserSubscribedStocks().then((response) => {
      this.stocks = response.data.subscribedStocks;

    }).catch((err) => {
      console.log(err.message);
    })

  }
}
