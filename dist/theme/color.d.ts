/**
 * Color math for the theme compiler: hex ↔ RGB ↔ HSL conversions and the
 * real WCAG 2.1 relative-luminance / contrast-ratio formulas
 * (https://www.w3.org/TR/WCAG21/#dfn-relative-luminance).
 *
 * All functions are pure and deterministic.
 */
export interface RGB {
    /** 0–255 */
    r: number;
    /** 0–255 */
    g: number;
    /** 0–255 */
    b: number;
}
export interface HSL {
    /** Hue in degrees, 0–360. */
    h: number;
    /** Saturation, 0–100. */
    s: number;
    /** Lightness, 0–100. */
    l: number;
}
/** True if `value` is a `#rgb` or `#rrggbb` hex color string. */
export declare function isValidHex(value: unknown): value is string;
export declare function hexToRgb(hex: string): RGB;
export declare function rgbToHex({ r, g, b }: RGB): string;
export declare function rgbToHsl({ r, g, b }: RGB): HSL;
export declare function hslToRgb({ h, s, l }: HSL): RGB;
export declare function hexToHsl(hex: string): HSL;
export declare function hslToHex(hsl: HSL): string;
/**
 * WCAG 2.1 relative luminance of a color, 0 (black) to 1 (white).
 * Channels are linearized with the sRGB piecewise transfer function before
 * the luminance weights are applied.
 */
export declare function relativeLuminance(hex: string): number;
/**
 * WCAG 2.1 contrast ratio between two colors: (L1 + 0.05) / (L2 + 0.05),
 * where L1 is the lighter color's relative luminance. Range 1–21; symmetric.
 */
export declare function contrastRatio(a: string, b: string): number;
/**
 * Returns `fg` adjusted in lightness (hue and saturation preserved) until
 * `contrastRatio(result, bg) >= min`.
 *
 * Guaranteed to terminate: both lightness sweeps are bounded (0–100 in
 * integer steps), and if neither passes, the fallback picks pure black or
 * pure white — whichever contrasts more with `bg`, which for any background
 * is at least ≈4.58:1 (the black/white equal-contrast minimum), above the
 * 4.5:1 default.
 */
export declare function ensureContrast(fg: string, bg: string, min?: number): string;
//# sourceMappingURL=color.d.ts.map