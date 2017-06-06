import { DateObj, NgDateRangePickerHelper } from './shared/ng-daterangerpicker.helper';
import {
    NgDateRangeCalendarComponent
} from './ng-daterange-calendar/ng-daterange-calendar.component';
import {
    ApplicationRef,
    Component,
    ComponentFactory,
    ComponentFactoryResolver,
    ComponentRef,
    ElementRef,
    forwardRef,
    HostListener,
    Injector,
    Input,
    OnChanges,
    OnInit,
    Renderer,
    SimpleChange,
    Type,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { NgDateRangePickerOptions } from './shared/ng-daterangepicker-options';
import * as dateFns from 'date-fns';

export let DATERANGEPICKER_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgDateRangePickerComponent),
  multi: true
};

@Component({
  selector: 'ng-daterangepicker',
  templateUrl: 'ng-daterangepicker.component.html',
  styleUrls: ['ng-daterangepicker.sass'],
  providers: [ DATERANGEPICKER_VALUE_ACCESSOR ]
})
export class NgDateRangePickerComponent implements ControlValueAccessor, OnInit, OnChanges {
  @Input() options: NgDateRangePickerOptions;
  @Input() container: string;
  @ViewChild('defaultContainer')
  public defaultContainer: ElementRef;

  created: boolean;
  calendarComponentRef: ComponentRef<NgDateRangeCalendarComponent>;
  modelValue: string;
  _opened: false | 'from' | 'to' = false;
  get opened(): false | 'from' | 'to' {
    return this._opened;
  };
  set opened(value: false | 'from' | 'to') {
    this._opened = value;
    if (this.calendarComponentRef && this.calendarComponentRef.instance) {
      this.calendarComponentRef.instance.opened = this.opened;
    }
  };
  dateFrom: Date;
  dateTo: Date;
  defaultOptions: NgDateRangePickerOptions = {
    theme: 'default',
    range: 'tm',
    dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
    dateFormat: 'yMd',
    outputFormat: 'DD/MM/YYYY',
    startOfWeek: 0,
    container: false
  }

  private onTouchedCallback: () => void = () => { };
  private onChangeCallback: (_: any) => void = () => { };

  constructor(private elementRef: ElementRef,
              private renderer: Renderer,
              private injector: Injector,
              private viewContainerRef: ViewContainerRef,
              private applicationRef: ApplicationRef,
              private componentFactoryResolver: ComponentFactoryResolver,
              private helper: NgDateRangePickerHelper) {
  }

  get value(): string {
    return this.modelValue;
  }

  set value(value: string) {
    if (!value) { return; }
    this.modelValue = value;
    this.onChangeCallback(value);
  }

  writeValue(value: string) {
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
    this.options = this.options || this.defaultOptions;
    let dates: DateObj = this.helper.selectRange(this.options);
    this.dateFrom = dates.dateFrom;
    this.dateTo = dates.dateTo;
  }

  ngOnChanges(changes: {[propName: string]: SimpleChange}) {
    this.options = this.options || this.defaultOptions;
  }

  toggleCalendar(e: MouseEvent, selection: 'from' | 'to'): void {
    if (!this.created) {
      this.createCalendar();
      this.created = true;
    }
    if (this.opened && this.opened !== selection) {
      this.opened = selection;
      this.calendarComponentRef.instance.opened = this.opened;
    } else {
      this.opened = this.opened ? false : selection;
      this.calendarComponentRef.instance.opened = this.opened;
    }
  }

  createCalendar(): void {
    this.calendarComponentRef = this.componentFactoryResolver.resolveComponentFactory(NgDateRangeCalendarComponent).create(this.injector);
    this.initCalendar();
    this.applicationRef.attachView(this.calendarComponentRef.hostView);
    let container: HTMLElement = this.options.container ?
      document.querySelector(this.options.container) :
      this.defaultContainer.nativeElement;
    container.appendChild(this.calendarComponentRef.location.nativeElement);
  }

  initCalendar(): void {
    this.calendarComponentRef.instance.options = this.options;
    this.calendarComponentRef.instance.dateFrom = this.dateFrom;
    this.calendarComponentRef.instance.dateTo = this.dateTo;
    this.calendarComponentRef.instance.onDateFrom.subscribe((val: Date) => {
        this.dateFrom = val;
    });
    this.calendarComponentRef.instance.onDateTo.subscribe((val: Date) => {
        this.dateTo = val;
    });
    this.calendarComponentRef.instance.opened = this.opened;
    this.calendarComponentRef.instance.onValueChange.subscribe((val: string) => {
      this.value = val;
    });
    this.calendarComponentRef.instance.target = this.options.container ? this.defaultContainer.nativeElement : false;
  }

  getCSSClasses(): string {
    return `ng-daterangepicker theme-${this.options.theme}${!!this.opened ? ' is-active' : ''}`;
  }

  @HostListener('document:click', ['$event'])
  handleBlurClick(e: MouseEvent) {
    let target = e.srcElement || e.target;
    if (!this.elementRef.nativeElement.contains(e.target)
      && (this.calendarComponentRef && !this.calendarComponentRef.instance.element.nativeElement.contains(e.target))
      && !(<Element>target).classList.contains('day-num')) {
      this.opened = false;
    }
  }
}
