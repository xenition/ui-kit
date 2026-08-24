/**
 * Jest mock for the optional `react-native-safe-area-context` peer dep. Native
 * edge-anchored components (BottomNav, AppShell, Toast, BottomSheet, ActionSheet,
 * FloatButton, PageContainer) read device safe-area insets via
 * `useSafeAreaInsets()`; under the jest `react-native` preset there is no native
 * provider, so return a fixed inset set and passthrough the provider/view. Wired
 * via jest `moduleNameMapper`.
 */
import * as React from 'react';
import { View, type ViewProps } from 'react-native';

export interface EdgeInsets {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

/** Fixed, notch-like insets so specs can assert insets are applied. */
export function useSafeAreaInsets(): EdgeInsets {
  return { top: 24, bottom: 16, left: 0, right: 0 };
}

export function SafeAreaProvider({ children }: { children?: React.ReactNode }): React.ReactElement {
  return <>{children}</>;
}

export function SafeAreaView({ children, ...rest }: ViewProps): React.ReactElement {
  return <View {...rest}>{children}</View>;
}

export const initialWindowMetrics = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 24, bottom: 16, left: 0, right: 0 },
};

export default { useSafeAreaInsets, SafeAreaProvider, SafeAreaView, initialWindowMetrics };
