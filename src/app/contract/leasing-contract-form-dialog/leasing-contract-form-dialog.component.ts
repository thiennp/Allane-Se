import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, filter, Observable, tap } from 'rxjs';
import { ResponseCustomerDTO } from 'src/app/customer/customer.service';
import {
  SelectCustomerDialogComponent,
  SelectCustomerDialogComponentData,
} from 'src/app/customer/select-customer-dialog/select-customer-dialog.component';
import {
  SelectVehicleDialogComponent,
  SelectVehicleDialogComponentData,
} from 'src/app/vehicle/select-vehicle-dialog/select-vehicle-dialog.component';
import { VehicleDTO } from 'src/app/vehicle/vehicle.service';

import { ContractDTO } from '../contract.service';


export abstract class LeasingContractDialogComponent {
  public readonly loading$ = new BehaviorSubject(false);

  public readonly controls: Record<keyof ContractDTO, AbstractControl> = {
    id: new FormControl(),
    customer: new FormControl<ResponseCustomerDTO | null>(null, [Validators.required]),
    monthlyRate: new FormControl(null, [Validators.required]),
    vehicle: new FormControl<VehicleDTO | null>(null, [Validators.required]),
  };

  public readonly form = new FormGroup(this.controls);

  constructor(
    private readonly matDialogRef: MatDialogRef<LeasingContractDialogComponent, number>,
    private readonly matDialog: MatDialog,
    private readonly saveData: (value: ContractDTO) => Observable<number>,
  ) {
  }

  public selectCustomer(customer?: ResponseCustomerDTO): void {
    this.matDialog.open<SelectCustomerDialogComponent, SelectCustomerDialogComponentData, ResponseCustomerDTO>(
      SelectCustomerDialogComponent,
      {
        data: { customer },
        disableClose: true,
      })
      .afterClosed()
      .pipe(
        filter((customer): customer is ResponseCustomerDTO => !!customer),
        tap((customer) => this.controls.customer.setValue(customer)),
      ).subscribe();
  }

  public selectVehicle(vehicle?: VehicleDTO): void {
    this.matDialog.open<SelectVehicleDialogComponent, SelectVehicleDialogComponentData, VehicleDTO>(
      SelectVehicleDialogComponent,
      {
        data: { vehicle },
        disableClose: true,
      })
      .afterClosed()
      .pipe(
        filter((vehicle): vehicle is VehicleDTO => !!vehicle),
        tap((vehicle) => this.controls.vehicle.setValue(vehicle)),
      ).subscribe();;
  }

  public submit(): void {
    if (this.form.valid) {
      this.saveData(this.form.value as ContractDTO).subscribe((data) => this.close(data));
    }
  }

  public close(contractId?: number): void {
    this.matDialogRef.close(contractId);
  }

  public isError(field: keyof ContractDTO, validatorKey: string): boolean {
    return !!this.form.get(field)?.errors?.[validatorKey];
  }
}
