import { Component, ElementRef, forwardRef, HostListener, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as dateFns from 'date-fns';

export type TimeRangeEnum = 'TM' | 'LM' | 'LW' | 'TW' | 'TY' | 'LY' | 'L7D';
export const TimeRangeEnum = {
  THIS_WEEK: 'TW' as TimeRangeEnum,
  LAST_SEVEN_DAYS: 'L7D' as TimeRangeEnum,
  LAST_WEEK: 'LW' as TimeRangeEnum,
  THIS_MONTH: 'TM' as TimeRangeEnum,
  LAST_MONTH: 'LM' as TimeRangeEnum,
  THIS_YEAR: 'TY' as TimeRangeEnum,
  LAST_YEAR: 'LY' as TimeRangeEnum
}

export interface NgxDateRangePickerOptions {
  theme: 'default' | 'green' | 'teal' | 'cyan' | 'grape' | 'red' | 'gray';
  range: TimeRangeEnum;
  dayNames: string[];
  presetNames: string[];
  dateFormat: string;
  startOfWeek: number;
  position: string;
}

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

export interface NgxDateRangePickerOutput {
  from: number;
  to: number;
}

export let DATERANGEPICKER_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgxDateRangePickerComponent),
  multi: true
};

@Component({
  selector: 'ngx-daterangepicker',
  templateUrl: 'ngx-daterangepicker.component.html',
  styleUrls: ['ngx-daterangepicker.scss'],
  providers: [ DATERANGEPICKER_VALUE_ACCESSOR ]
})
export class NgxDateRangePickerComponent implements ControlValueAccessor, OnInit, OnChanges {
  @Input() options: NgxDateRangePickerOptions;

  modelValue: NgxDateRangePickerOutput;
  opened: false | 'from' | 'to';
  date: Date;
  dateFrom: Date;
  dateTo: Date;
  dayNames: string[];
  days: IDay[];
  range: TimeRangeEnum;
  defaultOptions: NgxDateRangePickerOptions = {
    theme: 'default',
    range: TimeRangeEnum.THIS_MONTH,
    dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    presetNames: [
      'This Week',
      'Last 7 Days',
      'Last Week',
      'This Month',
      'Last Month',
      'This Year',
      'Last Year',
      'Start',
      'End',
      'Apply',
      'Cancel'
    ],
    dateFormat: 'yMd',
    startOfWeek: 0,
    position: 'left'
  };
  availableRanges: string[] = [
    TimeRangeEnum.THIS_WEEK,
    TimeRangeEnum.LAST_SEVEN_DAYS,
    TimeRangeEnum.LAST_WEEK,
    TimeRangeEnum.THIS_MONTH,
    TimeRangeEnum.LAST_MONTH,
    TimeRangeEnum.THIS_YEAR,
    TimeRangeEnum.LAST_YEAR
  ];
  openerDates: Date[] = [null, null];
  openerRange: TimeRangeEnum;

  private onTouchedCallback: () => void = () => { };
  private onChangeCallback: (_: any) => void = () => { };

  constructor(private elementRef: ElementRef) { }

  get value(): NgxDateRangePickerOutput {
    return this.modelValue;
  }

  set value(value: NgxDateRangePickerOutput) {
    if (!value) { return; }
    this.modelValue = value;
    this.onChangeCallback(value);
  }

