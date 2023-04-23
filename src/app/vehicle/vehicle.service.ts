import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { CommonRestfulApiService } from '../common/restful-api.service';
import { PageRequestDTO, PageResponseDTO } from '../common/restful-types';

/*
 * TODO: The response type of brand and model should be string here instead of number.
 * But it is from the API so there's nothing we can do from FE side.
 */
export type VehicleDTO = {
  id: number;
  brand: string;
  model: string;
  modelYear: number;
  vin: string;
  price: number;
};


@Injectable({
  providedIn: 'root'
})
export class VehicleService extends CommonRestfulApiService<VehicleDTO> {

  constructor(
    httpClient: HttpClient
  ) {
    super(httpClient, 'vehicle');
  }

  public getVehicles(params: PageRequestDTO): Observable<PageResponseDTO<VehicleDTO>> {
    return this.httpClient.get<PageResponseDTO<VehicleDTO>>(`${environment.apiUrl}/vehicles`, { params });
  }
}
