import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { CustomerDialogModule } from 'src/app/customer/customer-dialog/customer-dialog.module';
import { SelectCustomerDialogModule } from 'src/app/customer/select-customer-dialog/select-customer-dialog.module';
import { SelectVehicleDialogModule } from 'src/app/vehicle/select-vehicle-dialog/select-vehicle-dialog.module';

import { CreateLeasingContractDialogComponent } from './create-leasing-contract-dialog.component';
import { EditLeasingContractDialogComponent } from './edit-leasing-contract-dialog.component';


@NgModule({
  declarations: [
    CreateLeasingContractDialogComponent,
    EditLeasingContractDialogComponent,
  ],
  imports: [
    CommonModule,
    CustomerDialogModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    SelectCustomerDialogModule,
    SelectVehicleDialogModule,
  ]
})
export class LeasingContractFormDialogModule { }
