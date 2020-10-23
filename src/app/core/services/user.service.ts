import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseApiUrl = `${environment.API_URL}/users`;

  constructor(
    private http: HttpClient
  ) { }

  public createUser(user: any): any {

    return this.http.post<any>(`${this.baseApiUrl}/create`, user).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public createCustomer(user: any): any {

    return this.http.post<any>(`${this.baseApiUrl}/create/customer`, user).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public getPasswordResetTokenStatus(token: string): any {

    return this.http.get<any>(`${this.baseApiUrl}/recover/password/status/${token}`).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public getProfile(): any {

    return this.http.get<any>(`${this.baseApiUrl}/profile`).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public getAllUsers(): any {

    return this.http.get<any>(`${this.baseApiUrl}/all`).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public getUsersByRoleId(roleId: number): any {

    return this.http.get<any>(`${this.baseApiUrl}/role/${roleId}`).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public getUserOptionsByRole(roleId: number): any {

    return this.http.get<any>(`${this.baseApiUrl}/options/${roleId}`).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public resetPassword(token: string, password: string) {

    return this.http.post<any>(`${this.baseApiUrl}/recover/passowrd/${token}`, password).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public sendResetPasswordMail(email: string): any {
    const body = {
      email: email
    }

    return this.http.post<any>(`${this.baseApiUrl}/recover/password/mail`, body).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public updateUser(user: any, userid: number): any {

    return this.http.put<any>(`${this.baseApiUrl}/update/${userid}`, user).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public updateUserProfile(user: any, userid: number) {

    return this.http.put<any>(`${this.baseApiUrl}/update/profile/${userid}`, user).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }
}
