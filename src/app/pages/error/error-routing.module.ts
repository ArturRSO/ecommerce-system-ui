import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnavailabilityComponent } from './unavailability/unavailability.component';

const routes: Routes = [
  {
    path: 'indisponivel',
    component: UnavailabilityComponent
  },
  {
    path: '',
    redirectTo: 'indisponivel',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ErrorRoutingModule { }
