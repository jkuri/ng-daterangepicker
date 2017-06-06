import { DateObj, NgDateRangePickerHelper } from '../shared/ng-daterangerpicker.helper';
import { Component, ElementRef, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { NgDateRangePickerOptions } from '../shared/ng-daterangepicker-options';
import * as dateFns from 'date-fns';

export interface IDay {
  date: Date;
  day: number;
  weekday: number;
  today: boolean;
  firstMonthDay: boolean;
  lastMonthDay: boolean;
  visible: boolean;
  from: boolean;
  to: boolean;
  isWithinRange: boolean;
}

@Component({
    selector: 'ng-daterange-calendar',
    templateUrl: 'ng-daterange-calendar.component.html',
    styleUrls: ['ng-daterange-calendar.component.sass']
})
@Injectable()
export class NgDateRangeCalendarComponent implements OnInit {
    @Input() options: NgDateRangePickerOptions;
    @Input() target: Element | false;
    @Output() onDateFrom: EventEmitter<Date> = new EventEmitter<Date>();
    @Output() onDateTo: EventEmitter<Date> = new EventEmitter<Date>();
    @Output() onValueChange: EventEmitter<string> = new EventEmitter<string>();
    @Input() opened: false | 'from' | 'to';
    @Input() currentRange: 'tm' | 'lm' | 'lw' | 'tw' | 'ty' | 'ly';

    _dateFrom: Date;
    get dateFrom(): Date {
        return this._dateFrom;
    };

    set dateFrom(value: Date) {
        this._dateFrom = value;
        this.onDateFrom.emit(this.dateFrom);
    }

    _dateTo: Date;
    get dateTo(): Date {
        return this._dateTo;
    };

    set dateTo(value: Date) {
        this._dateTo = value;
        this.onDateTo.emit(this.dateTo);
    }

    private coords: ClientRect;
    date: Date;
    dayNames: string[];
    days: IDay[];

    constructor(public element: ElementRef,
                private helper: NgDateRangePickerHelper) { }

    ngOnInit(): void {
        this.date = dateFns.startOfDay(new Date());
        this.currentRange = this.options.range;
        this.initNames();
        this.showAt();
        this.generateCalendar();
    }

    initNames(): void {
        this.dayNames = this.options.dayNames;
    }

    showAt(): void {
        if (this.target) {
            this.coords = this.target.getBoundingClientRect();
        } else {
            this.coords = {
                top: 0,
                left: 0,
                bottom: 0,
                right: 0
            } as ClientRect;
        }
        let el: HTMLElement = this.element.nativeElement;
        el.style.top = (this.coords.bottom + 75) + 'px';
        el.style.left = this.coords.left + 'px';
        el.style.position = 'absolute';
    }

    generateCalendar(): void {
        this.days = [];
        let start: Date = dateFns.startOfMonth(this.date);
        let end: Date = dateFns.endOfMonth(this.date);

        let days: IDay[] = dateFns.eachDay(start, end).map(d => {
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
        let prevMonthDays: IDay[] = [];
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

    selectDate(e: MouseEvent, index: number): void {
        e.preventDefault();
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
        this.emitValue();
    }

    prevMonth(): void {
        this.date = dateFns.subMonths(this.date, 1);
        this.generateCalendar();
    }

    nextMonth(): void {
        this.date = dateFns.addMonths(this.date, 1);
        this.generateCalendar();
    }

    selectRange(range: 'tm' | 'lm' | 'lw' | 'tw' | 'ty' | 'ly'): void {
        this.currentRange = range;
        let dates: DateObj = this.helper.selectRange(this.options, range);
        this.dateFrom = dates.dateFrom;
        this.dateTo = dates.dateTo;
        this.generateCalendar();
        this.emitValue();
    }

    closeCalendar(e: MouseEvent): void {
        this.opened = false;
    }

    emitValue(): void {
        this.onValueChange
            .emit(`${dateFns.format(this.dateFrom, this.options.outputFormat)}-${dateFns.format(this.dateTo, this.options.outputFormat)}`);
    }

    getCSSClasses(): string {
        return `calendar theme-${this.options.theme}${!!this.opened ? ' is-opened' : ''}${this.opened === 'to' ? ' is-to' : ''}`;
    }
}
