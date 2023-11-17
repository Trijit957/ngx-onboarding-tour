import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgxOnboardingTourModule, NgxOnboardingTourService } from 'ngx-onboarding-tour';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxOnboardingTourModule
  ],
  providers: [
    NgxOnboardingTourService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
