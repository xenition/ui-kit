/**
 * `XenitionUIProvider` (native) — the mobile mirror of the web root provider.
 * A mobile app does `<XenitionUIProvider theme={seed}>` exactly like the web
 * app; under the hood it delegates to the platform-agnostic
 * {@link XenitionNativeThemeProvider} (which reuses the shared theme compiler),
 * so native components read the same compiled tokens through
 * `useXenitionTheme()`.
 */
import * as React from 'react';
import {
  XenitionNativeThemeProvider,
  type XenitionNativeThemeProviderProps,
} from '../theme';

export type XenitionUIProviderProps = XenitionNativeThemeProviderProps;

/**
 * Root provider for React Native apps. Compiles the seed (or accepts an
 * already-compiled theme) and exposes the resolved tokens via context. Place
 * once at the app root, above any `@xenition/ui/native/*` component.
 *
 * ```tsx
 * <XenitionUIProvider theme={seed}>
 *   <Button onPress={buy}>Buy</Button>
 * </XenitionUIProvider>
 * ```
 */
export function XenitionUIProvider({
  theme,
  scheme,
  children,
}: XenitionUIProviderProps): React.ReactElement {
  return (
    <XenitionNativeThemeProvider theme={theme} scheme={scheme}>
      {children}
    </XenitionNativeThemeProvider>
  );
}
