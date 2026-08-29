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
  DesignLineProvider,
  XenitionNativeThemeProvider,
  type DesignLine,
  type XenitionNativeThemeProviderProps,
} from '../theme';

export type XenitionUIProviderProps = XenitionNativeThemeProviderProps & {
  /**
   * Which design line every screen renders — `'base'` (default), `'v2'`,
   * `'v3'`, `'v4'`, or `'latest'`.
   *
   * The kit ships each screen in several designs as separate exports with
   * identical props. That keeps the library honest but makes an APP edit
   * every import to change its look, and leaves "use the newest design"
   * unexpressible. Set it once here instead.
   *
   * `'latest'` resolves PER COMPONENT to the newest line that component
   * actually has — a screen with three designs renders its V3, one with only
   * a base renders the base. An app should not have to know which parts of
   * the kit have caught up.
   *
   * Defaults to `'base'` so an app that never opts in keeps rendering exactly
   * what it rendered before. A kit upgrade must not silently redesign
   * somebody's product.
   */
  design?: DesignLine;
};

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
  design = 'base',
  children,
}: XenitionUIProviderProps): React.ReactElement {
  return (
    <XenitionNativeThemeProvider theme={theme} scheme={scheme}>
      <DesignLineProvider design={design}>{children}</DesignLineProvider>
    </XenitionNativeThemeProvider>
  );
}
