import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs';

import { ContractDTO, ContractService } from '../contract.service';
import { LeasingContractDialogComponent } from './leasing-contract-form-dialog.component';

export type EditLeasingContractDialogComponentData = {
  contractId: number;
};


@Component({
  templateUrl: './leasing-contract-form-dialog.component.html',
})
export class EditLeasingContractDialogComponent extends LeasingContractDialogComponent {
  constructor(
    matDialogRef: MatDialogRef<LeasingContractDialogComponent, number>,
    matDialog: MatDialog,
    contractService: ContractService,
    @Inject(MAT_DIALOG_DATA) data: EditLeasingContractDialogComponentData,
  ) {
    super(matDialogRef, matDialog, (value) => contractService.update(data.contractId, value).pipe(
      map(() => data.contractId),
    ));

    contractService.getById(data.contractId).subscribe((contract) => {
      this.form.patchValue(contract);
    });
  }
}
