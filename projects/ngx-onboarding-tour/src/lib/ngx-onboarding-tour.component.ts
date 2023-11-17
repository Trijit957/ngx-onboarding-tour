import { Component, Inject, Input, OnChanges, ElementRef, SimpleChanges, ViewChild, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { NgxOnboardingTourService } from './ngx-onboarding-tour.service';
import { OrientationEnum, TourType } from './ngx-onboarding-tour.type';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'ngx-onboarding-tour',
  templateUrl: './ngx-onboarding-tour.component.html',
  styleUrls: ['./ngx-onboarding-tour.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class NgxOnboardingTourComponent implements OnChanges, AfterViewInit {

  @Input() tour!: TourType;
  @ViewChild('highlighter', { read: ElementRef, static: false }) highlighterElement!: ElementRef;
  @ViewChild('info', { read: ElementRef, static: false }) infoElement!: ElementRef;
  // @ViewChild('highlighter') set highlighterElement(element: ElementRef) {
  //   if (element) {
  //     console.log("element", element)
  //      console.log()
  //   }
  // }

  @ViewChild('container') set containerElement(containerRef: ElementRef) {
    if (containerRef) {
      console.log("containerRef", containerRef.nativeElement.children)
       this.handleTour({
          highlighterElement: containerRef.nativeElement.children[0],
          infoElement: containerRef.nativeElement.children[1]
       })
    }
  }

  public isShowHighlighter: boolean = false;
  public isShowInfo: boolean = false;
  public isShow: boolean = false;
  private currentStepIndex: number = 0;
  private infoClasses = ['info-top', 'info-right', 'info-bottom', 'info-left'];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private readonly ngxOnboardingTourService: NgxOnboardingTourService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    console.log("tour", this.tour);
  }

  ngAfterViewInit(): void {
    this.ngxOnboardingTourService.startTourObservable.subscribe({
      next: isStartTour => {
        console.log("isStartTour", isStartTour)
        if(isStartTour) {
          this.startTour();
        }
      }
    })
  }

  public startTour() {
    this.isShow = true;
    this.isShowHighlighter = true;
    this.isShowInfo = true;
  }


  private handleTour({
    highlighterElement,
    infoElement
  } :{
    highlighterElement: HTMLDivElement
    infoElement: HTMLDivElement
  }) {

        let currentStep = this.tour.steps[this.currentStepIndex];

        if(currentStep.classSelector) {
          console.log("step.classSelector", currentStep.classSelector);
          const highlightedElement = this.findElement(currentStep.classSelector);
          console.log("highlightedElement", highlightedElement);
          if(highlightedElement) {
            const highlightedElementWidth = highlightedElement.offsetWidth, highlightedElementHeight = highlightedElement.offsetHeight;

            

            highlighterElement.style.width = highlightedElementWidth + 'px';
            highlighterElement.style.height = highlightedElementHeight + 'px';
            highlighterElement.style.left = highlightedElement.offsetLeft + (highlightedElementWidth - this.highlighterElement.nativeElement.offsetWidth) / 2 + 'px';
            highlighterElement.style.top = highlightedElement.offsetTop + (highlightedElementHeight - this.highlighterElement.nativeElement.offsetHeight) / 2 + 'px';

            infoElement.style.height = '200px';
            infoElement.style.width = '300px';

            switch(currentStep.orientation) {
               case OrientationEnum.BOTTOM:
                      infoElement.style.top = highlightedElement.offsetTop + highlightedElementHeight + 20 + 'px';
                      infoElement.style.left = highlightedElement.offsetLeft + (highlightedElementWidth - infoElement.offsetWidth) / 2 + 'px';

                      this.infoClasses.forEach(className => {
                        if(this.hasClassByElement({ element: this.infoElement.nativeElement, className: className})) {
                          this.removeClassByElement({ element: this.infoElement.nativeElement, className: className});
                        }
                      });

                      this.addClassByElement({ element: this.infoElement.nativeElement, className: 'info-bottom' });
                      break;
              case OrientationEnum.RIGHT:
                      infoElement.style.top = highlightedElement.offsetTop + (highlightedElementHeight - infoElement.offsetHeight) / 2 + 'px';
                      infoElement.style.left = highlightedElement.offsetLeft + (highlightedElementWidth + 20) + 'px';

                      this.infoClasses.forEach(className => {
                        if(this.hasClassByElement({ element: this.infoElement.nativeElement, className: className})) {
                          this.removeClassByElement({ element: this.infoElement.nativeElement, className: className});
                        }
                      });

                      this.addClassByElement({ element: this.infoElement.nativeElement, className: 'info-right' });
                      break;
              case OrientationEnum.TOP:
                        infoElement.style.top = (highlightedElement.offsetTop - 200 - 20) + 'px';
                        infoElement.style.left = highlightedElement.offsetLeft + (highlightedElementWidth - infoElement.offsetWidth) / 2 + 'px';

                        this.infoClasses.forEach(className => {
                          if(this.hasClassByElement({ element: this.infoElement.nativeElement, className: className})) {
                            this.removeClassByElement({ element: this.infoElement.nativeElement, className: className});
                          }
                        });
                        
                        this.addClassByElement({ element: this.infoElement.nativeElement, className: 'info-top' });
                        break;
              case OrientationEnum.LEFT:
                        console.log("highlightedElement.offsetLeft", highlightedElement.offsetLeft)
                        infoElement.style.top = highlightedElement.offsetTop + (highlightedElementHeight - infoElement.offsetHeight) / 2 + 'px';
                        infoElement.style.left = (highlightedElement.offsetLeft -300 - 20) + 'px';
  
                        this.infoClasses.forEach(className => {
                          if(this.hasClassByElement({ element: this.infoElement.nativeElement, className: className})) {
                            this.removeClassByElement({ element: this.infoElement.nativeElement, className: className});
                          }
                        });
                        
                        this.addClassByElement({ element: this.infoElement.nativeElement, className: 'info-left' });
                        break;
              default:
                    break;

            }



          } else {
            console.error('Desired Element Not Found!')
          }

        } else {
          console.error('Class Selector Not Present!')
        }

  }

  public goPrevStep() {
    this.currentStepIndex--;
    this.handleTour({
      highlighterElement: this.highlighterElement.nativeElement,
      infoElement: this.infoElement.nativeElement
    });
  }

  public goNextStep() {
    this.currentStepIndex++;
    this.handleTour({
      highlighterElement: this.highlighterElement.nativeElement,
      infoElement: this.infoElement.nativeElement
    });
  }

  public skipStep() {

  }

  private findElement(selector: string): HTMLElement | null {
    return this.document.querySelector(`.${selector}`);
  }

  private createElement(tag: string): HTMLElement {
    return this.document.createElement(tag);
  }

  private hasClassByElement({ element, className }: { element: HTMLElement; className: string; }) {
    return element.classList.contains(className);
  }

  private addClassBySelector({ selector, className }: { selector: string; className: string; }) {
    this.findElement(`.${selector}`)?.classList.add(className);
  }

  private addClassByElement({ element, className }: { element: HTMLElement; className: string; }) {
      element.classList.add(className);
  }

  private removeClassByElement({ element, className }: { element: HTMLElement; className: string; }) {
      element.classList.remove(className);
  }

}
