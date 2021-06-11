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

  public changeProfileImage(userId: number, file: any): any {

    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(`${this.baseApiUrl}/create/image/${userId}`, formData).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public createUser(user: any): any {

    return this.http.post<any>(`${this.baseApiUrl}/create`, user).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public deleteUser(userId: number): any {

    return this.http.delete<any>(`${this.baseApiUrl}/users/delete/${userId}`).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public getAllUsers(): any {

    return this.http.get(`${this.baseApiUrl}/all`).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public getPasswordResetTokenStatus(token: string): any {

    return this.http.get<any>(`${this.baseApiUrl}/recover/password/status?token=${encodeURIComponent(token)}`).pipe(
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

  public getUserById(userId: number): any {

    return this.http.get<any>(`${this.baseApiUrl}/${userId}`).pipe(
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

  public resetPassword(token: string, password: string): any {

    return this.http.post<any>(`${this.baseApiUrl}/recover/password?token=${encodeURIComponent(token)}`, password).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public sendPasswordRecoverEmail(email: string) {

    return this.http.post<any>(`${this.baseApiUrl}/recover/password/mail`, email).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public updateUser(user: any): any {

    return this.http.put<any>(`${this.baseApiUrl}/update`, user).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public updateUserPassword(userId: number, password: string): any {

    return this.http.put<any>(`${this.baseApiUrl}/update/password/${userId}`, password).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }
}
