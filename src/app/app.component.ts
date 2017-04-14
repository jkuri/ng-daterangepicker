import { Component, OnInit } from '@angular/core';
import { NgxDateRangePickerOptions } from '../ng-daterangepicker';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit  {
  value: string|Object;
  options: NgxDateRangePickerOptions;

  ngOnInit() {
    this.options = {
      theme: 'default',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'yMd',
      outputFormat: 'DD/MM/YYYY',
      startOfWeek: 0,
      outputType: 'object',
      date: {
        from: {
          year: 2017,
          month: 1,
          day: 5
        },
        to: {
          year: 2017,
          month: 1,
          day: 5
        }
      }
    };
  }
}
