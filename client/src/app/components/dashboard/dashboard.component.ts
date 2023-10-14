import { Component } from '@angular/core';
import { UserSubscribedStocksService } from '../../services/user-subscribed-stocks.service'
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {

  stocks: Array<any>
  token: string

  constructor(
    private userSubscribedStocksService: UserSubscribedStocksService,
    private notificationService: NotificationService,
    private router: Router) {

    this.stocks = [];
    this.token = '';

  }

  ngOnInit(): void {

    this.notificationService.requestPermission().then((status) => {
      if (status != 'granted') {
        this.router.navigate(['/']);
      } else {
        this.notificationService.requestToken();
      }
    }).catch(() => {
      console.log("permission error");
    }

    );
    this.userSubscribedStocksService.getUserSubscribedStocks().then((response) => {
      this.stocks = response.data.subscribedStocks;

    }).catch((err) => {
      console.log(err.message);
    })

  }
}
