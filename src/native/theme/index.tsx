/**
 * `@xenition/ui/native/theme` — React Native theme tokens (v0: tokens only,
 * no RN components yet).
 *
 * React Native cannot read CSS custom properties, so the provider exposes
 * the fully-resolved {@link NativeThemeTokens} (hex strings, px numbers)
 * through React context for use in `StyleSheet.create` / inline styles.
 * No `react-native` import is needed for this layer — it is pure React.
 */

import * as React from 'react';
import { compileTheme } from '../../theme/compile';
import { toNativeTokens } from '../../theme/outputs';
import type { NativeThemeTokens } from '../../theme/outputs';
import type { CompiledTheme, SemanticColors, ThemeSeed } from '../../theme/types';

export type { NativeThemeTokens };
// Re-exported for RN ergonomics — mobile apps shouldn't need a second import
// from '@xenition/ui/theme' just to type their seed (v2-reference finding).
export type { CompiledTheme, SemanticColors, ThemeSeed };

function isCompiledTheme(theme: ThemeSeed | CompiledTheme): theme is CompiledTheme {
  return typeof theme === 'object' && theme !== null && 'ramps' in theme && 'light' in theme;
}

export type NativeColorScheme = 'light' | 'dark';

export interface XenitionNativeTheme {
  /** The full resolved token object (both color schemes). */
  tokens: NativeThemeTokens;
  /** The active color scheme. */
  scheme: NativeColorScheme;
  /** Semantic colors for the active scheme — what components should use. */
  colors: SemanticColors;
}

const XenitionNativeThemeContext = React.createContext<XenitionNativeTheme | null>(null);

export interface XenitionNativeThemeProviderProps {
  /** A raw seed (compiled on the fly) or an already-compiled theme. */
  theme: ThemeSeed | CompiledTheme;
  /**
   * Active color scheme; pass `useColorScheme()` from react-native to follow
   * the OS. Defaults from the seed (`'dark'` when `seed.mode === 'dark'`).
   */
  scheme?: NativeColorScheme;
  children?: React.ReactNode;
}

/** Root theme provider for React Native apps. */
export function XenitionNativeThemeProvider({
  theme,
  scheme,
  children,
}: XenitionNativeThemeProviderProps): React.ReactElement {
  const value = React.useMemo<XenitionNativeTheme>(() => {
    const compiled = isCompiledTheme(theme) ? theme : compileTheme(theme);
    const tokens = toNativeTokens(compiled);
    const resolvedScheme: NativeColorScheme =
      scheme ?? (compiled.seed.mode === 'dark' ? 'dark' : 'light');
    return {
      tokens,
      scheme: resolvedScheme,
      colors: tokens.colors[resolvedScheme],
    };
  }, [theme, scheme]);

  return (
    <XenitionNativeThemeContext.Provider value={value}>
      {children}
    </XenitionNativeThemeContext.Provider>
  );
}

/**
 * Read the resolved theme tokens.
 *
 * ```tsx
 * const { colors, tokens } = useXenitionTheme();
 * const styles = StyleSheet.create({
 *   button: {
 *     backgroundColor: colors.primary,
 *     borderRadius: tokens.radius.md,
 *     padding: tokens.spacing.md,
 *   },
 * });
 * ```
 */
export function useXenitionTheme(): XenitionNativeTheme {
  const value = React.useContext(XenitionNativeThemeContext);
  if (value === null) {
    throw new Error(
      'useXenitionTheme must be used inside <XenitionNativeThemeProvider theme={...}>.'
    );
  }
  return value;
}
