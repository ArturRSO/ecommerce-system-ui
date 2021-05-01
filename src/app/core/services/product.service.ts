import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseApiUrl = `${environment.API_URL}/products`;
  private searchRequest = new Subject<any>();

  constructor(
    private http: HttpClient
  ) { }

  public getProductsByQuantity(quantity: number): any {

    return this.http.get(`${this.baseApiUrl}/all?quantity=${quantity}`).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public getProductsByNameAndQuantity(name: string, quantity: number): any {

    return this.http.get(`${this.baseApiUrl}/search?name=${name}&quantity=${quantity}`).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public getProductsByStoreIdAndQuantity(storeId: number, quantity: number): any {

    return this.http.get(`${this.baseApiUrl}/store/1?quantity=${quantity}`).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public getProductsBySubtypeIdAndQuantity(subtypeId: number, quantity: number): any {

    return this.http.get(`${this.baseApiUrl}/subtype/${subtypeId}?quantity=${quantity}`).pipe(
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

  public getSearchRequest(): Observable<any> {
    return this.searchRequest.asObservable();
  }

  public setSearchRequest(requestData: any): void {
    sessionStorage.setItem('searchRequest', 'true');
    this.searchRequest.next(requestData);
  }
}
