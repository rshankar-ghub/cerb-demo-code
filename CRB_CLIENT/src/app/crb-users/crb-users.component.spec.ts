import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CRBUsersComponent } from './crb-users.component';

describe('ConfigManagerComponent', () => {
  let component: CRBUsersComponent;
  let fixture: ComponentFixture<CRBUsersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CRBUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CRBUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
