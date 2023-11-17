import { Component, AfterViewInit } from '@angular/core';
import { TourType, NgxOnboardingTourService, OrientationEnum } from 'ngx-onboarding-tour';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'test-app';

  public tour: TourType = {
    id: 1,
    steps: [
      {
        classSelector: 'header',
        orientation: OrientationEnum.BOTTOM,
        title: 'This is Header!',
        description: 'This is Header'
      },
      {
        classSelector: 'description',
        orientation: OrientationEnum.TOP,
        title: 'This is Description!',
        description: 'This is Description'
      },
      {
        classSelector: 'start-btn',
        orientation: OrientationEnum.RIGHT,
        title: 'This is Start Button!',
        description: 'This is Description'
      },
      {
        classSelector: 'other-btn',
        orientation: OrientationEnum.LEFT,
        title: 'This is Other Button!',
        description: 'This is Description'
      }
    ]
  }

  constructor(
    private ngxOnboardingTourService: NgxOnboardingTourService
  ) { }

  ngAfterViewInit(): void {
     
  }

  public startJourney() {
    this.ngxOnboardingTourService.startTour();
  }
}
