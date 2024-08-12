import { Injectable } from '@angular/core';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ICategory } from 'src/assets/model/icategory';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = environment.api;

  constructor(private http: HttpClient) {}

  // Get All Categories
  getAllCategories(): Observable<HttpResponse<ICategory[]>> {
    const url = `${this.baseUrl}/products/categories`;
    return this.http.get<ICategory[]>(url, { observe: 'response' }).pipe(
      tap((res) => {
        console.log(res.body, 'All categories From Services');
      })
    );
  }
}
