Angular DateRange Picker
---

This date range picker was heavily inspired by PayPal's datepicker as seen on website.

### Installation

```sh
npm install angular-daterangepicker --save
```

or

```sh
yarn add angular-daterangepicker --save
```

### Example

```ts
import { AngularDateRangePickerModule } from 'angular-daterangepicker';

// app.module.ts
@NgModule({
  ...
  imports: [ ..., AngularDateRangePickerModule, ... ],
  ...
})
export class AppModule { }
```

```ts
// app.component.ts
import { Component, OnInit } from '@angular/core';
import { AngularDateRangePickerOptions } from 'angular-daterangepicker';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  options: AngularDateRangePickerOptions;

  ngOnInit() {
    this.options = { theme: 'default' };
  }
}
```

```html
<!-- app.component.html -->
<angular-daterangepicker [(ngModel)]="value" [options]="options"></angular-daterangepicker>
```

### Configuration

```ts
export interface AngularDateRangePickerOptions {
  theme: 'default' | 'green' | 'teal' | 'cyan' | 'grape' | 'red' | 'gray';
}
```

### Running the demo

```sh
git clone https://github.com/jkuri/angular-daterangepicker.git --depth 1
cd angular-daterangepicker
npm start
```

### Licence

MIT
