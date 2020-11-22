import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TelephoneService {

  private baseApiUrl = `${environment.API_URL}/telephones`;

  constructor(
    private http: HttpClient
  ) { }

  public createTelephone(telephone: any): any {

    return this.http.post(`${this.baseApiUrl}/create`, telephone).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public getAllTelephones(): any {

    return this.http.get(`${this.baseApiUrl}/all`).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public getTelephonesByUserId(userId: number): any {

    return this.http.get(`${this.baseApiUrl}/user/${userId}`).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public getTelephoneById(id: number): any {

    return this.http.get(`${this.baseApiUrl}/${id}`).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public updateTelephone(telephone: any): any {

    return this.http.put(`${this.baseApiUrl}/update`, telephone).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public deleteTelephone(telephoneId: number): any {

    return this.http.delete(`${this.baseApiUrl}/delete/${telephoneId}`).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }
}
