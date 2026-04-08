import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

// Application configuration for Angular standalone bootstrap
export const appConfig: ApplicationConfig = {
  // Providers array: registers application-wide services
  providers: [
    provideRouter(routes)  // Sets up routing with defined application routes
  ]
};