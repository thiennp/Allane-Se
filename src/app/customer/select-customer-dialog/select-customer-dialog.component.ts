import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, filter, first, fromEvent, mergeMap, Subject, takeUntil, tap, throttleTime } from 'rxjs';
import { LazyLoadingControl } from 'src/app/common/lazy-loading-control';
import { PageResponseDTO, Sort } from 'src/app/common/restful-types';
import {
  ConfirmationDialogComponent,
  ConfirmationDialogComponentData,
} from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { environment } from 'src/environments/environment';

import { CreateCustomerDialogComponent } from '../customer-dialog/create-customer-dialog.component';
import {
  EditCustomerDialogComponent,
  EditCustomerDialogComponentData,
} from '../customer-dialog/edit-customer-dialog.component';
import { CustomerService, ResponseCustomerDTO } from '../customer.service';

export type SelectCustomerDialogComponentData = {
  customer?: ResponseCustomerDTO;
};


@Component({
  templateUrl: './select-customer-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectCustomerDialogComponent implements OnDestroy {
  public readonly customerIdFormControl = new FormControl<number | null>(null, [Validators.required]);
  public readonly form = new FormGroup({ customerId: this.customerIdFormControl });

  private readonly destroy$ = new Subject<null>();
  private readonly matRadioGroup$ = new Subject<HTMLElement>();

  @ViewChild('matRadioGroup') public set matRadioGroup(elementRef: ElementRef<HTMLElement> | undefined) {
    if (elementRef) {
      this.matRadioGroup$.next(elementRef.nativeElement);
    }
  };

  public readonly lazyLoadingControl = new LazyLoadingControl({
    parentElm: this.matRadioGroup$,
    retrieveData: (page: number) => this.customerService.getCustomers({ page, size: environment.defaultPageSize, sort: Sort.ASC }),
    destroy$: this.destroy$,
  });

  constructor(
    private readonly customerService: CustomerService,
    private readonly matDialogRef: MatDialogRef<SelectCustomerDialogComponent, ResponseCustomerDTO | null>,
    private readonly matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data: SelectCustomerDialogComponentData,
  ) {
    if (data.customer) {
      this.customerIdFormControl.setValue(data.customer.id);
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
  }

  public createNewCustomer(): void {
    this.matDialog.open<CreateCustomerDialogComponent, undefined, ResponseCustomerDTO>(
      CreateCustomerDialogComponent,
      {
        disableClose: true,
      })
      .afterClosed()
      .pipe(
        filter((customer): customer is ResponseCustomerDTO => !!customer),
        tap(({ id }) => this.customerIdFormControl.setValue(id)),
        tap(() => this.lazyLoadingControl.reset()),
      ).subscribe();
  }

  public editCustomer(customerId: number): void {
    this.matDialog.open<EditCustomerDialogComponent, EditCustomerDialogComponentData, ResponseCustomerDTO>(
      EditCustomerDialogComponent,
      {
        data: { customerId },
        disableClose: true,
      })
      .afterClosed()
      .pipe(
        filter((customer): customer is ResponseCustomerDTO => !!customer),
        tap(({ id }) => this.customerIdFormControl.setValue(id)),
        tap(() => this.lazyLoadingControl.reset()),
      ).subscribe();
  }

  public deleteCustomer(customerId: number): void {
    this.matDialog.open<ConfirmationDialogComponent, ConfirmationDialogComponentData, boolean>(
      ConfirmationDialogComponent,
      {
        data: {
          title: 'Delete Customer',
          content: 'Please confirm that you want to delete this customer. The action is irreversible!',
        },
        disableClose: true,
      })
      .afterClosed()
      .pipe(
        filter((isConfirmed) => !!isConfirmed),
        mergeMap(() => this.customerService.delete(customerId)),
        tap(() => this.lazyLoadingControl.reset()),
      ).subscribe();
  }

  public submit(): void {
    if (this.form.valid) {
      const selectedCustomerId = this.customerIdFormControl.value;
      const selectedCustomer = this.lazyLoadingControl.data$.value?.overviewItems.find(({ id }) => id === selectedCustomerId);
      this.matDialogRef.close(selectedCustomer);
    }
  }

  public close(): void {
    this.matDialogRef.close(null);
  }
}
