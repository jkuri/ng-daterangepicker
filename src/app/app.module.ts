import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AngularPayPalDatepickerComponent } from './components/angular-paypal-datepicker';

@NgModule({
  declarations: [
    AppComponent,
    AngularPayPalDatepickerComponent
  ],
  imports: [
    BrowserModule,
    CommonModule
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
