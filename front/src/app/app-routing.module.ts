import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/dashboard/home' },
  // { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule', canActivate: [ AuthGuard ]},
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponents = [];
