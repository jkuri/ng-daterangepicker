import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxDateRangePickerComponent } from './ngx-daterangepicker.component';

@NgModule({
  declarations: [NgxDateRangePickerComponent],
  imports: [CommonModule, FormsModule],
  exports: [
    NgxDateRangePickerComponent,
    CommonModule,
    FormsModule,
    CommonModule,
    FormsModule,
  ],
})
export class NgxDateRangePickerModule {}
