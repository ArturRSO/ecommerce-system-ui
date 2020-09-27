import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationRoutingModule } from './navigation-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from 'primeng/api';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    NavigationRoutingModule,
    SharedModule
  ]
})
export class NavigationModule { }
