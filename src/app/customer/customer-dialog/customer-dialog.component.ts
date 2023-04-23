import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { RequestCustomerDTO } from '../customer.service';


export abstract class CustomerDialogComponent {
  public readonly loading$ = new BehaviorSubject(false);

  private readonly controls: Record<keyof RequestCustomerDTO, AbstractControl> = {
    id: new FormControl(),
    firstName: new FormControl<string | null>(null, [Validators.required]),
    lastName: new FormControl<string | null>(null, [Validators.required]),
    birthDate: new FormControl<Date | null>(null, [Validators.required]),
  };

  public readonly form = new FormGroup(this.controls);

  constructor(
    private readonly matDialogRef: MatDialogRef<CustomerDialogComponent, number>,
    private readonly saveData: (value: RequestCustomerDTO) => Observable<number>,
  ) {
  }

  public submit() {
    if (this.form.valid) {
      const value: RequestCustomerDTO = {
        ...this.form.value as Omit<RequestCustomerDTO, 'birthDate'>,
        birthDate: moment(this.controls.birthDate.value).format(environment.defaultDateFormat),
      };
      this.saveData(value).subscribe((data) => this.close(data));
    }
  }

  public close(customerId?: number) {
    this.matDialogRef.close(customerId);
  }

  public isError(field: keyof RequestCustomerDTO, validatorKey: string): boolean {
    return !!this.form.get(field)?.errors?.[validatorKey];
  }
}
