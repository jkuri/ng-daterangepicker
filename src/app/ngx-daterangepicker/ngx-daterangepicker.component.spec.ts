import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  NgxDateRangePickerComponent,
  NgxDateRangePickerOptions,
  TimeRangeEnum,
} from './ngx-daterangepicker.component';
import { FormsModule } from '@angular/forms';
import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subDays,
  subMonths,
  subWeeks,
  subYears,
} from 'date-fns';

@Component({
  selector: 'ngx-test-wrapper-component',
  template:
    '<ngx-daterangepicker [(ngModel)]="value" [options]="options"></ngx-daterangepicker>',
})
class TestWrapperComponent {
  @ViewChild(NgxDateRangePickerComponent, { static: true })
  public ngxDateRangePickerComponent: NgxDateRangePickerComponent;
  public options: Partial<NgxDateRangePickerOptions>;
  public value: String;
}

describe('UserSearchComponent', () => {
  let component: NgxDateRangePickerComponent;
  let wrapperComponent: TestWrapperComponent;
  let fixture: ComponentFixture<TestWrapperComponent>;

  const initComponent = (
    options: Partial<NgxDateRangePickerOptions> = null
  ) => {
    fixture = TestBed.createComponent(TestWrapperComponent);
    wrapperComponent = fixture.componentInstance;
    component = wrapperComponent.ngxDateRangePickerComponent;
    wrapperComponent.options = options;
    fixture.detectChanges();
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [TestWrapperComponent, NgxDateRangePickerComponent],
    }).compileComponents();
  }));

  it('should create', () => {
    initComponent();

    expect(component).toBeTruthy();
  });

  describe('on init', () => {
    it('should set calendar visibility to false', () => {
      initComponent();

      expect(component.opened).toEqual(false);
    });

    it('should set default values', () => {
      const defaultOptions: NgxDateRangePickerOptions = {
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

      initComponent();

      expect(component.range).toEqual(defaultOptions.range);
      expect(component.dayNames).toEqual(defaultOptions.dayNames);
      expect(component.options).toEqual(defaultOptions);
    });

    it('should apply given options', () => {
      const expectedOptions: NgxDateRangePickerOptions = {
        theme: 'teal',
        range: 'LM',
        dayNames: ['M', 'Tu', 'W', 'Th', 'F', 'Sa', 'Su'],
        presetNames: [
          'TW',
          'L7D',
          'LW',
          'TM',
          'LM',
          'TY',
          'LY',
          'S',
          'E',
          'A',
          'C',
        ],
        dateFormat: 'Myd',
        startOfWeek: 4,
        position: 'right',
      };

      initComponent(expectedOptions);

      expect(component.range).toEqual(expectedOptions.range);
      expect(component.dayNames).toEqual(expectedOptions.dayNames);
      expect(component.options).toEqual(expectedOptions);
    });

    it('should set initial date based on given range option', () => {
      const today = startOfDay(new Date());

      const testSet: {
        range: TimeRangeEnum;
        expectedFrom: Date;
        expectedTo: Date;
      }[] = [
        {
          range: TimeRangeEnum.THIS_MONTH,
          expectedFrom: startOfMonth(today),
          expectedTo: endOfMonth(today),
        },
        {
          range: TimeRangeEnum.LAST_MONTH,
          expectedFrom: startOfMonth(subMonths(today, 1)),
          expectedTo: endOfMonth(subMonths(today, 1)),
        },
        {
          range: TimeRangeEnum.LAST_WEEK,
          expectedFrom: startOfWeek(subWeeks(today, 1), {
            weekStartsOn: component.defaultOptions.startOfWeek,
          }),
          expectedTo: endOfWeek(subWeeks(today, 1), {
            weekStartsOn: component.defaultOptions.startOfWeek,
          }),
        },
        {
          range: TimeRangeEnum.THIS_WEEK,
          expectedFrom: startOfWeek(today),
          expectedTo: endOfWeek(today),
        },
        {
          range: TimeRangeEnum.THIS_YEAR,
          expectedFrom: startOfYear(today),
          expectedTo: endOfYear(today),
        },
        {
          range: TimeRangeEnum.LAST_YEAR,
          expectedFrom: startOfYear(subYears(today, 1)),
          expectedTo: endOfYear(subYears(today, 1)),
        },
        {
          range: TimeRangeEnum.LAST_SEVEN_DAYS,
          expectedFrom: subDays(today, 7),
          expectedTo: today,
        },
      ];

      testSet.forEach(({ range, expectedFrom, expectedTo }) => {
        initComponent({ range });

        expect(component.dateFrom).toEqual(expectedFrom);
        expect(component.dateTo).toEqual(expectedTo);
      });
    });
  });

  describe('toggle calendar', () => {
    const mockEvent = new MouseEvent('');

    beforeEach(() => initComponent());

    it('should switch between calendar view modes', () => {
      ['to', 'from'].forEach((expected: 'from' | 'to') => {
        component.toggleCalendar(mockEvent, expected);
        expect(component.opened).toEqual(expected);
      });
    });

    it('should close calendar', () => {
      ['to', 'from'].forEach((expected: 'from' | 'to') => {
        component.toggleCalendar(mockEvent, expected);
        component.toggleCalendar(mockEvent, expected);
        expect(component.opened).toEqual(false);
      });
    });
  });

  describe('selectDate', () => {
    const mockEvent = new MouseEvent('');

    beforeEach(() => initComponent());

    it('should set selected date', () => {
      component.opened = 'from';

      component.selectDate(mockEvent, 4);
      component.selectDate(mockEvent, 16);

      expect(component.dateFrom).toEqual(startOfDay(component.days[4].date));
      expect(component.dateTo).toEqual(endOfDay(component.days[16].date));
    });

    it('should switch calendar view mode on selection', () => {
      component.opened = 'from';

      component.selectDate(mockEvent, 15);
      expect(component.opened).toEqual('to');

      component.selectDate(mockEvent, 21);
      expect(component.opened).toEqual('from');

      component.selectDate(mockEvent, 3);
      expect(component.opened).toEqual('to');
    });

    it('should set dateTo to end of selected day when dateFrom is after dateTo', () => {
      component.opened = 'to';

      component.selectDate(mockEvent, 13);
      component.selectDate(mockEvent, 18);

      expect(component.dateFrom).toEqual(startOfDay(component.days[18].date));
      expect(component.dateTo).toEqual(endOfDay(component.days[18].date));
    });

    it('should set dateFrom to start of selected day when dateTo is prior dateFrom', () => {
      component.opened = 'from';

      component.selectDate(mockEvent, 15);
      component.selectDate(mockEvent, 9);

      expect(component.dateFrom).toEqual(startOfDay(component.days[9].date));
      expect(component.dateTo).toEqual(endOfDay(component.days[9].date));
    });
  });
});
