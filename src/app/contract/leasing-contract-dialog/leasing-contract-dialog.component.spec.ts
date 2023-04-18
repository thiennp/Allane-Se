import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeasingContractDialogComponent } from './leasing-contract-dialog.component';

describe('LeasingContractDialogComponent', () => {
  let component: LeasingContractDialogComponent;
  let fixture: ComponentFixture<LeasingContractDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeasingContractDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeasingContractDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
