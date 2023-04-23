import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { ConfirmationDialogModule } from 'src/app/confirmation-dialog/confirmation-dialog.module';

import { CreateVehicleDialogComponent } from './create-vehicle-dialog.component';
import { EditVehicleDialogComponent } from './edit-vehicle-dialog.component';


@NgModule({
  declarations: [
    CreateVehicleDialogComponent,
    EditVehicleDialogComponent,
  ],
  imports: [
    CommonModule,
    ConfirmationDialogModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    ReactiveFormsModule,
  ]
})
export class VehicleDialogModule { }
