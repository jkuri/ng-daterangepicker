Angular DateRange Picker
---

This date range picker was heavily inspired by PayPal's datepicker as seen on website.

Demo: https://gnurub.github.io/ngx-daterangepicker/

### Installation

```sh
npm install ngx-daterangepicker --save
```

or

```sh
yarn add ngx-daterangepicker --save
```

### Example

```ts
import { NgDateRangePickerModule } from 'ngx-daterangepicker';

// app.module.ts
@NgModule({
  ...
  imports: [ ..., NgDateRangePickerModule, ... ],
  ...
})
export class AppModule { }
```

```ts
// app.component.ts
import { Component, OnInit } from '@angular/core';
import { NgDateRangePickerOptions } from 'ngx-daterangepicker';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  options: NgDateRangePickerOptions;

  ngOnInit() {
    this.options = {
	  theme: 'default',
	  range: 'tm',
	  dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
	  presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
	  dateFormat: 'yMd',
	  outputFormat: 'DD/MM/YYYY',
	  startOfWeek: 1
	};
  }
}
```

```html
<!-- app.component.html -->
<ngx-daterangepicker [(ngModel)]="value" [options]="options"></ngx-daterangepicker>
```

### Configuration

```ts
export interface NgDateRangePickerOptions {
  theme: 'default' | 'green' | 'teal' | 'cyan' | 'grape' | 'red' | 'gray';
  range: 'tm' | 'lm' | 'lw' | 'tw' | 'ty' | 'ly';
  dayNames: string[];
  presetNames: string[];
  dateFormat: string;
  outputFormat: string;
  startOfWeek: number;
}
```

### Running the demo

```sh
git clone https://github.com/jkuri/ngx-daterangepicker.git --depth 1
cd ngx-daterangepicker
npm start
```

### Licence

MIT