  writeValue(value: NgxDateRangePickerOutput) {
    if (!value) { return; }
    this.modelValue = value;
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  ngOnInit() {
    this.opened = false;
    this.date = dateFns.startOfDay(new Date());
    this.options = Object.assign({}, this.defaultOptions, this.options);
    this.initNames();
    this.selectRange(this.options.range);
  }

  ngOnChanges(changes: {[propName: string]: SimpleChange}) {
    this.options = Object.assign({}, this.defaultOptions, this.options);
  }

  initNames(): void {
    this.dayNames = this.options.dayNames;
  }

  generateCalendar(): void {
    this.days = [];
    const start: Date = dateFns.startOfMonth(this.date);
    const end: Date = dateFns.endOfMonth(this.date);

    const days: IDay[] = dateFns.eachDay(start, end).map((d) => {
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

    const prevMonthDayNum = dateFns.getDay(start) !== 0 ? dateFns.getDay(start) - 1 : 6;

    let prevMonthDays: IDay[] = [];
    if (prevMonthDayNum > 0) {
      prevMonthDays = Array.from(Array(prevMonthDayNum).keys()).map((i) => {
        const d = dateFns.subDays(start, prevMonthDayNum - i);
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

    this.generateCalendar();
  }

  closeCalendar(): void {
    this.resetValues();
    this.opened = false;
  }

  selectDate(e: MouseEvent, index: number): void {
    e.preventDefault();
    const selectedDate: Date = this.days[index].date;

    if (this.opened === 'from') {
      if (dateFns.isAfter(selectedDate, this.dateTo)) {
        this.dateFrom = selectedDate;
        this.dateTo = dateFns.endOfDay(selectedDate);
        this.opened = 'to';
      } else {
        this.dateFrom = selectedDate;
        this.opened = 'to';
      }
    } else if (this.opened === 'to') {
      if (dateFns.isBefore(selectedDate, this.dateFrom)) {
        this.dateTo = dateFns.endOfDay(selectedDate);
        this.dateFrom = dateFns.startOfDay(selectedDate);
        this.opened = 'from';
      } else {
        this.dateTo = dateFns.endOfDay(selectedDate);
        this.opened = 'from';
      }
    }

    if (dateFns.isEqual(this.dateFrom, this.dateTo)) {
      this.dateTo = dateFns.addDays(this.dateFrom, 1);
      this.opened = 'to';
    }

    this.range = null;
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

  selectRange(range: TimeRangeEnum): void {
    let today = dateFns.startOfDay(new Date());

    this.range = range;

    switch (this.range) {
      case TimeRangeEnum.THIS_MONTH:
        this.dateFrom = dateFns.startOfMonth(today);
        this.dateTo = dateFns.endOfMonth(today);
        break;
      case TimeRangeEnum.LAST_MONTH:
        today = dateFns.subMonths(today, 1);
        this.dateFrom = dateFns.startOfMonth(today);
        this.dateTo = dateFns.endOfMonth(today);
        break;
      case TimeRangeEnum.LAST_WEEK:
        today = dateFns.subWeeks(today, 1);
        this.dateFrom = dateFns.startOfWeek(today, {weekStartsOn: this.options.startOfWeek});
        this.dateTo = dateFns.endOfWeek(today, {weekStartsOn: this.options.startOfWeek});
        break;
      case TimeRangeEnum.THIS_WEEK:
        this.dateFrom = dateFns.startOfWeek(today, {weekStartsOn: this.options.startOfWeek});
        this.dateTo = dateFns.endOfWeek(today, {weekStartsOn: this.options.startOfWeek});
        break;
      case TimeRangeEnum.THIS_YEAR:
        this.dateFrom = dateFns.startOfYear(today);
        this.dateTo = dateFns.endOfYear(today);
        break;
      case TimeRangeEnum.LAST_YEAR:
        today = dateFns.subYears(today, 1);
        this.dateFrom = dateFns.startOfYear(today);
        this.dateTo = dateFns.endOfYear(today);
        break;
      case TimeRangeEnum.LAST_SEVEN_DAYS:
        this.dateFrom = dateFns.subDays(today, 7);
        this.dateTo = today;
        break;
    }

    if (!this.opened) {
      this.setOpenerValues();
    }

    this.generateCalendar();
  }

  updateValue(): void {
    this.value = {
      from: +this.dateFrom,
      to: +this.dateTo
    };
    this.opened = false;
    this.setOpenerValues();
  }

  setOpenerValues(): void {
    this.openerDates = [this.dateFrom, this.dateTo];
    this.openerRange = this.range;
  }

  setSelected(range: string): boolean {
    return range === this.range;
  }

  resetValues(): void {
    this.dateFrom = this.openerDates[0];
    this.dateTo = this.openerDates[1];
    this.range = this.openerRange;
  }

  @HostListener('document:click', ['$event'])
  handleBlurClick(e: MouseEvent) {
    const target = e.srcElement || e.target;
    if (!this.elementRef.nativeElement.contains(e.target) && !(<Element>target).classList.contains('day-num')) {
      this.resetValues();
      this.opened = false;
    }
  }
}
