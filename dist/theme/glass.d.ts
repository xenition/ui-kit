/**
 * Composing the glass token into a panel fill — shared by the native and web
 * `GlassPanel` and by the V4 surfaces (`BottomSheetV4`, `ModalV4`,
 * `ActionSheetV4`) so both platforms render the same translucency rather than
 * two independent guesses.
 *
 * ## Why the intensity scale only goes one way
 *
 * `glass-legibility.spec.ts` measures `onSurface` against the compiler's
 * `glass.tint` composited over the worst possible ground (pure black and pure
 * white — the extremes any real artwork sits between). The tint clears WCAG AA
 * with a margin of roughly 5.6:1 at worst across seeds and schemes, and that
 * margin is spent by a multiplier as small as 0.88.
 *
 * So the compiler's alpha is the FLOOR, and `intensity` can only travel toward
 * opaque. `soft` is the token untouched; `regular` and `strong` mix it toward
 * the opaque `surface`, which raises the alpha and pulls the colour toward the
 * pair `onSurface` is already guaranteed against. There is no setting that can
 * make a V4 panel illegible, because there is no setting below the floor.
 *
 * ## Why the arithmetic is premultiplied
 *
 * The web twin composes with CSS `color-mix()`, which mixes in premultiplied
 * alpha. React Native has no `color-mix()`, so {@link composeGlass} does the
 * same sum by hand — premultiplied, not the naïve lerp — so a panel is the same
 * colour on both platforms down to the rounding.
 */
import type { GlassTokens } from './types';
/**
 * How far each intensity mixes the glass tint toward the opaque `surface`.
 * `0` is the compiler's tint as emitted: the most translucent this theme's
 * contrast budget allows.
 */
export declare const GLASS_SURFACE_MIX: {
    readonly soft: 0;
    readonly regular: 0.2;
    readonly strong: 0.45;
};
/** The panel translucency scale. `soft` is the theme's legibility floor. */
export type GlassIntensity = keyof typeof GLASS_SURFACE_MIX;
/** Split an `#rrggbb` / `#rrggbbaa` into its opaque colour and its alpha. */
export declare function splitAlpha(hex: string): {
    color: string;
    alpha: number;
};
export interface ComposedGlass {
    /** Panel fill. */
    backgroundColor: string;
    /** The hairline that keeps the panel's edge readable on a busy ground. */
    borderColor: string;
    /**
     * Blur radius for a host `BlurView`, passed straight through from the token.
     *
     * React Native has no `backdrop-filter`. A component that mounted a blur view
     * itself would crash in every app that has not installed one, so the kit does
     * not: `tint` is pre-composited by the compiler and the panel looks right
     * with no blur at all. An app that HAS a `BlurView` (`expo-blur`,
     * `@react-native-community/blur`) should wrap the panel and pass this number.
     */
    blur: number;
}
/**
 * Resolve the glass tokens into React Native style values at one intensity.
 *
 * @param glass   `useXenitionTheme().glass` — already resolved for the scheme.
 * @param surface `useXenitionTheme().colors.surface`, the opaque end of the mix.
 */
export declare function composeGlass(glass: GlassTokens, surface: string, intensity?: GlassIntensity): ComposedGlass;
/**
 * The same composition as a CSS value, for the web twin. Returns a
 * `color-mix()` expression over the emitted custom properties, so it re-resolves
 * on a theme swap and flips with `[data-theme="dark"]` without a re-render.
 */
export declare function composeGlassCss(intensity?: GlassIntensity): string;
//# sourceMappingURL=glass.d.ts.map