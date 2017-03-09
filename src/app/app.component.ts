import { Component, OnInit } from '@angular/core';
import { NgDateRangePickerOptions } from '../ng-daterangepicker';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  value: string;
  options: NgDateRangePickerOptions;

  ngOnInit() {
    this.options = { theme: 'default' };
  }
}
