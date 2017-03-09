import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AngularDateRangePickerModule } from '../angular-daterangepicker';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AngularDateRangePickerModule
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
