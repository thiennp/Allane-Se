import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { BrandService } from '../brand.service';
import { VehicleDTO, VehicleService } from '../vehicle.service';
import { VehicleDialogComponent } from './vehicle-dialog.component';


@Component({
  templateUrl: './vehicle-dialog.component.html',
})
export class CreateVehicleDialogComponent extends VehicleDialogComponent {

  constructor(
    brandService: BrandService,
    vehicleService: VehicleService,
    matDialogRef: MatDialogRef<CreateVehicleDialogComponent, VehicleDTO>,
  ) {
    super(brandService, vehicleService, matDialogRef, (vehicle) => vehicleService.create(vehicle));
  }
}
