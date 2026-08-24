import * as React from 'react';
import { compileTheme } from './theme/compile';
import { toCssVars } from './theme/outputs';
import type { CompiledTheme, ThemeSeed } from './theme/types';

/** Narrow a `ThemeSeed | CompiledTheme` union to the compiled form. */
export function isCompiledTheme(theme: ThemeSeed | CompiledTheme): theme is CompiledTheme {
  return (
    typeof theme === 'object' && theme !== null && 'ramps' in theme && 'light' in theme
  );
}

const XenitionThemeContext = React.createContext<CompiledTheme | null>(null);

export interface XenitionUIProviderProps {
  /** A raw seed (compiled on the fly) or an already-compiled theme. */
  theme: ThemeSeed | CompiledTheme;
  /**
   * Active color scheme. Defaults from the seed: `'dark'` when
   * `seed.mode === 'dark'`, otherwise `'light'`. Only meaningful when the
   * seed mode is `'both'`, where it toggles the `data-theme` attribute.
   */
  mode?: 'light' | 'dark';
  children?: React.ReactNode;
}

/**
 * Root theme provider for web apps.
 *
 * Compiles the seed (if needed), injects the `--xen-*` CSS custom properties
 * via a `<style>` tag, and stamps `data-theme` on a wrapper so the
 * `[data-theme="dark"]` overrides apply. Place once at the app root, above
 * any `@xenition/ui` component.
 */
export function XenitionUIProvider({
  theme,
  mode,
  children,
}: XenitionUIProviderProps): React.ReactElement {
  const compiled = React.useMemo(
    () => (isCompiledTheme(theme) ? theme : compileTheme(theme)),
    [theme]
  );
  const css = React.useMemo(() => toCssVars(compiled), [compiled]);
  const resolvedMode = mode ?? (compiled.seed.mode === 'dark' ? 'dark' : 'light');

  return (
    <XenitionThemeContext.Provider value={compiled}>
      <style data-xenition-theme="" dangerouslySetInnerHTML={{ __html: css }} />
      <div data-theme={resolvedMode} style={{ display: 'contents' }}>
        {children}
      </div>
    </XenitionThemeContext.Provider>
  );
}

/** Access the compiled theme from anywhere below `XenitionUIProvider`. */
export function useXenitionCompiledTheme(): CompiledTheme {
  const compiled = React.useContext(XenitionThemeContext);
  if (compiled === null) {
    throw new Error(
      'useXenitionCompiledTheme must be used inside <XenitionUIProvider theme={...}>.'
    );
  }
  return compiled;
}
