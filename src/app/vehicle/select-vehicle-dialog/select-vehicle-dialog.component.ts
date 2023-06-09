import { ChangeDetectionStrategy, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, filter, mergeMap, ReplaySubject, Subject, tap } from 'rxjs';
import { LazyLoadingControl } from 'src/app/common/lazy-loading-control';
import { PageResponseDTO, Sort } from 'src/app/common/restful-types';
import {
  ConfirmationDialogComponent,
  ConfirmationDialogComponentData,
} from 'src/app/confirmation-dialog/confirmation-dialog.component';
import {
  EditVehicleDialogComponent,
  EditVehicleDialogComponentData,
} from 'src/app/vehicle/vehicle-dialog/edit-vehicle-dialog.component';
import { environment } from 'src/environments/environment';

import { BrandDTO, BrandService } from '../brand.service';
import { CreateVehicleDialogComponent } from '../vehicle-dialog/create-vehicle-dialog.component';
import { VehicleDTO, VehicleService } from '../vehicle.service';

export type SelectVehicleDialogComponentData = {
  vehicle?: VehicleDTO;
};


@Component({
  templateUrl: './select-vehicle-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectVehicleDialogComponent {
  public readonly vehicleIdFormControl = new FormControl<number | null>(null, [Validators.required]);
  public readonly form = new FormGroup({ vehicleId: this.vehicleIdFormControl });

  public readonly brands$: ReplaySubject<BrandDTO[]>;
  private readonly destroy$ = new Subject<null>();
  private readonly matRadioGroup$ = new Subject<HTMLElement>();

  @ViewChild('matRadioGroup') public set matRadioGroup(elementRef: ElementRef<HTMLElement> | undefined) {
    if (elementRef) {
      this.matRadioGroup$.next(elementRef.nativeElement);
    }
  };

  public readonly lazyLoadingControl = new LazyLoadingControl({
    parentElm: this.matRadioGroup$,
    retrieveData: (page: number) => this.vehicleService.getVehicles({ page, size: environment.defaultPageSize, sort: Sort.ASC }),
    destroy$: this.destroy$,
  });

  constructor(
    private readonly vehicleService: VehicleService,
    brandService: BrandService,
    private readonly matDialogRef: MatDialogRef<SelectVehicleDialogComponent, VehicleDTO | null>,
    private readonly matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data: SelectVehicleDialogComponentData,
  ) {
    if (data.vehicle) {
      this.vehicleIdFormControl.setValue(data.vehicle.id);
    }

    this.brands$ = brandService.brands$;
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
  }

  public createNewVehicle(): void {
    this.matDialog.open<CreateVehicleDialogComponent, number>(
      CreateVehicleDialogComponent,
      {
        disableClose: true,
      })
      .afterClosed()
      .pipe(
        filter((vehicleId): vehicleId is number => !!vehicleId),
        tap((vehicleId) => this.vehicleIdFormControl.setValue(vehicleId)),
        tap(() => this.lazyLoadingControl.reset()),
      ).subscribe();
  }

  public editVehicle(vehicleId: number): void {
    this.matDialog.open<EditVehicleDialogComponent, EditVehicleDialogComponentData, number>(
      EditVehicleDialogComponent,
      {
        data: { vehicleId },
        disableClose: true,
      })
      .afterClosed()
      .pipe(
        filter((vehicleId): vehicleId is number => !!vehicleId),
        tap((vehicleId) => this.vehicleIdFormControl.setValue(vehicleId)),
        tap(() => this.lazyLoadingControl.reset()),
      ).subscribe();
  }

  public deleteVehicle(vehicleId: number): void {
    this.matDialog.open<ConfirmationDialogComponent, ConfirmationDialogComponentData, VehicleDTO>(
      ConfirmationDialogComponent,
      {
        data: {
          title: 'Delete Vehicle',
          content: 'Please confirm that you want to delete this vehicle. The action is irreversible!',
        },
        disableClose: true,
      })
      .afterClosed()
      .pipe(
        filter((isConfirmed) => !!isConfirmed),
        mergeMap(() => this.vehicleService.delete(vehicleId)),
        tap(() => this.lazyLoadingControl.reset()),
      ).subscribe();
  }

  public submit(): void {
    if (this.form.valid) {
      const selectedVehicleId = this.vehicleIdFormControl.value;
      const selectedVehicle = this.lazyLoadingControl.data$.value?.overviewItems.find(({ id }) => id === selectedVehicleId);
      this.matDialogRef.close(selectedVehicle);
    }
  }

  public close(): void {
    this.matDialogRef.close(null);
  }
}
