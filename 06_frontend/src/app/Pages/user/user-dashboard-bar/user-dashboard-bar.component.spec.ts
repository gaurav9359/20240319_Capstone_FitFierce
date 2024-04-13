import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashboardBarComponent } from './user-dashboard-bar.component';

describe('UserDashboardBarComponent', () => {
  let component: UserDashboardBarComponent;
  let fixture: ComponentFixture<UserDashboardBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDashboardBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserDashboardBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
