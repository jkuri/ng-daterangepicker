import { Component, OnInit } from '@angular/core';
import * as dateFns from 'date-fns';

@Component({
  selector: 'angular-paypal-datepicker',
  templateUrl: 'angular-paypal-datepicker.component.html',
  styleUrls: ['angular-paypal-datepicker.sass']
})
export class AngularPayPalDatepickerComponent implements OnInit {
  date: Date;
  dayNames: string[];
  days: any[];

  ngOnInit() {
    this.date = new Date();
    this.initNames();
    this.generateDays();
  }

  initNames(): void {
    this.dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  }

  generateDays(): void {
    this.days = [];
    let start: Date = dateFns.startOfMonth(this.date);
    let end: Date = dateFns.endOfMonth(this.date);

    let days = dateFns.eachDay(start, end).map(d => {
      return {
        date: d,
        day: dateFns.getDate(d),
        today: dateFns.isToday(d),
        visible: true
      };
    });

    let prevMonthDayNum = dateFns.getDay(start) - 1;
    let prevMonthDays = [];
    if (prevMonthDayNum > 0) {
      prevMonthDays = Array.from(Array(prevMonthDayNum).keys()).map(i => {
        let d = dateFns.subDays(start, prevMonthDayNum - i);
        return {
          date: d,
          day: dateFns.getDate(d),
          today: false,
          visible: false
        };
      });
    }

    this.days = prevMonthDays.concat(days);
  }

  prevMonth(): void {
    this.date = dateFns.subMonths(this.date, 1);
    this.generateDays();
  }

  nextMonth(): void {
    this.date = dateFns.addMonths(this.date, 1);
    this.generateDays();
  }
}
