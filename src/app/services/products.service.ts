import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../models/product.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  constructor(private httpClient: HttpClient) {}


  getProducts(): Observable<Product[]> {
    const url = 'http://localhost:3000/products';
    return this.httpClient.get<Product[]>(url);
  }
}
