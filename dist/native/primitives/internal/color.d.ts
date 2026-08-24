/**
 * Color helpers for the native layer. React Native has no `color-mix()`, so
 * translucency (GlassPanel) is produced by deriving an `rgba()` string from a
 * **token** hex value — the input is always a compiled-theme color, never a
 * literal, so components stay token-pure.
 */
/** Parse a `#rgb` / `#rrggbb` hex into `[r, g, b]` (0–255). */
export declare function hexToRgb(hex: string): [number, number, number];
/**
 * Turn a token hex into an `rgba()` string at the given alpha. Used for the
 * translucent glass surfaces and gradient placeholder tints — the color always
 * originates from a theme token, so no literal color is introduced.
 */
export declare function withAlpha(hex: string, alpha: number): string;
//# sourceMappingURL=color.d.ts.map