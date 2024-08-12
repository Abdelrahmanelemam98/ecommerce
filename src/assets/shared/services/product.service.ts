import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';

import { Iproduct } from 'src/assets/model/iproduct';
import { environment } from 'src/environments/environment';

type EntityResponseType = HttpResponse<Iproduct>;
type EntityArrayResponseType = HttpResponse<Iproduct[]>;

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = environment.api;

  constructor(private http: HttpClient) {}

  // Get All Products
  getAllProducts(): Observable<
    HttpResponse<{ products: Iproduct[]; total: number }>
  > {
    const url = `${this.baseUrl}/products`;
    return this.http
      .get<{ products: Iproduct[]; total: number }>(url, {
        observe: 'response',
      })
      .pipe(
        tap((res) => {
          console.log(res.body, 'All products From Services');
        })
      );
  }

  // Search Products
  searchProducts(
    searchTerm: string
  ): Observable<HttpResponse<{ products: Iproduct[] }>> {
    return this.http.get<{ products: Iproduct[] }>(
      `${this.baseUrl}/products/search`,
      {
        params: { q: searchTerm },
        observe: 'response',
      }
    );
  }
  // Get Products by Category

  getProductCategory(category: string): Observable<Iproduct[]> {
    return this.http
      .get<{ products: Iproduct[] }>(
        `${this.baseUrl}/products/category/${category}`,
        {
          observe: 'response',
        }
      )
      .pipe(
        map((response) => response.body?.products || []),
        tap((products) => {
          console.log(products, 'Products from category');
        })
      );
  }
  // Get Sorted Product

  getSortedProduct(sortBy: string, sortOrder: string) {
    return this.http
      .get<{ products: Iproduct[] }>(
        `${this.baseUrl}/products?sortBy=${sortBy}&order=${sortOrder}`,
        {
          observe: 'response',
        }
      )
      .pipe(
        map((response) => response.body?.products || []),
        tap((products) => {
          console.log(products, 'Products from Sort');
        })
      );
  }
}
