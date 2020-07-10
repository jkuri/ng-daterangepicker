import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgxDateRangePickerModule } from './ngx-daterangepicker/ngx-daterangepicker.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxDateRangePickerModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
