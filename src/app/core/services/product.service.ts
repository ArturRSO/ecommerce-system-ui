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

  public createProduct(product: any) {

    return this.http.post(`${this.baseApiUrl}/create`, product).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public createProfileImage(productId: number, userId: number, image: any): any {

    const formData = new FormData();
    formData.append('file', image);

    return this.http.post<any>(`${this.baseApiUrl}/create/image/${productId}/${userId}`, formData).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }
}
