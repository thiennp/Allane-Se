import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { CommonRestfulApiService } from '../common/restful-api.service';
import { PageRequestDTO, PageResponseDTO } from '../common/restful-types';

export type CustomerDto = {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
};


@Injectable({
  providedIn: 'root'
})
export class CustomerService extends CommonRestfulApiService<CustomerDto> {

  constructor(
    httpClient: HttpClient
  ) {
    super(httpClient, 'customer');
  }

  public getCustomers(params: PageRequestDTO): Observable<PageResponseDTO<CustomerDto>> {
    return this.httpClient.get<PageResponseDTO<CustomerDto>>(`${environment.apiUrl}/customers`, { params });
  }
}
