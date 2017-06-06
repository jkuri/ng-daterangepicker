import { NgDateRangePickerHelper } from './shared/ng-daterangerpicker.helper';
import {
    NgDateRangeCalendarComponent
} from './ng-daterange-calendar/ng-daterange-calendar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgDateRangePickerComponent } from './ng-daterangepicker.component';

@NgModule({
  entryComponents: [ NgDateRangeCalendarComponent],
  declarations: [ NgDateRangePickerComponent, NgDateRangeCalendarComponent ],
  imports: [ CommonModule, FormsModule ],
  exports: [ NgDateRangePickerComponent, CommonModule, FormsModule ],
  providers: [ NgDateRangePickerHelper ]
})
export class NgDateRangePickerModule { }
