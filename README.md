Angular DateRange Picker
---

This date range picker based on https://github.com/jkuri/ng-daterangepicker.

### Installation

```sh
npm install ng-daterangepicker --save
```

or

```sh
yarn add ng-daterangepicker --save
```

### Example

```ts
import { NgDateRangePickerModule } from 'ng-daterangepicker';

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
import { NgDateRangePickerOptions, NgDateRangePickerOutput } from '@kiwigrid/ng-daterangepicker';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  value: NgDateRangePickerOutput;
  options: NgDateRangePickerOptions;


  ngOnInit() {
    this.options = {
	  theme: 'default',
	  range: 'tm',
	  dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
	  presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
	  dateFormat: 'yMd',
	  startOfWeek: 1
	};
	this.value = {
  		from: '',
		to: ''
	};
  }
}
```

```html
<!-- app.component.html -->
<ng-daterangepicker [(ngModel)]="value" [options]="options"></ng-daterangepicker>
```

### Configuration

```ts
export interface NgDateRangePickerOptions {
	theme: 'default' | 'green' | 'teal' | 'cyan' | 'grape' | 'red' | 'gray';
	range: 'tm' | 'lm' | 'lw' | 'tw' | 'ty' | 'ly';
    dayNames: string[];
    presetNames: string[];
    dateFormat: string;
    startOfWeek: number;
}
```

### Running the demo

```sh
git clone https://github.com/kiwigrid/ng-daterangepicker.git --depth 1
cd ng-daterangepicker
npm start
```

### Licence

MIT
