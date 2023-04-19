import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { CommonRestfulApiService } from '../common/restful-api.service';
import { PageRequestDTO, PageResponseDTO } from '../common/restful-types';
import { CustomerDto } from '../customer/customer.service';
import { VehicleDTO } from '../vehicle/vehicle.service';

export type ContractOverviewDTO = {
  contractId: number;
  customerId: number;
  customerName: string;
  vehicleId: number;
  vehicleName: string;
  vin: string;
  monthlyRate: number;
  vehiclePrice: number;
};

export type ContractDTO = {
  id: number;
  monthlyRate: number;
  vehicle: VehicleDTO;
  customer: CustomerDto;
};



@Injectable({
  providedIn: 'root'
})
export class ContractService extends CommonRestfulApiService<ContractDTO> {

  constructor(
    httpClient: HttpClient
  ) {
    super(httpClient, 'contract');
  }

  public getContracts(params: PageRequestDTO): Observable<PageResponseDTO<ContractOverviewDTO>> {
    return this.httpClient.get<PageResponseDTO<ContractOverviewDTO>>(`${environment.apiUrl}/contractoverviews`, { params });
  }
}
