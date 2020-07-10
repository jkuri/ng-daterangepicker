import {
  Component,
  ElementRef,
  forwardRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  getDate,
  getDay,
  isAfter,
  isBefore,
  isEqual,
  isFirstDayOfMonth,
  isLastDayOfMonth,
  isSameDay,
  isToday,
  isWithinInterval,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subDays,
  subMonths,
  subWeeks,
  subYears,
} from 'date-fns';

export type TimeRangeEnum = 'TM' | 'LM' | 'LW' | 'TW' | 'TY' | 'LY' | 'L7D';
export const TimeRangeEnum = {
  THIS_WEEK: 'TW' as TimeRangeEnum,
  LAST_SEVEN_DAYS: 'L7D' as TimeRangeEnum,
  LAST_WEEK: 'LW' as TimeRangeEnum,
  THIS_MONTH: 'TM' as TimeRangeEnum,
  LAST_MONTH: 'LM' as TimeRangeEnum,
  THIS_YEAR: 'TY' as TimeRangeEnum,
  LAST_YEAR: 'LY' as TimeRangeEnum,
};

export interface NgxDateRangePickerOptions {
  theme: 'default' | 'green' | 'teal' | 'cyan' | 'grape' | 'red' | 'gray';
  range: TimeRangeEnum;
  dayNames: string[];
  presetNames: string[];
  dateFormat: string;
  startOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
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
  multi: true,
};

