import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDietComponent } from './manage-diet.component';

describe('ManageDietComponent', () => {
  let component: ManageDietComponent;
  let fixture: ComponentFixture<ManageDietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageDietComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageDietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
