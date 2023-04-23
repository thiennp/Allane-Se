import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { filter, mergeMap, Observable, tap } from 'rxjs';
import {
  ConfirmationDialogComponent,
  ConfirmationDialogComponentData,
} from 'src/app/confirmation-dialog/confirmation-dialog.component';

import { ContractDTO, ContractService } from '../contract.service';
import {
  EditLeasingContractDialogComponent,
  EditLeasingContractDialogComponentData,
} from '../leasing-contract-form-dialog/edit-leasing-contract-dialog.component';

export type LeasingContractDetailsDialogComponentData = {
  contractId: number;
};


@Component({
  templateUrl: './leasing-contract-details-dialog.component.html',
})
export class LeasingContractDetailsDialogComponent {
  public readonly contract$: Observable<ContractDTO>;

  constructor(
    private readonly matDialogRef: MatDialogRef<LeasingContractDetailsDialogComponent, boolean>,
    private readonly matDialog: MatDialog,
    private readonly contractService: ContractService,
    @Inject(MAT_DIALOG_DATA) private readonly data: LeasingContractDetailsDialogComponentData,
  ) {
    this.contract$ = contractService.getById(data.contractId);
  }

  public editContract() {
    this.matDialog.open<EditLeasingContractDialogComponent, EditLeasingContractDialogComponentData, boolean>(
      EditLeasingContractDialogComponent,
      {
        data: this.data,
      })
      .afterClosed()
      .pipe(
        filter((shouldUpdateData): shouldUpdateData is boolean => !!shouldUpdateData),
        tap((shouldUpdateData) => this.close(shouldUpdateData)),
      ).subscribe();
  }

  public deleteContract(): void {
    this.matDialog.open<ConfirmationDialogComponent, ConfirmationDialogComponentData, boolean>(
      ConfirmationDialogComponent,
      {
        data: {
          title: 'Delete Leasing Contract',
          content: 'Please confirm that you want to delete this contract. The action is irreversible!',
        }
      })
      .afterClosed()
      .pipe(
        filter((isConfirmed) => !!isConfirmed),
        mergeMap(() => this.contractService.delete(this.data.contractId)),
        tap(() => this.matDialogRef.close(true)),
      ).subscribe();
  }

  public close(shouldUpdateData: boolean): void {
    this.matDialogRef.close(shouldUpdateData);
  }
}
