import { Injectable } from '@angular/core';
import { NgDateRangePickerOptions } from './ng-daterangepicker-options';
import * as dateFns from 'date-fns';

export interface DateObj {
    dateFrom: Date;
    dateTo: Date;
}

@Injectable()
export class NgDateRangePickerHelper {

    selectRange(options: NgDateRangePickerOptions, range?: 'tm' | 'lm' | 'lw' | 'tw' | 'ty' | 'ly'): DateObj {
      let today = dateFns.startOfDay(new Date());
      let dateFrom: Date;
      let dateTo: Date;

      switch (range || options.range) {
      case 'tm':
          dateFrom = dateFns.startOfMonth(today);
          dateTo = dateFns.endOfMonth(today);
          break;
      case 'lm':
          today = dateFns.subMonths(today, 1);
          dateFrom = dateFns.startOfMonth(today);
          dateTo = dateFns.endOfMonth(today);
          break;
      case 'lw':
          today = dateFns.subWeeks(today, 1);
          dateFrom = dateFns.startOfWeek(today, {weekStartsOn: options.startOfWeek});
          dateTo = dateFns.endOfWeek(today, {weekStartsOn: options.startOfWeek});
          break;
      case 'tw':
          dateFrom = dateFns.startOfWeek(today, {weekStartsOn: options.startOfWeek});
          dateTo = dateFns.endOfWeek(today, {weekStartsOn: options.startOfWeek});
          break;
      case 'ty':
          dateFrom = dateFns.startOfYear(today);
          dateTo = dateFns.endOfYear(today);
          break;
      case 'ly':
          today = dateFns.subYears(today, 1);
          dateFrom = dateFns.startOfYear(today);
          dateTo = dateFns.endOfYear(today);
          break;
      }

      return {
          dateFrom: dateFrom,
          dateTo: dateTo
      };
  }

}
