import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderBarComponent } from './components/header-bar/header-bar.component';
import { LoginContainerComponent } from './components/login-container/login-container.component';

import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StockCardComponent } from './components/stock-card/stock-card.component';
import { StockModalComponent } from './components/stock-modal/stock-modal.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';


@NgModule({
  declarations: [
    AppComponent,
    HeaderBarComponent,
    LoginContainerComponent,
    DashboardComponent,
    NavbarComponent,
    StockCardComponent,
    StockModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideMessaging(() => getMessaging())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
