import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { ReportService } from 'src/app/core/services/report.service';
import { StoreService } from 'src/app/core/services/store.service';
import { Regex } from 'src/app/utils/enums/regex.enum';
import { Roles } from 'src/app/utils/enums/roles.enum';
import { DashboardCard } from 'src/app/utils/models/dashboard-card.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public authentication: any;
  public cards: any;
  public orderMetrics: any;
  public productMetrics: any;
  public revenueMetrics: any;
  public revenueByStoreMetrics: any;
  public store: any;
  public storeMetrics: any;
  public userMetrics: any;

  constructor(
    private authService: AuthenticationService,
    private loader: LoaderService,
    private modalService: ModalService,
    private reportService: ReportService,
    private route: ActivatedRoute,
    private router: Router,
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  public dashboardClick(card: any) {
    const parameter = card.route.match(Regex.ROUTE_PARAMETER);
    let route = card.route;

    if (parameter) {
      const value = this.getValueFromParameterName(parameter[1]);
      route = route.replace(new RegExp(Regex.ROUTE_PARAMETER), value.toString());
    }

    this.navigateToPage(route);
  }

  public navigateToPage(route: string) {
    this.router.navigateByUrl(route);
  }

  private getData(): void {
    this.authentication = this.authService.getAuthenticationState();

    if (this.authentication.roleId === Roles.STORE_ADMIN) {
      this.loader.enable();
      const storeId = parseInt(this.route.snapshot.queryParamMap.get('store'));

      if (storeId && storeId !== NaN) {
        this.storeService.getStoreById(storeId).subscribe(response => {
          this.loader.disable();
          if (response.success) {
            this.store = response.data;
            this.getStoreAdminMetrics(storeId);

          } else {
            this.modalService.openSimpleModal('Atenção', 'Loja não encontrada!', [{ text: 'OK' }]).subscribe(() => {
              this.navigateToPage('gerenciamento/lojas');
            });
          }
        });
      } else {
        this.storeService.getStoresByUserId(this.authentication.userId).subscribe(response => {
          this.loader.disable();
          if (response.success) {
            this.store = response.data[0];
            this.getStoreAdminMetrics(this.store.storeId);

          } else {
            this.modalService.openSimpleModal('Atenção', 'Você não possui lojas cadastradas.', [{ text: 'OK' }]).subscribe(() => {
              this.navigateToPage('gerenciamento/lojas');
            });
          }
        });
      }
    } else {
      this.getSystemAdminReports();
    }
  }

  private getValueFromParameterName(parameter: string): number {
    switch (parameter) {
      case 'storeId':
        return this.store.storeId;
      default:
        return 0;
    }
  }

  private getStoreAdminMetrics(storeId: number): void {
    this.loader.enable();
    this.reportService.getStoreCashFlowRevenueReportsByStoreId(storeId).subscribe(response => {
      this.revenueByStoreMetrics = response.data ? response.data.slice(-1).pop() : null;
      this.reportService.getOrdersReportByStoreId(storeId).subscribe(response => {
        this.orderMetrics = response.data;
        this.reportService.getProductsReportByStoreId(storeId).subscribe(response => {
          this.loader.disable();
          this.productMetrics = response.data;
          this.loadStoreCards();
        });
      });
    });
  }

  private getSystemAdminReports(): void {
    this.loader.enable();
    const date = new Date().toISOString().split("T")[0];
    this.reportService.getSystemCashFlowRevenueReportsByDateRange(date, date).subscribe(response => {
      this.revenueMetrics = response.data ? response.data[0] : null;
      this.reportService.getSystemCashFlowReportsByDateRange(date, date).subscribe(response => {
        this.revenueByStoreMetrics = response.data ? response.data.slice(-1).pop() : null;
        this.reportService.getStoresCountReport().subscribe(response => {
          this.storeMetrics = response.data ? response.data[0] : null;
          this.reportService.getUsersCountReport().subscribe(response => {
            this.userMetrics = response.data ? response.data[0] : null;
            this.loadAdminCards();
            this.loader.disable();
          });
        });
      });
    })
  }

  private loadAdminCards(): void {
    this.cards = [
      new DashboardCard(
        'Receita do dia',
        'card bg-c-green order-card',
        'monetization_on',
        'gerenciamento/receitas',
        {
          label: 'Receita do dia',
          value: this.revenueMetrics ? this.revenueMetrics.revenue : 0
        },
        {
          label: 'Última receita',
          value: this.revenueMetrics ? this.revenueByStoreMetrics.revenue : 0
        }
      ),
      new DashboardCard(
        'Lojas',
        'card bg-c-blue order-card',
        'store',
        'gerenciamento/lojas',
        {
          label: 'Total de lojas',
          value: this.storeMetrics ? this.storeMetrics.stores : 0
        },
        {
          label: 'Lojas ativas',
          value: this.storeMetrics ? this.storeMetrics.activeStores : 0
        }
      ),
      new DashboardCard(
        'Usuários',
        'card bg-c-pink order-card',
        'people',
        'gerenciamento/usuarios',
        {
          label: 'Usuários',
          value: this.userMetrics ? this.userMetrics.users : 0
        },
        {
          label: 'Lojistas',
          value: this.userMetrics ? this.userMetrics.storeAdmins : 0
        }
      )
    ]
  }

  private loadStoreCards(): void {
    this.cards = [
      new DashboardCard(
        'Receita do dia',
        'card bg-c-green order-card',
        'monetization_on',
        'gerenciamento/receitas',
        {
          label: 'Receita do dia',
          value: this.revenueMetrics ? this.revenueMetrics.revenue : 0
        },
        {
          label: 'Última receita',
          value: this.revenueMetrics ? this.revenueByStoreMetrics.revenue : 0
        }
      ),
      new DashboardCard(
        'Pedidos',
        'card bg-c-blue order-card',
        'shopping_cart',
        'gerenciamento/pedidos?store=:storeId:',
        {
          label: 'Total de pedidos',
          value: this.orderMetrics ? this.orderMetrics.orders : 0
        },
        {
          label: 'Pedidos concluídos',
          value: this.orderMetrics ? this.orderMetrics.finishedOrders : 0
        }
      ),
      new DashboardCard(
        'Produtos',
        'card bg-c-yellow order-card',
        'category',
        'gerenciamento/produtos?store=:storeId:',
        {
          label: 'Total de produtos',
          value: this.productMetrics ? this.productMetrics.products : 0
        },
        {
          label: 'Produtos em estoque',
          value: this.productMetrics ? this.productMetrics.activeProducts : 0
        }
      )
    ];
  }
}
