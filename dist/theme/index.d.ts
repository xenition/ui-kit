/**
 * `@xenition/ui/theme` — seed-token theme compiler.
 *
 * ```ts
 * import { compileTheme, toCssVars } from '@xenition/ui/theme';
 *
 * const theme = compileTheme({
 *   primary: '#7C3AED',
 *   neutral: 'warm',
 *   font: { heading: 'Inter', body: 'Inter' },
 *   shape: 'rounded',
 *   mode: 'both',
 * });
 * const css = toCssVars(theme);
 * ```
 */
export * from './types';
export { isValidHex, hexToRgb, rgbToHex, rgbToHsl, hslToRgb, hexToHsl, hslToHex, relativeLuminance, contrastRatio, ensureContrast, } from './color';
export type { RGB, HSL } from './color';
export { compileTheme, MIN_CONTRAST } from './compile';
export { toCssVars, toTailwindPreset, toNativeTokens } from './outputs';
export type { TailwindPreset, NativeThemeTokens } from './outputs';
//# sourceMappingURL=index.d.ts.map