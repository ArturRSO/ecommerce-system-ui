import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private baseApiUrl = `${environment.API_URL}/stores`;

  constructor(
    private http: HttpClient
  ) { }

  public changeProfileImage(storeId: number, file: any): any {

    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(`${this.baseApiUrl}/create/image/${storeId}`, formData).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public createStore(store: any, userId: number): any {

    return this.http.post<any>(`${this.baseApiUrl}/create/user/${userId}`, store).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public deleteStore(storeId: number): any {

    return this.http.delete<any>(`${this.baseApiUrl}/create/delete/${storeId}`).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public getAllStores(): any {

    return this.http.get(`${this.baseApiUrl}/all`).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public getStoreById(storeId: number): any {

    return this.http.get<any>(`${this.baseApiUrl}/${storeId}`).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public getStoresByUserId(userId: number): any {

    return this.http.get(`${this.baseApiUrl}/user/${userId}`).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public updateStore(store: any): any {

    return this.http.put<any>(`${this.baseApiUrl}/update`, store).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }
}
