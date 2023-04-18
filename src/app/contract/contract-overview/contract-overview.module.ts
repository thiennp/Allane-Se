import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LeasingContractDialogModule } from '../leasing-contract-dialog/leasing-contract-dialog.module';
import { ContractOverviewComponent } from './contract-overview.component';



@NgModule({
  declarations: [
    ContractOverviewComponent,
  ],
  imports: [
    CommonModule,
    LeasingContractDialogModule,
  ],
})
export class ContractOverviewModule { }
