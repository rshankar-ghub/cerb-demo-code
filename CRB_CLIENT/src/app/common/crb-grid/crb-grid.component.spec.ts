import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRBGridComponent } from './crb-grid.component';

describe('CRBGridComponent', () => {
  let component: CRBGridComponent;
  let fixture: ComponentFixture<CRBGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRBGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRBGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
