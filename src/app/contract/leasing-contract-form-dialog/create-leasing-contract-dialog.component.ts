import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs';

import { ContractDTO, ContractService } from '../contract.service';
import { LeasingContractDialogComponent } from './leasing-contract-form-dialog.component';


@Component({
  templateUrl: './leasing-contract-form-dialog.component.html',
})
export class CreateLeasingContractDialogComponent extends LeasingContractDialogComponent {
  constructor(
    matDialogRef: MatDialogRef<CreateLeasingContractDialogComponent, number>,
    matDialog: MatDialog,
    contractService: ContractService,
  ) {
    super(matDialogRef, matDialog, (value) => contractService.create(value).pipe(
      map(({ id }) => id),
    ));
  }
}
