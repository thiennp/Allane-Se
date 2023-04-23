import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectVehicleDialogComponent } from './select-vehicle-dialog.component';

describe('SelectVehicleDialogComponent', () => {
  let component: SelectVehicleDialogComponent;
  let fixture: ComponentFixture<SelectVehicleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectVehicleDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectVehicleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
