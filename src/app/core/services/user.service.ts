import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserOption } from 'src/app/shared/utils/user-option.model';
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

  public createProfileImage(userId: number, image: any): any {

    const formData = new FormData();
    formData.append('file', image);

    return this.http.post<any>(`${this.baseApiUrl}/create/image/${userId}`, formData).pipe(
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

  public getUserById(id: number): any {

    return this.http.get<any>(`${this.baseApiUrl}/${id}`).pipe(
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

  public getProfileImage(userId: number, path: string): any {

    return this.http.get<any>(`${this.baseApiUrl}/image/${userId}?path=${encodeURIComponent(path)}`).pipe(
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

  public updateUserPassword(userId: number, password: string): any {

    return this.http.put<any>(`${this.baseApiUrl}/update/password/${userId}`, password).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public updateUserProfile(user: any): any {

    return this.http.put<any>(`${this.baseApiUrl}/update/profile`, user).pipe(
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

  public sendResetPasswordMail(email: string): any {

    return this.http.post<any>(`${this.baseApiUrl}/recover/password/mail`, email).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public deleteProfile(userId: number): any {

    return this.http.delete<any>(`${this.baseApiUrl}/delete/profile/${userId}`).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public deleteUsers(ids: any): any {

    return this.http.delete<any>(`${this.baseApiUrl}/delete`, ids).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public getUserOptionsByRole(roleId: number): Array<UserOption> {

    return environment.USER_OPTIONS.filter(option => option.allowedRoles.includes(roleId));
  }
}
