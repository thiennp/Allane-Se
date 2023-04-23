import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export type ConfirmationDialogComponentData = {
  title: string;
  content: string;
}

@Component({
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {
  constructor(
    private readonly matDialogRef: MatDialogRef<ConfirmationDialogComponent, boolean>,
    @Inject(MAT_DIALOG_DATA) public readonly data: ConfirmationDialogComponentData,
  ) {
  }

  public confirm(): void {
    this.matDialogRef.close(true)
  }

  public reject(): void {
    this.matDialogRef.close(false)
  }
}
