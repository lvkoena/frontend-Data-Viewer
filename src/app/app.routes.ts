import { provideRouter, RouterModule, Routes, withDebugTracing } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list-component';
import { ApplicationConfig, NgModule } from '@angular/core';

export const routes: Routes = [
    { path: 'register', component: UserListComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
