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
import type { CompiledTheme, ElevationTokens, GlassTokens, GradientTokens, SemanticColors, ThemeDepth, ThemeSeed, StateLayerTokens, MotionTokens, RingTokens } from '../../theme/types';
export type { NativeThemeTokens };
export type { CompiledTheme, SemanticColors, ThemeSeed };
export type { ElevationTokens, GlassTokens, GradientTokens, ThemeDepth };
export type { StateLayerTokens, MotionTokens, RingTokens };
export { DesignLineProvider, designed, resolveDesign, useDesignLine } from './design-line';
export type { DesignLine, DesignSet, DesignLineProviderProps } from './design-line';
export type NativeColorScheme = 'light' | 'dark';
export interface XenitionNativeTheme {
    /** The full resolved token object (both color schemes). */
    tokens: NativeThemeTokens;
    /** The active color scheme. */
    scheme: NativeColorScheme;
    /** Semantic colors for the active scheme — what components should use. */
    colors: SemanticColors;
    /**
     * Brand gradients for the ACTIVE scheme, already resolved.
     *
     * Unlike `tokens.ramps` — which carries the light orientation in both
     * schemes — these are correct as handed to you. Use them for a hero, brand
     * artwork, and the one primary action on a screen. There is deliberately no
     * gradient for cards, rows or icons: `design.md` §35.11 asks that gradients
     * stay rare, and a token that exists will end up on everything.
     */
    gradient: GradientTokens;
    /** Translucent panel treatment for the active scheme. */
    glass: GlassTokens;
    /** Shadows for the active scheme. Higher opacity in dark, not lower. */
    elevation: ElevationTokens;
    /** The seed's depth. `'flat'` zeroes gradients and shadows for you. */
    depth: ThemeDepth;
    /**
     * Material Design 3's state-layer opacities — hover 0.08, focus 0.12,
     * pressed 0.12, dragged 0.16, disabled content 0.38 / container 0.12.
     * Composite the component's OWN content colour at one of these over its
     * container, and the feedback works on any ground.
     */
    state: StateLayerTokens;
    /**
     * M3's motion scale. Use the named durations rather than a number that
     * looked about right — `standard` for a state change, `enter` for something
     * arriving, with the matching easing.
     */
    motion: MotionTokens;
    /** Focus-ring geometry — width and offset, so every ring matches. */
    ringGeometry: RingTokens;
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