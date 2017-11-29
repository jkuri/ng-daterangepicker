/**
 * This is only for local test
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component, ViewEncapsulation } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import {
  NgxDateRangePickerModule,
  NgxDateRangePickerOutput,
  NgxDateRangePickerOptions
} from '@kiwigrid/ngx-daterangepicker';

@Component({
  styleUrls: ['app.component.css'],
  selector: 'app',
  templateUrl: 'app.component.html',
  encapsulation: ViewEncapsulation.None
})
class AppComponent {
  value: NgxDateRangePickerOutput = {
    from: 0,
    to: 0
  };
  options: NgxDateRangePickerOptions = {
    theme: 'default',
    range: 'l7d',
    dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    presetNames: [
      'This Month',
      'Last Month',
      'This Week',
      'Last Week',
      'This Year',
      'Last Year',
      'Last 7 Days',
      'Start',
      'End',
      'Apply',
      'Cancel'
    ],
    dateFormat: 'yMd',
    startOfWeek: 1,
    position: 'left'
  };

  setTheme = (newTheme: string) => {
    this.options = Object.assign({}, this.options, {
      theme: newTheme
    });
  };
}

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [BrowserModule, NgxDateRangePickerModule]
})
class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);
