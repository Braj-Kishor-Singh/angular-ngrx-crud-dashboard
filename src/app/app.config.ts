import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';


import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import {provideToastr} from 'ngx-toastr';
import {provideStore} from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { employeeReducer } from './Store/Employee.Reducer';
import { EmpEffect } from './Store/Employee.Effects';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    provideToastr(),
    provideStore({emp:employeeReducer}), 
    provideEffects([EmpEffect]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })]
};
