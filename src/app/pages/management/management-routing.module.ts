import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { Roles } from 'src/app/utils/enums/roles.enum';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StoresTableComponent } from './stores-table/stores-table.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: [Roles.SYSTEM_ADMIN, Roles.STORE_ADMIN] }
  },
  {
    path: 'lojas',
    component: StoresTableComponent
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
