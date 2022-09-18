import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CRBPortalComponent } from './crb-portal.component';

describe('CRBPortalComponent', () => {
  let component: CRBPortalComponent;
  let fixture: ComponentFixture<CRBPortalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CRBPortalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CRBPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