@Component({
  selector: 'ngx-daterangepicker',
  templateUrl: 'ngx-daterangepicker.component.html',
  styleUrls: ['ngx-daterangepicker.scss'],
  providers: [DATERANGEPICKER_VALUE_ACCESSOR],
})
export class NgxDateRangePickerComponent
  implements ControlValueAccessor, OnInit, OnChanges {
  @Input() options: Partial<NgxDateRangePickerOptions>;

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
      'Cancel',
    ],
    dateFormat: 'yMd',
    startOfWeek: 0,
    position: 'left',
  };
  availableRanges: string[] = [
    TimeRangeEnum.THIS_WEEK,
    TimeRangeEnum.LAST_SEVEN_DAYS,
    TimeRangeEnum.LAST_WEEK,
    TimeRangeEnum.THIS_MONTH,
    TimeRangeEnum.LAST_MONTH,
    TimeRangeEnum.THIS_YEAR,
    TimeRangeEnum.LAST_YEAR,
  ];
  openerDates: Date[] = [null, null];
  openerRange: TimeRangeEnum;

  private onTouchedCallback: () => void = () => {};
  private onChangeCallback: (_: any) => void = () => {};

  constructor(private elementRef: ElementRef) {}

  get value(): NgxDateRangePickerOutput {
    return this.modelValue;
  }

  set value(value: NgxDateRangePickerOutput) {
    if (!value) {
      return;
    }
    this.modelValue = value;
    this.onChangeCallback(value);
  }

  writeValue(value: NgxDateRangePickerOutput): void {
    if (!value) {
      return;
    }
    this.modelValue = value;
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  ngOnInit(): void {
    this.opened = false;
    this.date = startOfDay(new Date());
    this.options = Object.assign({}, this.defaultOptions, this.options);
    this.initNames();
    this.selectRange(this.options.range);
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    this.options = Object.assign({}, this.defaultOptions, this.options);
  }

  initNames(): void {
    this.dayNames = this.options.dayNames;
  }

  generateCalendar(): void {
    this.days = [];
    const start: Date = startOfMonth(this.date);
    const end: Date = endOfMonth(this.date);

    const days: IDay[] = eachDayOfInterval({ start, end }).map((d) => {
      return {
        date: d,
        day: getDate(d),
        weekday: getDay(d),
        today: isToday(d),
        firstMonthDay: isFirstDayOfMonth(d),
        lastMonthDay: isLastDayOfMonth(d),
        visible: true,
        from: isSameDay(this.dateFrom, d),
        to: isSameDay(this.dateTo, d),
        isWithinRange: isWithinInterval(d, {
          start: this.dateFrom,
          end: this.dateTo,
        }),
      };
    });

    const prevMonthDayNum = getDay(start) !== 0 ? getDay(start) - 1 : 6;

    let prevMonthDays: IDay[] = [];
    if (prevMonthDayNum > 0) {
      prevMonthDays = Array.from(Array(prevMonthDayNum).keys()).map((i) => {
        const d = subDays(start, prevMonthDayNum - i);
        return {
          date: d,
          day: getDate(d),
          weekday: getDay(d),
          firstMonthDay: isFirstDayOfMonth(d),
          lastMonthDay: isLastDayOfMonth(d),
          today: false,
          visible: false,
          from: false,
          to: false,
          isWithinRange: false,
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
      if (isAfter(selectedDate, this.dateTo)) {
        this.dateFrom = selectedDate;
        this.dateTo = endOfDay(selectedDate);
        this.opened = 'to';
      } else {
        this.dateFrom = selectedDate;
        this.opened = 'to';
      }
    } else if (this.opened === 'to') {
      if (isBefore(selectedDate, this.dateFrom)) {
        this.dateTo = endOfDay(selectedDate);
        this.dateFrom = startOfDay(selectedDate);
        this.opened = 'from';
      } else {
        this.dateTo = endOfDay(selectedDate);
        this.opened = 'from';
      }
    }

    if (isEqual(this.dateFrom, this.dateTo)) {
      this.dateTo = addDays(this.dateFrom, 1);
      this.opened = 'to';
    }

    this.range = null;
    this.generateCalendar();
  }

  prevMonth(): void {
    this.date = subMonths(this.date, 1);
    this.generateCalendar();
  }

  nextMonth(): void {
    this.date = addMonths(this.date, 1);
    this.generateCalendar();
  }

  selectRange(range: TimeRangeEnum): void {
    let today = startOfDay(new Date());

    this.range = range;

    switch (this.range) {
      case TimeRangeEnum.THIS_MONTH:
        this.dateFrom = startOfMonth(today);
        this.dateTo = endOfMonth(today);
        break;
      case TimeRangeEnum.LAST_MONTH:
        today = subMonths(today, 1);
        this.dateFrom = startOfMonth(today);
        this.dateTo = endOfMonth(today);
        break;
      case TimeRangeEnum.LAST_WEEK:
        today = subWeeks(today, 1);
        this.dateFrom = startOfWeek(today, {
          weekStartsOn: this.options.startOfWeek,
        });
        this.dateTo = endOfWeek(today, {
          weekStartsOn: this.options.startOfWeek,
        });
        break;
      case TimeRangeEnum.THIS_WEEK:
        this.dateFrom = startOfWeek(today, {
          weekStartsOn: this.options.startOfWeek,
        });
        this.dateTo = endOfWeek(today, {
          weekStartsOn: this.options.startOfWeek,
        });
        break;
      case TimeRangeEnum.THIS_YEAR:
        this.dateFrom = startOfYear(today);
        this.dateTo = endOfYear(today);
        break;
      case TimeRangeEnum.LAST_YEAR:
        today = subYears(today, 1);
        this.dateFrom = startOfYear(today);
        this.dateTo = endOfYear(today);
        break;
      case TimeRangeEnum.LAST_SEVEN_DAYS:
        this.dateFrom = subDays(today, 7);
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
      to: +this.dateTo,
    };
    this.opened = false;
    this.setOpenerValues();
  }

  setOpenerValues(): void {
    this.openerDates = [this.dateFrom, this.dateTo];
    this.openerRange = this.range;
  }

  resetValues(): void {
    this.dateFrom = this.openerDates[0];
    this.dateTo = this.openerDates[1];
    this.range = this.openerRange;
  }

  @HostListener('document:click', ['$event'])
  handleBlurClick(e: MouseEvent): void {
    const target = e.srcElement || e.target;
    if (
      !this.elementRef.nativeElement.contains(e.target) &&
      !(target as Element).classList.contains('day-num')
    ) {
      this.resetValues();
      this.opened = false;
    }
  }
}
