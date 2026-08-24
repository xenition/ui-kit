/**
 * Elevation (drop-shadow) presets for the native layer — the missing "depth is a
 * token, not 750 judgements" scale flagged in the kit audit (Part B / E3).
 *
 * React Native shadows need a color; we derive it from the theme's neutral ramp
 * (`ramps.neutral[900]`, near-black) so no literal color is ever introduced —
 * the same token-purity discipline as `withAlpha`. Android reads `elevation`;
 * iOS/web read the `shadow*` fields, so every level sets both.
 */
import { type ViewStyle } from 'react-native';
import type { NativeThemeTokens } from '../../../theme/outputs';
export type ElevationLevel = 'none' | 'sm' | 'md' | 'lg' | 'xl';
/**
 * A token-bound RN shadow style for the given level. Spread onto a `View`'s
 * style: `style={[shadow('md', tokens), …]}`. `none` yields `{}`.
 *
 * The shadow color comes from the compiled neutral ramp so it tracks the theme
 * and stays token-pure; on Android the `elevation` field does the work.
 */
export declare function shadow(level: ElevationLevel, tokens: NativeThemeTokens): ViewStyle;
//# sourceMappingURL=elevation.d.ts.map