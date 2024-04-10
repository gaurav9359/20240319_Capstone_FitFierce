import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryTrainerComponent } from './history-trainer.component';

describe('HistoryTrainerComponent', () => {
  let component: HistoryTrainerComponent;
  let fixture: ComponentFixture<HistoryTrainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryTrainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoryTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
