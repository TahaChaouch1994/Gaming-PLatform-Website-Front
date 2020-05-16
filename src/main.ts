<<<<<<< HEAD
=======
import 'hammerjs';
>>>>>>> 92b434ef3e20a4e68a2dd75654e3d8cfd98691f7
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
