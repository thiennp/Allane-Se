import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { tap } from 'rxjs';

import { BrandService } from '../brand.service';
import { VehicleDTO, VehicleService } from '../vehicle.service';
import { VehicleDialogComponent } from './vehicle-dialog.component';

export type EditVehicleDialogComponentData = {
  vehicleId: number;
};


@Component({
  templateUrl: './vehicle-dialog.component.html',
})
export class EditVehicleDialogComponent extends VehicleDialogComponent {

  constructor(
    brandService: BrandService,
    vehicleService: VehicleService,
    matDialogRef: MatDialogRef<VehicleDialogComponent, VehicleDTO>,
    @Inject(MAT_DIALOG_DATA) data: EditVehicleDialogComponentData,
  ) {
    super(brandService, vehicleService, matDialogRef, (value) => vehicleService.update(data.vehicleId, value));

    this.loading$.next(true);

    vehicleService.getById(data.vehicleId).pipe(
      tap(() => this.loading$.next(false)),
    ).subscribe((val) => this.form.setValue(val));
  }
}
