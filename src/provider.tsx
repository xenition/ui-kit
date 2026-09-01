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

  /**
   * The scheme is stamped on the **document element** as well as the wrapper.
   *
   * The wrapper alone is not enough, and the gap was invisible until a modal
   * was opened on a dark page. `toCssVars` emits the dark overrides under
   * `[data-theme="dark"]`, and that selector only reaches descendants — so
   * every component that `createPortal`s to `document.body` lands OUTSIDE the
   * stamped subtree and resolves the light palette. That is `ModalV4`,
   * `DrawerV4`, `BottomSheetV4`, `ActionSheetV4` and the whole toast stack:
   * measured live, `--xen-surface` was `#1e2024` inside the app and `#f7f7f8`
   * on `document.body` at the same instant, so a dark app opened a white modal
   * and near-white toasts.
   *
   * The wrapper stamp stays. It is what lets a second provider theme a
   * subtree — a preview pane, an embedded widget — without the page following
   * it, and the more specific selector still wins there.
   *
   * The previous value is restored on unmount rather than cleared, so a
   * provider that mounts and unmounts inside a host page that does its own
   * theming leaves the page as it found it.
   */
  React.useEffect(() => {
    if (typeof document === 'undefined') return undefined;
    const root = document.documentElement;
    const previous = root.getAttribute('data-theme');
    root.setAttribute('data-theme', resolvedMode);
    return () => {
      if (previous === null) root.removeAttribute('data-theme');
      else root.setAttribute('data-theme', previous);
    };
  }, [resolvedMode]);

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
