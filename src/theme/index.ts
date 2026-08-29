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
export {
  isValidHex,
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  hexToHsl,
  hslToHex,
  relativeLuminance,
  contrastRatio,
  ensureContrast,
} from './color';
export type { RGB, HSL } from './color';
export { compileTheme, MIN_CONTRAST } from './compile';
export { toCssVars, toTailwindPreset, toNativeTokens } from './outputs';
export type { TailwindPreset, NativeThemeTokens } from './outputs';

/*
  Composing the glass token into a panel fill. `GlassIntensity` is deliberately
  NOT re-exported here: it is already public from `@xenition/ui/primitives` via
  `GlassPanel`, and two `export *` barrels offering the same name make it
  ambiguous at the package root. The type lives in `./glass`; the component
  imports it from there and re-exports it, so there is exactly one definition.
*/
export { GLASS_SURFACE_MIX, composeGlass, composeGlassCss, splitAlpha } from './glass';
export type { ComposedGlass } from './glass';
