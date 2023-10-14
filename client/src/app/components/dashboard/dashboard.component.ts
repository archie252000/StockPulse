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
        this.notificationService.requestToken().then((token) => {
          console.log(token);

        }).catch((err) => {
          console.log(err)
        })
      }
    }).catch(() => {
      console.log("permission error");
    }

    );
    // if (permission === "granted") {
    //   const token = await getToken(messaging, {
    //     vapidKey:
    //       "BOtICGIpUyQatIBt93DteJijVBJub2UyMVdEVB7WSHmrju2qk1xRCQ36KGzdqtw4NpPANw3WCMGdsSjtsaJOFGg",
    //   });
    //   console.log("Token Gen", token);
    //   // Send this token  to server ( db)
    // } else if (permission === "denied") {
    //   alert("You denied for the notification");
    // }
    this.userSubscribedStocksService.getUserSubscribedStocks().then((response) => {
      this.stocks = response.data.subscribedStocks;

    }).catch((err) => {
      console.log(err.message);
    })

  }
}
