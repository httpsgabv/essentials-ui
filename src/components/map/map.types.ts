import type { ReactNode } from 'react';
import type { MapContract } from './map.contract';

export interface MapProps extends MapContract {
  tileUrl?: string;
  tileAttribution?: string;
  topLeft?: ReactNode;
  topRight?: ReactNode;
  bottomLeft?: ReactNode;
  bottomRight?: ReactNode;
}
