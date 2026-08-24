/**
 * Appearance presets — the visual-diversity system. The kit was "classic": one
 * flat bordered surface everywhere, so every generated app of a given type
 * looked identical (audit Part B). An `appearance` prop lets the SAME component
 * render in several distinct treatments, so two food apps (or two CRMs) don't
 * produce the same screen.
 *
 * Every domain card/row/tile should accept `appearance?: Appearance` and spread
 * `appearanceStyle(appearance, colors, tokens)` onto its container. Default is
 * `'classic'` — byte-for-byte the old look, so this is always backward-compatible.
 *
 * Token-pure: fills come from `colors.surface` / `withAlpha(colors.primary, …)`
 * / neutral ramp steps; borders from `colors.border`; depth from the shared
 * `shadow()` scale. No literal colors.
 */
import { type ViewStyle } from 'react-native';
import type { NativeThemeTokens } from '../../../theme/outputs';
import type { SemanticColors } from '../../../theme/types';
import { withAlpha } from './color';
import { shadow } from './elevation';

/**
 * - `classic`  — surface + 1px border (the historical default).
 * - `elevated` — surface + drop shadow, no border. Modern, floating.
 * - `soft`     — a faint primary-tinted fill, hairline border. Warm, filled.
 * - `outline`  — no fill, a slightly stronger border. Airy, line-based.
 * - `minimal`  — no fill, no border; separation comes from spacing alone.
 * - `filled`   — a solid neutral fill (ramp), no border. Grouped, panel-like.
 */
export type Appearance = 'classic' | 'elevated' | 'soft' | 'outline' | 'minimal' | 'filled';

export const APPEARANCES: readonly Appearance[] = [
  'classic',
  'elevated',
  'soft',
  'outline',
  'minimal',
  'filled',
];

/**
 * Container style for a card/row surface in the given appearance. Radius/padding
 * are intentionally NOT set here — the component owns those; this only decides
 * fill, border, and elevation, so it composes with any layout.
 */
export function appearanceStyle(
  appearance: Appearance | undefined,
  colors: SemanticColors,
  tokens: NativeThemeTokens
): ViewStyle {
  switch (appearance) {
    case 'elevated':
      return {
        backgroundColor: colors.surface,
        borderWidth: 0,
        ...shadow('md', tokens),
      };
    case 'soft':
      return {
        backgroundColor: withAlpha(colors.primary, 0.06),
        borderWidth: 1,
        borderColor: withAlpha(colors.primary, 0.14),
      };
    case 'outline':
      return {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: colors.border,
      };
    case 'minimal':
      return {
        backgroundColor: 'transparent',
        borderWidth: 0,
      };
    case 'filled':
      return {
        backgroundColor: tokens.ramps.neutral[100] ?? colors.surface,
        borderWidth: 0,
      };
    case 'classic':
    default:
      return {
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
      };
  }
}
