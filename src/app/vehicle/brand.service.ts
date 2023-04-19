import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export type BrandDTO = {
  id: number;
  brand: string;
  model: string;
  modelYear: number;
  vin: string;
  price: number;
};

export type ModelDTO = {
  id: number;
  name: string;
  brandId: number;
};


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private readonly httpClient: HttpClient
  ) {
  }

  public getBrands(): Observable<BrandDTO[]> {
    return this.httpClient.get<BrandDTO[]>(`${environment.apiUrl}/brands`);
  }

  public getModels(brandId: string): Observable<ModelDTO[]> {
    return this.httpClient.get<ModelDTO[]>(`${environment.apiUrl}/brand/${brandId}/models`);
  }
}
