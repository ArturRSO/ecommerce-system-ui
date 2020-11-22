import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/core/services/loader.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { StoreService } from 'src/app/core/services/store.service';
import { Roles } from 'src/app/shared/utils/roles.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private user: any;

  public isAdmin: boolean;
  public stores = [];

  constructor(
    private loader: LoaderService,
    private router: Router,
    private storageService: StorageService,
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
    this.getInitialData();
  }

  private getInitialData(): void {
    this.user = JSON.parse(this.storageService.getSessionItem('userProfile'));
    this.isAdmin = this.user.roleId === Roles.SYSTEM_ADMIN;

    this.loader.enable();
    if (!this.isAdmin) {
      this.storeService.getStoresByUserId(this.user.userId).subscribe(response => {
        this.loader.disable();
        if (response.success) {
          this.stores = response.data;
        }
      });
    }
  }

  public navigateToPage(route: string) {
    this.router.navigateByUrl(route);
  }

  public manageOrders(store: any) {
    // TO DO
    console.log('Gerenciar pedidos');
  }

  public manageProducts(store: any) {
    this.storageService.setSessionItem('currentStore', JSON.stringify(store));
    this.navigateToPage('gerenciar/produtos/loja');
  }

  public manageStores(): void {
    if (this.user.roleId === Roles.STORE_ADMIN) {
      this.navigateToPage('gerenciar/lojas/minhas');

    } else if (this.user.roleId === Roles.SYSTEM_ADMIN) {
      this.navigateToPage('gerenciar/lojas/todas');
    }
  }
}
