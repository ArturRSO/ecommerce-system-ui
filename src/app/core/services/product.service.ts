import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseApiUrl = `${environment.API_URL}/products`;

  constructor(
    private http: HttpClient
  ) { }

  public getProductsToSell(): any {

    return this.http.get(`${this.baseApiUrl}/sell`).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public getProductTypes(): any {

    return this.http.get(`${this.baseApiUrl}/type/all`).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public getProductSubtypesByTypeId(typeId: number): any {

    return this.http.get(`${this.baseApiUrl}/type/${typeId}/subtypes/all`).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }
}
