import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, filter, ReplaySubject, Subject, takeUntil, tap } from 'rxjs';
import { Sort } from 'src/app/common/restful-types';
import { environment } from 'src/environments/environment';

import { ContractOverviewDTO, ContractService } from '../contract.service';
import {
  LeasingContractDetailsDialogComponent,
  LeasingContractDetailsDialogComponentData,
} from '../leasing-contract-details-dialog/leasing-contract-details-dialog.component';
import {
  CreateLeasingContractDialogComponent,
} from '../leasing-contract-form-dialog/create-leasing-contract-dialog.component';

@Component({
  templateUrl: './contract-overview.component.html',
  styleUrls: ['./contract-overview.component.scss']
})
export class ContractOverviewComponent implements OnDestroy {
  public readonly displayedColumns: ReadonlyArray<string> = [
    'contractNo',
    'customer',
    'vehicle',
    'vin',
    'monthlyRate',
    'vehiclePrice',
    'details',
  ];

  private readonly destroy$ = new Subject<null>();
  public readonly numberOfItems$ = new BehaviorSubject<number>(0);
  public readonly numberOfPages$ = new BehaviorSubject<number>(0);

  public readonly pagination$ = new BehaviorSubject<PageEvent>({
    pageIndex: 0,
    pageSize: environment.defaultPageSize,
    length: 0,
  });

  public readonly dataSource$ = new ReplaySubject<MatTableDataSource<ContractOverviewDTO> | null>(1);

  @ViewChild('paginator') public set paginator(elementRef: ElementRef<MatPaginator> | undefined) {
    if (elementRef) {
      this.dataSource$.pipe(
        filter((dataSource): dataSource is MatTableDataSource<ContractOverviewDTO> => !!dataSource),
      ).subscribe((dataSource) => dataSource.paginator = elementRef.nativeElement);
    }
  };


  constructor(
    private readonly contractService: ContractService,
    private readonly matDialog: MatDialog,
  ) {
    this.pagination$.subscribe(({ pageIndex, pageSize }) => {
      this.contractService.getContracts({
        page: pageIndex,
        size: pageSize,
        sort: Sort.ASC,
      }).pipe(
        takeUntil(this.destroy$),
        tap(({ numberOfItems }) => this.numberOfItems$.next(numberOfItems)),
        tap(({ numberOfPages }) => this.numberOfPages$.next(numberOfPages)),
      ).subscribe((data) => this.dataSource$.next(new MatTableDataSource(data.overviewItems)));
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
  }

  public createContract() {
    this.matDialog.open<CreateLeasingContractDialogComponent, undefined, number>(
      CreateLeasingContractDialogComponent,
      {
        disableClose: true,
      })
      .afterClosed()
      .pipe(
        filter((contractId) => !!contractId),
        tap(() => this.reset()),
      ).subscribe();
  }

  public viewContractDetails(contractId: number) {
    this.matDialog.open<LeasingContractDetailsDialogComponent, LeasingContractDetailsDialogComponentData, number>(
      LeasingContractDetailsDialogComponent,
      {
        data: {
          contractId,
        },
        disableClose: true,
      })
      .afterClosed()
      .pipe(
        filter((contractId) => !!contractId),
        tap(() => this.reset()),
      ).subscribe();
  }

  private reset() {
    this.numberOfItems$.next(0);
    this.numberOfPages$.next(0);
    this.dataSource$.next(null);
    this.pagination$.next({
      ...this.pagination$.value,
      pageIndex: 0,
    });
  }

  public updatePage(evt: PageEvent) {
    this.pagination$.next(evt);
  }
}
