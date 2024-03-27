import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsTrainerDetailsComponent } from './subs-trainer-details.component';

describe('SubsTrainerDetailsComponent', () => {
  let component: SubsTrainerDetailsComponent;
  let fixture: ComponentFixture<SubsTrainerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubsTrainerDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubsTrainerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
