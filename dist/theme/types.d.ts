/**
 * Theme-layer types for `@xenition/ui`.
 *
 * A theme is authored as a tiny {@link ThemeSeed} (~5 values — the only thing
 * the LLM or a settings form ever writes) and compiled by `compileTheme()`
 * into a full {@link CompiledTheme}: 11-step color ramps, WCAG-AA-checked
 * semantic slots for light + dark, and radius/spacing/typography scales.
 */
/** The 11 ramp steps, lightest (50) to darkest (950). */
export declare const RAMP_STEPS: readonly [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
export type RampStep = (typeof RAMP_STEPS)[number];
/** An 11-step color ramp; every value is a `#rrggbb` hex string. */
export type ColorRamp = Record<RampStep, string>;
export type NeutralTemperature = 'warm' | 'cool' | 'pure';
export type ThemeShape = 'sharp' | 'rounded' | 'pill';
export type ThemeMode = 'light' | 'dark' | 'both';
/**
 * `theme.seed.json` — the only theme input an app (or the builder LLM)
 * provides. Everything else is derived deterministically.
 */
export interface ThemeSeed {
    /** Brand color as `#rgb` or `#rrggbb` hex. */
    primary: string;
    /** Optional secondary color; defaults to `primary` with hue rotated +40°. */
    accent?: string;
    /** Gray-ramp temperature. */
    neutral: NeutralTemperature;
    /** Font family names (from the curated whitelist). */
    font: {
        heading: string;
        body: string;
    };
    /** Corner style → radius scale. */
    shape: ThemeShape;
    /** Which color schemes the app ships. */
    mode: ThemeMode;
}
/**
 * Semantic color slots for one mode. Every `onX`/`X` pair is guaranteed by
 * the compiler to have a WCAG 2.1 contrast ratio of at least 4.5:1.
 */
export interface SemanticColors {
    surface: string;
    onSurface: string;
    primary: string;
    onPrimary: string;
    accent: string;
    onAccent: string;
    /** De-emphasized text/icon color (not part of a contrast-guaranteed pair). */
    muted: string;
    border: string;
    success: string;
    onSuccess: string;
    warn: string;
    onWarn: string;
    danger: string;
    onDanger: string;
}
/** Border-radius scale in px (numbers so React Native can consume directly). */
export interface RadiusScale {
    sm: number;
    md: number;
    lg: number;
    full: number;
}
/** Spacing scale in px. */
export interface SpacingScale {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    '2xl': number;
}
/** Font-size scale in px. */
export interface TypeScale {
    xs: number;
    sm: number;
    base: number;
    lg: number;
    xl: number;
    '2xl': number;
    '3xl': number;
}
export interface Typography {
    fontHeading: string;
    fontBody: string;
    scale: TypeScale;
}
/**
 * The compiler output. Never hand-written, never LLM-written — always the
 * result of `compileTheme(seed)`.
 */
export interface CompiledTheme {
    /** The seed this theme was compiled from (echoed back for provenance). */
    seed: ThemeSeed;
    /** Full 11-step ramps (light-mode orientation; dark mode inverts them). */
    ramps: {
        primary: ColorRamp;
        accent: ColorRamp;
        neutral: ColorRamp;
    };
    /** Semantic slots for light mode. */
    light: SemanticColors;
    /** Semantic slots for dark mode (derived by ramp inversion). */
    dark: SemanticColors;
    radius: RadiusScale;
    spacing: SpacingScale;
    typography: Typography;
}
//# sourceMappingURL=types.d.ts.map