import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { NgDateRangePickerComponent } from './ng-daterangepicker/ng-daterangepicker.component';


@NgModule({
  declarations: [
    AppComponent,
    NgDateRangePickerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
