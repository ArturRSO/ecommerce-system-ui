import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage.service';
import { Roles } from 'src/app/shared/utils/roles.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public showMenu = true;
  private user: any;

  constructor(
    private router: Router,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(this.storageService.getSessionItem('userProfile'));
  }

  public toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  public navigateToPage(route: string) {
    this.router.navigateByUrl(route);
  }

  public manageStores(): void {
    if (this.user.roleId === Roles.STORE_ADMIN) {
      this.navigateToPage('gerenciar/lojas/minhas');

    } else if (this.user.roleId === Roles.SYSTEM_ADMIN) {
      this.navigateToPage('gerenciar/lojas/todas');
    }
  }
}
