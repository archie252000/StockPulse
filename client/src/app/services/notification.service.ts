import { Injectable } from '@angular/core';
import axios from 'axios';
import { getMessaging, getToken } from 'firebase/messaging';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }


  requestPermission() {

    return Notification.requestPermission();

  }

  requestToken() {
    const messaging = getMessaging();
    getToken(messaging, { vapidKey: environment.firebase.vapidKey }).then((token) => {

      const headers = {
        'x-auth-token': localStorage.getItem('token')
      };

      const data = {
        'notificationToken': token
      }

      axios.post('/api/auth/notification-token', data, {
        headers: headers
      }).then((response) => {
        console.log(response.data)
      }).catch((err) => {
        console.log(err)
      });

    }).catch((err) => {
      console.log(err);

    });
  }
}
