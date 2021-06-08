import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ReportService } from 'src/app/core/services/report.service';
import { Roles } from 'src/app/utils/enums/roles.enum';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public cards: any;
  public metric: any;

  private DASHBOARD_CARDS = [
    {
      title: 'Lojas',
      metric: 'Lojas ativas',
      class: 'card bg-c-blue order-card',
      icon: 'store',
      roles: [Roles.SYSTEM_ADMIN, Roles.STORE_ADMIN]
    },
    {
      title: 'Pedidos',
      metric: 'Pedidos concluídos',
      class: 'card bg-c-green order-card',
      icon: 'shopping_cart',
      roles: [Roles.SYSTEM_ADMIN, Roles.STORE_ADMIN]
    },
    {
      title: 'Produtos',
      metric: 'Produtos em estoque',
      class: 'card bg-c-yellow order-card',
      icon: 'category',
      roles: [Roles.SYSTEM_ADMIN, Roles.STORE_ADMIN]
    },
    {
      title: 'Usuários',
      metric: 'Lojistas',
      class: 'card bg-c-pink order-card',
      icon: 'people',
      roles: [Roles.SYSTEM_ADMIN]
    }
  ];

  constructor(
    private authService: AuthenticationService,
    private reportService: ReportService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCards();
  }

  public dashboardClick(card: any) {
    // TO DO
    console.log(card);
  }

  public navigateToPage(route: string) {
    this.router.navigateByUrl(route);
  }

  private getMetrics(): void {
    this.reportService.getOrdersReportByStoreId(1)
  }

  private loadCards(): void {
    const authentication = this.authService.getAuthenticationState();

    this.cards = this.DASHBOARD_CARDS.filter(option => option.roles.includes(authentication.roleId));
  }
}
