import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxDateRangePickerComponent } from './ng-daterangepicker.component';

@NgModule({
  declarations: [ NgxDateRangePickerComponent ],
  imports: [ CommonModule, FormsModule ],
  exports: [ NgxDateRangePickerComponent, CommonModule, FormsModule ]
})
export class NgxDateRangePickerModule { }
