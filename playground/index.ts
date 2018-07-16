/**
 * This is only for local test
 */
import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule, ViewEncapsulation } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import {
  NgxDateRangePickerModule,
  NgxDateRangePickerOptions,
  NgxDateRangePickerOutput,
  TimeRangeEnum
} from '../src/index';

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
    range: TimeRangeEnum.LAST_SEVEN_DAYS,
    dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    presetNames: [
      'This Week',
      'Last 7 Days',
      'Last Week',
      'This Month',
      'Last Month',
      'This Year',
      'Last Year',
      'Start',
      'End',
      'Apply',
      'Cancel'
    ],
    dateFormat: 'd.M.y',
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
