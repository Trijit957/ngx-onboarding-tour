import { Inject, Injectable } from '@angular/core';
import { TourType } from './ngx-onboarding-tour.type';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

type ShowElementInfoType = {
  isShowHighlighter: boolean;
  isShowInfo: boolean;
}

@Injectable()
export class NgxOnboardingTourService {

  private highlighterElement!: HTMLDivElement;
  private infoElement!: HTMLDivElement;

  private showElement$ = new BehaviorSubject<ShowElementInfoType>({
    isShowHighlighter: false,
    isShowInfo: false
  });
  public showElementObservable = this.showElement$.asObservable();

  private startTour$ = new BehaviorSubject<boolean>(false);
  public startTourObservable = this.startTour$.asObservable();

  private endTour$ = new BehaviorSubject<boolean>(false);
  public endTourObservable = this.startTour$.asObservable();

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) { }

  public setShowElementObserver(showElementInfo: ShowElementInfoType) {
      this.showElement$.next(showElementInfo);
  }

  public setStartTourObserver(isStartTour: boolean) {
    this.startTour$.next(isStartTour);
  }

  public setEndTourObserver(isEndTour: boolean) {
    this.endTour$.next(isEndTour);
  }

  public setElements({
    highlighterElement,
    infoElement
  }: {
    highlighterElement: HTMLDivElement,
    infoElement: HTMLDivElement
  }) {
    this.highlighterElement = highlighterElement;
    this.infoElement = infoElement;
  }

  public startTour() {
     this.setStartTourObserver(true)
  }

  public endTour() {
    this.setEndTourObserver(true)
  }
  
  
}
