import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutsuccessComponent } from './checkoutsuccess.component';

describe('CheckoutsuccessComponent', () => {
  let component: CheckoutsuccessComponent;
  let fixture: ComponentFixture<CheckoutsuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutsuccessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckoutsuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
