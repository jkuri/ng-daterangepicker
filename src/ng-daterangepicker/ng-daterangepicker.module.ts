import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgDateRangePickerComponent } from './ng-daterangepicker.component';

@NgModule({
  declarations: [ NgDateRangePickerComponent ],
  imports: [ CommonModule, FormsModule ],
  exports: [ NgDateRangePickerComponent, CommonModule, FormsModule ]
})
export class NgDateRangePickerModule { }
