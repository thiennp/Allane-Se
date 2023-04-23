import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';

import { VehicleDialogModule } from '../vehicle-dialog/vehicle-dialog.module';
import { SelectVehicleDialogComponent } from './select-vehicle-dialog.component';



@NgModule({
  declarations: [
    SelectVehicleDialogComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    ReactiveFormsModule,
    VehicleDialogModule,
  ],
})
export class SelectVehicleDialogModule { }
