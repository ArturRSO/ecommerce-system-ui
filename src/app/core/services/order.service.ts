import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseApiUrl = `${environment.API_URL}/orders`;

  constructor(
    private http: HttpClient
  ) { }

  public createOrder(order: any): any {

    return this.http.post(`${this.baseApiUrl}/create`, order).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public getOrdersByUserId(userId: number) {

    return this.http.get<any>(`${this.baseApiUrl}/user/${userId}`).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }


  public getOrderSummaryById(orderId: number) {

    return this.http.get<any>(`${this.baseApiUrl}/summary/${orderId}`).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }
}
