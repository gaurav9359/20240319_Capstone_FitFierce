import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGoalsTrainerComponent } from './create-goals-trainer.component';

describe('CreateGoalsTrainerComponent', () => {
  let component: CreateGoalsTrainerComponent;
  let fixture: ComponentFixture<CreateGoalsTrainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateGoalsTrainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateGoalsTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
