import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private baseApiUrl = `${environment.API_URL}/addresses`;
  private viaCepUrl = environment.VIA_CEP_URL;

  constructor(
    private http: HttpClient
  ) { }

  public createAddress(address: any): any {

    return this.http.post(`${this.baseApiUrl}/create`, address).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public deleteAddress(addressId: any): any {

    return this.http.delete(`${this.baseApiUrl}/delete/${addressId}`).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public getAddressById(id: number): any {

    return this.http.get(`${this.baseApiUrl}/${id}`).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public getAddressByPostalCode(postalCode: string): any {

    return this.http.get(`${this.viaCepUrl}/${postalCode}/json`).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public getAddressesByUserId(userId: number): any {

    return this.http.get(`${this.baseApiUrl}/user/${userId}`).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public updateAddress(address: any): any {

    return this.http.put(`${this.baseApiUrl}/update`, address).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }
}
