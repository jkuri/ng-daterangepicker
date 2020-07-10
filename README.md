## Angular DateRange Picker

This date range picker based on https://github.com/jkuri/ng-daterangepicker.

Supported Angular versions:

| version | angular version |
| ------- | --------------- |
| 1.x     | 9.x             |
| 0.6.x   | 5.x+            |

### Installation

```sh
npm install @kiwigrid/ngx-daterangepicker --save
```

or

```sh
yarn add @kiwigrid/ngx-daterangepicker --save
```

### Example

```ts
import { NgxDateRangePickerModule } from '@kiwigrid/ngx-daterangepicker';

// app.module.ts
@NgModule({
  ...
  imports: [ ..., NgxDateRangePickerModule, ... ],
  ...
})
export class AppModule { }
```

```ts
// app.component.ts
import { Component, OnInit } from '@angular/core';
import {
  NgxDateRangePickerOptions,
  NgxDateRangePickerOutput,
} from '@kiwigrid/ngx-daterangepicker';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  value: NgxDateRangePickerOutput;
  options: NgxDateRangePickerOptions;

  ngOnInit() {
    this.options = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: [
        'This Month',
        'Last Month',
        'This Week',
        'Last Week',
        'This Year',
        'Last Year',
        'Last 7 Days',
        'Start',
        'End',
        'Apply',
        'Cancel',
      ],
      dateFormat: 'yMd',
      startOfWeek: 1,
      position: 'right',
    };
    this.value = {
      from: 0,
      to: 0,
    };
  }
}
```

```html
<!-- app.component.html -->
<ngx-daterangepicker
  [(ngModel)]="value"
  [options]="options"
></ngx-daterangepicker>
```

### Configuration

```ts
export interface NgxDateRangePickerOptions {
  theme: 'default' | 'green' | 'teal' | 'cyan' | 'grape' | 'red' | 'gray';
  range: 'tm' | 'lm' | 'lw' | 'tw' | 'ty' | 'ly';
  dayNames: string[];
  presetNames: string[];
  dateFormat: string;
  startOfWeek: number;
  position: string;
}
```

### Running the demo

```sh
git clone https://github.com/kiwigrid/ngx-daterangepicker.git
cd ngx-daterangepicker
npm install
npm start
```

### Licence

MIT
