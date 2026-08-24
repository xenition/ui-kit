/**
 * Ambient shim for the OPTIONAL `expo-linear-gradient` peer so the kit type-
 * checks without the package installed. Consumers (all Expo apps) provide the
 * real implementation; `GradientText` requires it lazily and falls back to a
 * solid token color when it is absent. Jest maps this specifier to a mock.
 */
declare module 'expo-linear-gradient' {
  import * as React from 'react';
  import { ViewProps } from 'react-native';

  export interface LinearGradientPoint {
    x: number;
    y: number;
  }

  export interface LinearGradientProps extends ViewProps {
    colors: readonly string[];
    start?: LinearGradientPoint | null;
    end?: LinearGradientPoint | null;
    locations?: readonly number[] | null;
  }

  export const LinearGradient: React.ComponentType<LinearGradientProps>;
}
