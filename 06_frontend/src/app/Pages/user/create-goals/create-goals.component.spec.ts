import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGoalsComponent } from './create-goals.component';

describe('CreateGoalsComponent', () => {
  let component: CreateGoalsComponent;
  let fixture: ComponentFixture<CreateGoalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateGoalsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
