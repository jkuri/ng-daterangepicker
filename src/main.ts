import './polyfills';
import './styles';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/';
import { bootloader } from '@angularclass/hmr';

export function app() {
  return platformBrowserDynamic().bootstrapModule(AppModule);
}

bootloader(app);
