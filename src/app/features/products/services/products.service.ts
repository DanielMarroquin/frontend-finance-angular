import { Injectable } from '@angular/core';
import { delay, Observable, of } from "rxjs";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Product } from "../models/product.model";


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly apiUrl = `${environment.apiBaseUrl}/products`;

  constructor(
    private http: HttpClient
  ) {}

  getAll(): Observable<Product[]> {
    return this.http.get<{ data: Product[] }>(this.apiUrl).pipe(
      map((response: { data: any; }) => response.data)
    );
  }

  createProduct(product: {
    date_release: string;
    name: string;
    description: any;
    logo: any;
    id: any;
    date_revision: string
  }): Observable<any> {
    return this.http.post<{ message: string; data: Product }>(this.apiUrl, product);
  }

  getOne(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  update(id: string, product: Omit<Product, 'id'>): Observable<any> {
    return this.http.put<{ message: string; data: Product }>(
      `${this.apiUrl}/${id}`,
      product
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }


  verifyId(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/verification/${id}`);
  }



}
