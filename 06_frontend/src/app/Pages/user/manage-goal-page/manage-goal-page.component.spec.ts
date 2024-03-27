import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageGoalPageComponent } from './manage-goal-page.component';

describe('ManageGoalPageComponent', () => {
  let component: ManageGoalPageComponent;
  let fixture: ComponentFixture<ManageGoalPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageGoalPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageGoalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
