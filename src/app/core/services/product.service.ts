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

  public changeProductImage(productId: number, file: any): any {

    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(`${this.baseApiUrl}/create/image/${productId}`, formData).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public createProduct(product: any): any {

    return this.http.post<any>(`${this.baseApiUrl}/create`, product).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public getProductById(productId: number): any {

    return this.http.get(`${this.baseApiUrl}/${productId}`).pipe(
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

  public getProductsByQuantity(quantity: number): any {

    return this.http.get(`${this.baseApiUrl}/all?quantity=${quantity}`).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public getProductsByStoreIdAndQuantity(storeId: number, quantity: number): any {

    return this.http.get(`${this.baseApiUrl}/store/${storeId}?quantity=${quantity}`).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public getProductDetailLabelsByProductSubtypeId(productSubtypeId: number): any {

    return this.http.get(`${this.baseApiUrl}/details/labels/subtype/${productSubtypeId}`).pipe(
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

  public getSearchRequest(): Observable<any> {
    return this.searchRequest.asObservable();
  }

  public updateProduct(product: any): any {

    return this.http.put<any>(`${this.baseApiUrl}/update`, product).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public updateProductImage(productId: number, imageId: number, file: any): any {

    const formData = new FormData();
    formData.append('file', file);

    return this.http.put<any>(`${this.baseApiUrl}/update/image/${imageId}/product/${productId}`, formData).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public setSearchRequest(requestData: any): void {
    sessionStorage.setItem('searchRequest', requestData);
    this.searchRequest.next(requestData);
  }
}
