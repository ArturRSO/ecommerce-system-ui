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

    return this.http.get(`${this.baseApiUrl}/orders/${storeId}`).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }
}
