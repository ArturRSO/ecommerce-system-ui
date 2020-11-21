import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseApiUrl = `${environment.API_URL}/products`;

  constructor(
    private http: HttpClient
  ) { }

  public createProduct(product: any): any {

    return this.http.post(`${this.baseApiUrl}/create`, product).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public createProductImage(productId: number, image: any): any {

    const formData = new FormData();
    formData.append('file', image);

    return this.http.post<any>(`${this.baseApiUrl}/create/image/${productId}`, formData).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public getAllProducts(): any {

    return this.http.get<any>(`${this.baseApiUrl}/all`).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public getProductsByStoreId(storeId: number): any {

    return this.http.get<any>(`${this.baseApiUrl}/store/${storeId}`).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public getProductsToSell(): any {

    return this.http.get<any>(`${this.baseApiUrl}/sell`).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public getProductById(productId: number): any {

    return this.http.get<any>(`${this.baseApiUrl}/${productId}`).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public getProductImage(path: string): any {

    return this.http.get<any>(`${this.baseApiUrl}/image?path=${encodeURIComponent(path)}`).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public getAllProductTypes(): any {

    return this.http.get<any>(`${this.baseApiUrl}/type/all`).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public getProductSubtypesByProductTypeId(productTypeId: number): any {

    return this.http.get<any>(`${this.baseApiUrl}/type/${productTypeId}/subtypes/all`).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }
}
