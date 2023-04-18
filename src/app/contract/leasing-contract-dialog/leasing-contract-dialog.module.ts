import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomerDialogModule } from 'src/app/customer/customer-dialog/customer-dialog.module';
import { VehicleDialogModule } from 'src/app/vehicle/vehicle-dialog/vehicle-dialog.module';

import { LeasingContractDialogComponent } from './leasing-contract-dialog.component';



@NgModule({
  declarations: [
    LeasingContractDialogComponent,
  ],
  imports: [
    CommonModule,
    CustomerDialogModule,
    VehicleDialogModule,
  ]
})
export class LeasingContractDialogModule { }
