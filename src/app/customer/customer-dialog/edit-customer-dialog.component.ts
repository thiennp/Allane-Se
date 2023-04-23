import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

import { CustomerService, RequestCustomerDTO, ResponseCustomerDTO } from '../customer.service';
import { CustomerDialogComponent } from './customer-dialog.component';

export type EditCustomerDialogComponentData = {
  customerId: number;
};


@Component({
  templateUrl: './customer-dialog.component.html',
})
export class EditCustomerDialogComponent extends CustomerDialogComponent {

  constructor(
    customerService: CustomerService,
    matDialogRef: MatDialogRef<CustomerDialogComponent, number>,
    @Inject(MAT_DIALOG_DATA) data: EditCustomerDialogComponentData,
  ) {
    super(matDialogRef, (value) => customerService.update(data.customerId, value).pipe(
      map(() => data.customerId),
    ));

    this.loading$.next(true);

    customerService.getById(data.customerId).pipe(
      tap(() => this.loading$.next(false)),
      map((customer) => ({
        ...customer,
        birthDate: moment(customer.birthDate.join('-'), 'YYYY-M-D').format(environment.defaultDateFormat),
      })),
    ).subscribe((customer) => this.form.patchValue(customer));
  }
}
