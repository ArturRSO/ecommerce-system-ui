import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private baseApiUrl = `${environment.API_URL}/reports`;

  constructor(
    private http: HttpClient
  ) { }

  public getOrdersReportByStoreId(storeId: number): any {

    return this.http.get(`${this.baseApiUrl}/orders?storeId=${storeId}`).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public getProductsReportByStoreId(storeId: number): any {

    return this.http.get(`${this.baseApiUrl}/products?storeId=${storeId}`).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public getStoreCashFlowReportsByStoreId(storeId: number): any {

    return this.http.get(`${this.baseApiUrl}/stores/cashflow?storeId=${storeId}`).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public getStoreCashFlowReportsByDateRangeAndStoreId(startDate: string, endDate: string, storeId: number): any {

    return this.http.get(`${this.baseApiUrl}/stores/cashflow?startDate=${startDate}&endDate=${endDate}&storeId=${storeId}`).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public getStoreCashFlowRevenueReportsByStoreId(storeId: number): any {

    return this.http.get(`${this.baseApiUrl}/stores/cashflow/revenue?storeId=${storeId}`).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public getStoreCashFlowRevenueReportsByDateRangeAndStoreId(startDate: string, endDate: string, storeId: number): any {

    return this.http.get(`${this.baseApiUrl}/stores/cashflow/revenue?startDate=${startDate}&endDate=${endDate}&storeId=${storeId}`).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public getStoresCountReport(): any {

    return this.http.get(`${this.baseApiUrl}/stores/count`).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public getSystemCashFlowReports(): any {
    return this.http.get(`${this.baseApiUrl}/system/cashflow`).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public getSystemCashFlowReportsByDateRange(startDate: string, endDate: string): any {

    return this.http.get(`${this.baseApiUrl}/system/cashflow?startDate=${startDate}&endDate=${endDate}`).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public getSystemCashFlowRevenueReports(): any {
    return this.http.get(`${this.baseApiUrl}/system/cashflow/revenue`).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public getSystemCashFlowRevenueReportsByDateRange(startDate: string, endDate: string): any {

    return this.http.get(`${this.baseApiUrl}/system/cashflow/revenue?startDate=${startDate}&endDate=${endDate}`).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public getUsersCountReport(): any {

    return this.http.get(`${this.baseApiUrl}/users/count`).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }
}
