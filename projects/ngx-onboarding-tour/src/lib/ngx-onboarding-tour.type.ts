export type TourType = {
    id: number;
    steps: Array<StepType>;
    onSkip?: () => void;
    onComplete?: () => void;
}

export type StepType = {
    classSelector?: string;
    title?: string;
    description?: string;
    orientation?: OrientationEnum;
    openAction?: () => void;
    closeAction?: () => void;
}

export enum OrientationEnum {
    TOP = 1,
    RIGHT = 2,
    BOTTOM = 3,
    LEFT = 4
}