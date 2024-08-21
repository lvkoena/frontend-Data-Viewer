import { provideRouter, Routes, withDebugTracing } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list-component';
import { ApplicationConfig } from '@angular/core';

export const routes: Routes = [
    { path: '', component: UserListComponent },
];

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes, withDebugTracing())]
}
