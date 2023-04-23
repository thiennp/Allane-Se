import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs';

import { BrandService } from '../brand.service';
import { VehicleService } from '../vehicle.service';
import { VehicleDialogComponent } from './vehicle-dialog.component';


@Component({
  templateUrl: './vehicle-dialog.component.html',
})
export class CreateVehicleDialogComponent extends VehicleDialogComponent {

  constructor(
    brandService: BrandService,
    vehicleService: VehicleService,
    matDialogRef: MatDialogRef<CreateVehicleDialogComponent, number>,
  ) {
    super(brandService, matDialogRef, (vehicle) => vehicleService.create(vehicle).pipe(
      map(({ id }) => id)
    ));
  }
}
