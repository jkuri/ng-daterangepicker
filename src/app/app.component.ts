import { Component } from '@angular/core';
import {
  NgxDateRangePickerOptions,
  NgxDateRangePickerOutput,
  TimeRangeEnum,
} from './ngx-daterangepicker';

@Component({
  selector: 'ngx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  value: NgxDateRangePickerOutput = {
    from: 0,
    to: 0,
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
      'Cancel',
    ],
    dateFormat: 'd.M.y',
    startOfWeek: 1,
    position: 'left',
  };

  setTheme = (newTheme: string) => {
    this.options = Object.assign({}, this.options, {
      theme: newTheme,
    });
  };
}
