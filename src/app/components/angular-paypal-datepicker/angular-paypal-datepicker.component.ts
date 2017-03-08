import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import * as dateFns from 'date-fns';

@Component({
  selector: 'angular-paypal-datepicker',
  templateUrl: 'angular-paypal-datepicker.component.html',
  styleUrls: ['angular-paypal-datepicker.sass']
})
export class AngularPayPalDatepickerComponent implements OnInit {
  opened: false | 'from' | 'to';
  date: Date;
  dateFrom: Date;
  dateTo: Date;
  dayNames: string[];
  days: any[];

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.opened = false;
    this.date = dateFns.startOfDay(new Date());
    this.dateFrom = dateFns.startOfDay(dateFns.subWeeks(this.date, 3));
    this.dateTo = this.date;
    this.initNames();
    this.generateCalendar();
  }

  initNames(): void {
    this.dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  }

  generateCalendar(): void {
    this.days = [];
    let start: Date = dateFns.startOfMonth(this.date);
    let end: Date = dateFns.endOfMonth(this.date);

    let days = dateFns.eachDay(start, end).map(d => {
      return {
        date: d,
        day: dateFns.getDate(d),
        weekday: dateFns.getDay(d),
        today: dateFns.isToday(d),
        firstMonthDay: dateFns.isFirstDayOfMonth(d),
        lastMonthDay: dateFns.isLastDayOfMonth(d),
        visible: true,
        from: dateFns.isSameDay(this.dateFrom, d),
        to: dateFns.isSameDay(this.dateTo, d),
        isWithinRange: dateFns.isWithinRange(d, this.dateFrom, this.dateTo)
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
          weekday: dateFns.getDay(d),
          firstMonthDay: dateFns.isFirstDayOfMonth(d),
          lastMonthDay: dateFns.isLastDayOfMonth(d),
          today: false,
          visible: false,
          from: false,
          to: false,
          isWithinRange: false
        };
      });
    }

    this.days = prevMonthDays.concat(days);
  }

  toggleCalendar(e: MouseEvent, selection: 'from' | 'to'): void {
    if (this.opened && this.opened !== selection) {
      this.opened = selection;
    } else {
      this.opened = this.opened ? false : selection;
    }
  }

  closeCalendar(e: MouseEvent): void {
    this.opened = false;
  }

  selectDate(e: MouseEvent, index: number): void {
    let selectedDate: Date = this.days[index].date;
    if ((this.opened === 'from' && dateFns.isAfter(selectedDate, this.dateTo)) ||
        (this.opened === 'to' && dateFns.isBefore(selectedDate, this.dateFrom))) {
      return;
    }

    if (this.opened === 'from') {
      this.dateFrom = selectedDate;
      this.opened = 'to';
    } else if (this.opened === 'to') {
      this.dateTo = selectedDate;
      this.opened = 'from';
    }

    this.generateCalendar();
  }

  prevMonth(): void {
    this.date = dateFns.subMonths(this.date, 1);
    this.generateCalendar();
  }

  nextMonth(): void {
    this.date = dateFns.addMonths(this.date, 1);
    this.generateCalendar();
  }

  @HostListener('document:click', ['$event'])
  handleBlurClick(e: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(e.target) && !e.srcElement.classList.contains('day-num')) {
      this.opened = false;
    }
  }
}
