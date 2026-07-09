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
import type { NativeThemeTokens } from '../../theme/outputs';
import type { CompiledTheme, SemanticColors, ThemeSeed } from '../../theme/types';
export type { NativeThemeTokens };
export type { CompiledTheme, SemanticColors, ThemeSeed };
export type NativeColorScheme = 'light' | 'dark';
export interface XenitionNativeTheme {
    /** The full resolved token object (both color schemes). */
    tokens: NativeThemeTokens;
    /** The active color scheme. */
    scheme: NativeColorScheme;
    /** Semantic colors for the active scheme — what components should use. */
    colors: SemanticColors;
}
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
export declare function XenitionNativeThemeProvider({ theme, scheme, children, }: XenitionNativeThemeProviderProps): React.ReactElement;
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
export declare function useXenitionTheme(): XenitionNativeTheme;
//# sourceMappingURL=index.d.ts.map