import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { CommonRestfulApiService } from '../common/restful-api.service';
import { PageRequestDTO, PageResponseDTO } from '../common/restful-types';

export type RequestCustomerDTO = {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
};

export type ResponseCustomerDTO = {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: [number, number, number];
};

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends CommonRestfulApiService<RequestCustomerDTO, ResponseCustomerDTO> {

  constructor(
    httpClient: HttpClient
  ) {
    super(httpClient, 'customer');
  }

  public getCustomers(params: PageRequestDTO): Observable<PageResponseDTO<ResponseCustomerDTO>> {
    return this.httpClient.get<PageResponseDTO<ResponseCustomerDTO>>(`${environment.apiUrl}/customers`, { params });
  }
}
