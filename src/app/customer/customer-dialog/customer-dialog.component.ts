import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './customer-dialog.component.html',
  styleUrls: ['./customer-dialog.component.scss']
})
export class CustomerDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly data?: { customerId: string; }
  ) { }
}
