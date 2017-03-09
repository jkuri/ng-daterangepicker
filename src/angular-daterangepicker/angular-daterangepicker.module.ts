import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularDateRangePickerComponent } from './angular-daterangepicker.component';

@NgModule({
  declarations: [ AngularDateRangePickerComponent ],
  imports: [ CommonModule, FormsModule ],
  exports: [ AngularDateRangePickerComponent, CommonModule, FormsModule ]
})
export class AngularDateRangePickerModule { }
