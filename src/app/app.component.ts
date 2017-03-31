import { Component, OnInit } from '@angular/core';
import { NgDateRangePickerOptions, NgDateRangePickerOutput } from '../ng-daterangepicker';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit  {
  value: NgDateRangePickerOutput;
  options: NgDateRangePickerOptions;

  ngOnInit() {
    this.options = {
      theme: 'default',
      range: 'l7d',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'yMd',
      startOfWeek: 0
    };
    this.value = {
      from: 0,
      to: 0
    };
  }
}
