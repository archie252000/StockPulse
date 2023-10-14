import { Injectable } from '@angular/core';
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
    return getToken(messaging, { vapidKey: environment.firebase.vapidKey });
  }
}
