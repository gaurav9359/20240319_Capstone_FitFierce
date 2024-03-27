import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionBuyCardComponent } from './subscription-buy-card.component';

describe('SubscriptionBuyCardComponent', () => {
  let component: SubscriptionBuyCardComponent;
  let fixture: ComponentFixture<SubscriptionBuyCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionBuyCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubscriptionBuyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
