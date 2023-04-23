import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { CustomerDialogModule } from 'src/app/customer/customer-dialog/customer-dialog.module';
import { SelectCustomerDialogModule } from 'src/app/customer/select-customer-dialog/select-customer-dialog.module';
import { SelectVehicleDialogModule } from 'src/app/vehicle/select-vehicle-dialog/select-vehicle-dialog.module';

import { LeasingContractDetailsDialogComponent } from './leasing-contract-details-dialog.component';



@NgModule({
  declarations: [
    LeasingContractDetailsDialogComponent,
  ],
  imports: [
    CommonModule,
    CustomerDialogModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatInputModule,
    ReactiveFormsModule,
    SelectCustomerDialogModule,
    SelectVehicleDialogModule,
  ]
})
export class LeasingContractDetailsDialogModule { }
