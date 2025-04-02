export interface ScrollToOptions {
  offset?: number;
  duration?: number;
  immediate?: boolean;
  lock?: boolean;
  force?: boolean;
  easing?: (t: number) => number;
  onComplete?: () => void;
}

export interface LenisOptions {
  wrapper?: HTMLElement | Window | null;
  content?: HTMLElement | null;
  lerp?: number;
  duration?: number;
  smoothTouch?: boolean;
  smoothWheel?: boolean;
  wheelMultiplier?: number;
  touchMultiplier?: number;
  orientation?: 'vertical' | 'horizontal';
  gestureOrientation?: 'vertical' | 'horizontal';
  infinite?: boolean;
  dynamicGesture?: boolean;
  easing?: (t: number) => number;
  wheelEventsTarget?: Window | HTMLElement | null;
  normalizeWheel?: boolean;
  autoResize?: boolean;
}

// Define event data structure
export interface LenisScrollData {
  scroll: number;
  limit: number;
  velocity: number;
  direction: number;
  progress: number;
}

// Define event callback types
export type LenisScrollCallback = (data: LenisScrollData) => void;
export type LenisGenericCallback = () => void;

// Define events available in Lenis
export type LenisEventType =
  | 'scroll'
  | 'scroll:progress'
  | 'scroll:complete'
  | 'resize'
  | 'scroll:start'
  | 'scroll:stop'
  | 'init';

export interface LenisInstance {
  // Core methods
  scrollTo: (target: string | number | HTMLElement, options?: ScrollToOptions) => void;
  start: () => void;
  stop: () => void;
  raf: (time: number) => void;
  destroy: () => void;

  // Properties
  targetScroll: number;
  actualScroll: number;
  animatedScroll: number;
  isScrolling: boolean;
  isSmooth: boolean;
  direction: number;
  options: LenisOptions;

  // Getters
  velocity: number;
  limit: number;
  progress: number;
  isHorizontal: boolean;
  isVertical: boolean;

  // Event handlers with more specific types
  on: <T extends LenisEventType>(
    event: T,
    callback: T extends 'scroll' ? LenisScrollCallback : LenisGenericCallback
  ) => void;

  off: <T extends LenisEventType>(
    event: T,
    callback: T extends 'scroll' ? LenisScrollCallback : LenisGenericCallback
  ) => void;
}

export interface ReactLenisProps<T extends HTMLElement = HTMLDivElement> {
  children: React.ReactNode;
  root?: boolean;
  options?: LenisOptions;
  autoUpdate?: boolean;
  rafPriority?: number;
  className?: string;
  onScroll?: (instance: LenisInstance) => void;
  ref?: React.Ref<T>;
}
