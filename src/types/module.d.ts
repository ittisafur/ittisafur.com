declare module '@studio-freight/react-lenis' {
  import { FC } from 'react';
  import { LenisInstance, ReactLenisProps, LenisOptions } from './lenis';

  export const ReactLenis: FC<ReactLenisProps>;

  export function useLenis<T = LenisInstance>(): T | null;

  export function Lenis(options?: LenisOptions): LenisInstance;
}
