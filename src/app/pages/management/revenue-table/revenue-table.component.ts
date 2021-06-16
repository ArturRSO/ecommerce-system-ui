import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { ReportService } from 'src/app/core/services/report.service';
import { Roles } from 'src/app/utils/enums/roles.enum';
import { ReportTypeList } from 'src/app/utils/lists/report-type.list';

@Component({
  selector: 'app-revenue-table',
  templateUrl: './revenue-table.component.html',
  styleUrls: ['./revenue-table.component.scss']
})
export class RevenueTableComponent implements OnInit {

  public columns = [];
  public headers = [];
  public reports = [];

  public form: FormGroup;
  public reportTypes = [];
  public reportTypesList = new ReportTypeList();
  public submitted = false;
  public validationMessages: any;

  private authentication: any;
  private currentReportTypeId = this.reportTypesList.history.id;
  private storeId: number;

  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private loader: LoaderService,
    private modalService: ModalService,
    private reportService: ReportService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getData();
    this.setValidationMessages();
  }

  get f() {
    return this.form.controls;
  }

  public clearFilter(): void {
    this.selectReport(null);
  }

  public filterByDateRange(dateRange: any): void {
    this.selectReport(dateRange);
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.selectReport(null);
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      reportTypeId: ['', [Validators.required]]
    });
  }

  private getData(): void {
    this.loader.enable();
    this.reportTypes = this.reportTypesList.getAllReportsTypes();

    this.authentication = this.authService.getAuthenticationState();
    const storeId = parseInt(this.route.snapshot.queryParamMap.get('store'));

    if (this.authentication.roleId === Roles.SYSTEM_ADMIN) {
      this.getSystemCashFlowReports();

    } else {
      if (storeId && storeId !== NaN) {
        this.storeId = storeId;
        this.getStoreCashFlowReportsByStoreId();

      } else {
        this.loader.disable();
        this.modalService.openSimpleModal('Atenção', 'Forneça um ID válido!', [{ text: 'OK' }]).subscribe(() => {
          this.navigateToPage('gerenciamento/dashboard');
        });
      }
    }
  }

  private getStoreCashFlowReportsByStoreId(): void {
    this.reportService.getStoreCashFlowReportsByStoreId(this.storeId).subscribe(response => {
      this.loader.disable();
      if (response.success) {
        this.columns = ['orderId', 'productName', 'value', 'timestamp'];
        this.headers = ['Pedido', 'Produto', 'Valor', 'Data do pedido']
        this.reports = response.data.reverse();
      }
    });
  }

  private getStoreCashFlowReportsByDateRangeAndStoreId(dateRange: any) {
    this.reportService.getStoreCashFlowReportsByDateRangeAndStoreId(dateRange.startDate, dateRange.endDate, this.storeId).subscribe(response => {
      this.loader.disable();
      if (response.success) {
        this.columns = ['orderId', 'productName', 'value', 'timestamp'];
        this.headers = ['Pedido', 'Produto', 'Valor', 'Data do pedido']
        this.reports = response.data.reverse();
      }
    });
  }

  private getStoreCashFlowRevenueReportsByStoreId(): void {
    this.reportService.getStoreCashFlowRevenueReportsByStoreId(this.storeId).subscribe(response => {
      if (response.success) {
        this.columns = ['revenue', 'timestamp'];
        this.headers = ['Receita', 'Data do pedido'];
        this.reports = response.data.reverse();
      }
    });
  }

  private getStoreCashFlowRevenueReportsByDateRangeAndStoreId(dateRange: any) {
    this.reportService.getStoreCashFlowRevenueReportsByDateRangeAndStoreId(dateRange.startDate, dateRange.endDate, this.storeId).subscribe(response => {
      this.loader.disable();
      if (response.success) {
        this.columns = ['revenue', 'timestamp'];
        this.headers = ['Receita', 'Data do pedido'];
        this.reports = response.data.reverse();
      }
    });
  }

  private getSystemCashFlowReports(): void {
    this.reportService.getSystemCashFlowReports().subscribe(response => {
      this.loader.disable();
      if (response.success) {
        this.columns = ['orderId', 'storeName', 'value', 'timestamp'];
        this.headers = ['Pedido', 'Loja', 'Valor', 'Data do pedido'];
        this.reports = response.data.reverse();
      }
    });
  }

  private getSystemCashFlowReportsByDateRange(dateRange: any) {
    this.reportService.getSystemCashFlowReportsByDateRange(dateRange.startDate, dateRange.endDate).subscribe(response => {
      this.loader.disable();
      if (response.success) {
        this.columns = ['orderId', 'storeName', 'value', 'timestamp'];
        this.headers = ['Pedido', 'Loja', 'Valor', 'Data do pedido'];
        this.reports = response.data.reverse();
      }
    });
  }

  private getSystemCashFlowRevenueReports(): void {
    this.reportService.getSystemCashFlowRevenueReports().subscribe(response => {
      this.loader.disable();
      if (response.success) {
        this.columns = ['revenue', 'timestamp'];
        this.headers = ['Receita', 'Data do pedido'];
        this.reports = response.data.reverse();
      }
    });
  }

  private getSystemCashFlowRevenueReportsByDateRange(dateRange: any) {
    this.reportService.getSystemCashFlowRevenueReportsByDateRange(dateRange.startDate, dateRange.endDate).subscribe(response => {
      this.loader.disable();
      if (response.success) {
        this.columns = ['revenue', 'timestamp'];
        this.headers = ['Receita', 'Data do pedido'];
        this.reports = response.data.reverse();
      }
    });
  }

  private navigateToPage(route: string) {
    this.router.navigateByUrl(route);
  }

  private selectReport(dateRangeFilter: any): void {
    this.loader.enable();

    this.currentReportTypeId = this.f.reportTypeId.value;

    if (dateRangeFilter) {
      if (this.authentication.roleId === Roles.SYSTEM_ADMIN) {
        switch (this.currentReportTypeId) {
          case this.reportTypesList.history.id:
            this.getSystemCashFlowReportsByDateRange(dateRangeFilter);
            break;
          case this.reportTypesList.total.id:
            this.getSystemCashFlowRevenueReportsByDateRange(dateRangeFilter);
            break;
        }
      } else {
        switch (this.currentReportTypeId) {
          case this.reportTypesList.history.id:
            this.getStoreCashFlowReportsByDateRangeAndStoreId(dateRangeFilter);
            break;
          case this.reportTypesList.total.id:
            this.getStoreCashFlowRevenueReportsByDateRangeAndStoreId(dateRangeFilter);
            break;
        }
      }
    } else {
      if (this.authentication.roleId === Roles.SYSTEM_ADMIN) {
        switch (this.currentReportTypeId) {
          case this.reportTypesList.history.id:
            this.getSystemCashFlowReports();
            break;
          case this.reportTypesList.total.id:
            this.getSystemCashFlowRevenueReports();
            break;
        }
      } else {
        switch (this.currentReportTypeId) {
          case this.reportTypesList.history.id:
            this.getStoreCashFlowReportsByStoreId();
            break;
          case this.reportTypesList.total.id:
            this.getStoreCashFlowRevenueReportsByStoreId();
            break;
        }
      }
    }
  }

  private setValidationMessages(): void {
    this.validationMessages = {
      reportTypeId: [
        { type: 'required', message: 'Selecione o tipo de relatório' }
      ]
    }
  }
}
