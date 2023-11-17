import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxOnboardingTourComponent } from './ngx-onboarding-tour.component';

describe('NgxOnboardingTourComponent', () => {
  let component: NgxOnboardingTourComponent;
  let fixture: ComponentFixture<NgxOnboardingTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxOnboardingTourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxOnboardingTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
