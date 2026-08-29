/**
 * The three output targets of a compiled theme:
 *
 * 1. `toCssVars(theme)`      → CSS custom properties (web runtime).
 * 2. `toTailwindPreset(theme)` → a Tailwind preset whose values reference the
 *    CSS vars, so `bg-primary` / `text-on-surface` restyle live when the vars
 *    change — no rebuild.
 * 3. `toNativeTokens(theme)` → a plain nested object with **resolved** hex /
 *    numeric values for React Native (RN cannot read CSS vars).
 */
import { CompiledTheme, SemanticColors } from './types';
/**
 * Render the theme as CSS custom properties.
 *
 * `:root` carries the base mode (dark when `seed.mode === 'dark'`, light
 * otherwise) plus ramps and scales. When `seed.mode === 'both'`, a
 * `[data-theme="dark"]` block overrides the semantic slots.
 *
 * Ramps are emitted in the scheme's orientation: light schemes use the ramps
 * as compiled, dark schemes emit the inverted ramps (`neutral-50` → the darkest
 * step, `neutral-900` → a light step) — matching how the dark semantic slots
 * are derived, so utility classes like `bg-neutral-50` track the dark surface.
 */
export declare function toCssVars(theme: CompiledTheme): string;
/** Shape of the object returned by {@link toTailwindPreset}. */
export interface TailwindPreset {
    theme: {
        extend: {
            colors: Record<string, string | Record<string, string>>;
            borderRadius: Record<string, string>;
            spacing: Record<string, string>;
            fontSize: Record<string, string>;
            fontFamily: Record<string, string[]>;
        };
    };
}
/**
 * Build a Tailwind preset bound to the theme's CSS variables. Because every
 * value is a `var(--xen-*)` reference, the preset itself is theme-agnostic at
 * build time — swapping the injected vars restyles the app without a rebuild.
 *
 * Usage in a generated app's `tailwind.config.js`:
 * `presets: [require('@xenition/ui/tailwind-preset').toTailwindPreset(theme)]`
 */
export declare function toTailwindPreset(_theme: CompiledTheme): TailwindPreset;
/** Token object consumed by React Native — everything resolved, no CSS vars. */
export interface NativeThemeTokens {
    colors: {
        light: SemanticColors;
        dark: SemanticColors;
    };
    /**
     * NOTE: these carry the LIGHT ramp orientation for BOTH schemes — the dark
     * semantics are derived from an inverted ramp during compilation, but the
     * ramps themselves are handed through as compiled. So `ramps.primary[50]` is
     * a near-white in either scheme: on a dark page it is a highlight, not a
     * tint. Reach for `[900]` there, or use `gradient`/`glass` below, which ARE
     * resolved per scheme.
     */
    ramps: CompiledTheme['ramps'];
    radius: CompiledTheme['radius'];
    spacing: CompiledTheme['spacing'];
    typography: CompiledTheme['typography'];
    /** Resolved depth from the seed — `'flat' | 'soft' | 'glass'`. */
    depth: CompiledTheme['depth'];
    /** Brand gradients, per scheme. Unlike `ramps`, these are already correct. */
    gradient: {
        light: CompiledTheme['lightGradient'];
        dark: CompiledTheme['darkGradient'];
    };
    /** Translucent panel treatment, per scheme. */
    glass: {
        light: CompiledTheme['lightGlass'];
        dark: CompiledTheme['darkGlass'];
    };
    /** M3 state-layer opacities. Scheme-independent. */
    state: CompiledTheme['state'];
    /** M3 motion scale. Scheme-independent. */
    motion: CompiledTheme['motion'];
    /** Focus-ring geometry. Scheme-independent. */
    ring: CompiledTheme['ring'];
    /** Shadows, per scheme. */
    elevation: {
        light: CompiledTheme['lightElevation'];
        dark: CompiledTheme['darkElevation'];
    };
}
/**
 * Flatten a compiled theme into plain resolved values (hex strings and px
 * numbers) for React Native `StyleSheet` consumption.
 */
export declare function toNativeTokens(theme: CompiledTheme): NativeThemeTokens;
//# sourceMappingURL=outputs.d.ts.map