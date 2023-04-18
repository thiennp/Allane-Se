import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './leasing-contract-dialog.component.html',
  styleUrls: ['./leasing-contract-dialog.component.scss']
})
export class LeasingContractDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly data?: { contractId: string; }
  ) { }
}
