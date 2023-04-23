import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';

import {
  LeasingContractDetailsDialogModule,
} from '../leasing-contract-details-dialog/leasing-contract-details-dialog.module';
import { LeasingContractFormDialogModule } from '../leasing-contract-form-dialog/leasing-contract-form-dialog.module';
import { ContractOverviewComponent } from './contract-overview.component';



@NgModule({
  declarations: [
    ContractOverviewComponent,
  ],
  imports: [
    CommonModule,
    LeasingContractDetailsDialogModule,
    LeasingContractFormDialogModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTableModule,
  ],
})
export class ContractOverviewModule { }
