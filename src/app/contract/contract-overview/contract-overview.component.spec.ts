import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';

import {
  LeasingContractDetailsDialogModule,
} from '../leasing-contract-details-dialog/leasing-contract-details-dialog.module';
import { LeasingContractFormDialogModule } from '../leasing-contract-form-dialog/leasing-contract-form-dialog.module';
import { ContractOverviewComponent } from './contract-overview.component';

describe('ContractOverviewComponent', () => {
  let component: ContractOverviewComponent;
  let fixture: ComponentFixture<ContractOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContractOverviewComponent],
      imports: [
        CommonModule,
        HttpClientTestingModule,
        LeasingContractDetailsDialogModule,
        LeasingContractFormDialogModule,
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        MatDividerModule,
        MatIconModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatTableModule,
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ContractOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
