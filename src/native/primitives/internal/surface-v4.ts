/**
 * Depth plumbing shared by the **V4 surface line** — `BottomSheetV4`,
 * `ModalV4`, `ActionSheetV4`.
 *
 * These three are the components where `elevation` and `glass` genuinely earn
 * their place: a sheet really is above the page, a dialog really is off it, and
 * depth here is layer order made visible rather than decoration. `design.md` §8
 * bans "cards inside cards inside cards" and glassmorphism without purpose, so
 * the rule this file encodes is: **the overlay is the only layer that gets
 * depth.** Content inside it is flat. A card inside a glass sheet is not
 * another glass panel.
 *
 * Everything is derived from `useXenitionTheme()`, which resolves `gradient`,
 * `glass` and `elevation` for the active scheme (unlike `tokens.ramps`, which
 * carries the light orientation in both).
 */

import type { ViewStyle } from 'react-native';
import { composeGlass } from '../../../theme/glass';
import type { ElevationToken } from '../../../theme/types';
import type { XenitionNativeTheme } from '../../theme';
import { withAlpha } from './color';
import { V4_MOTION } from './motion-v4';

/**
 * An {@link ElevationToken} as React Native shadow style.
 *
 * `android` is the `elevation` field, without which RN ignores `shadow*`
 * entirely on that platform. Under `depth: 'flat'` the compiler has already
 * zeroed every number, so this returns an invisible shadow and no caller has to
 * ask what the depth is.
 */
export function elevationStyle(token: ElevationToken): ViewStyle {
  return {
    shadowColor: token.color,
    shadowOffset: { width: 0, height: token.offsetY },
    shadowOpacity: token.opacity,
    shadowRadius: token.radius,
    elevation: token.android,
  };
}

/**
 * How dark an overlay scrim sits.
 *
 * Not 0.5, and — more importantly — not `onSurface`. A scrim built from
 * `onSurface` or from a neutral ramp step INVERTS with the scheme and becomes a
 * white veil over a dark page, which is what the base overlays do today. The
 * shadow colour does not invert, because a shadow does not, so that is what a
 * scrim is built from.
 *
 * 0.44 rather than 0.5 because the sheet under it carries a real shadow: the
 * contact edge is already darker than the rest, so the flat field can be
 * lighter and the overlay still reads as separated. The result has a falloff
 * instead of being one even sheet of black.
 */
export const SCRIM_ALPHA = 0.44;

/** The scrim fill for the active scheme — dark in both, by construction. */
export function scrimColor(theme: XenitionNativeTheme, alpha: number = SCRIM_ALPHA): string {
  return withAlpha(theme.elevation.sheet.color, alpha);
}

/**
 * The skin of an overlay panel: opaque `surface`, or the glass treatment when
 * the seed asked for `depth: 'glass'`.
 *
 * This is the one place a V4 component checks the depth, and it is not an
 * oversight. `flatten()` in the compiler neutralises gradients and elevation
 * and stops there — `glass.tint` is live even under `depth: 'flat'`. So
 * gradient and elevation are consumed unconditionally and flat falls out for
 * free, while glass has to be asked for.
 *
 * The hairline only exists on glass, where the panel edge would otherwise
 * disappear into a busy ground. An opaque sheet is separated by its shadow and
 * does not need a border as well.
 */
export function panelSkin(theme: XenitionNativeTheme): ViewStyle {
  if (theme.depth !== 'glass') {
    return { backgroundColor: theme.colors.surface };
  }
  const glass = composeGlass(theme.glass, theme.colors.surface, 'regular');
  return {
    backgroundColor: glass.backgroundColor,
    borderWidth: 1,
    borderColor: glass.borderColor,
  };
}

/**
 * Motion durations, on M3's scale rather than inside §36.2's bands.
 *
 * A sheet crosses the whole screen, so it takes `enter` (400ms) — which is also
 * what M3 specifies for a bottom sheet's entrance, and 120ms longer than the
 * 280 this file had guessed. A dialog only scales and fades and stays at
 * `standard` (200ms), which is what it already was. A released drag settling
 * back is the same kind of event as any other state change, so it is `standard`
 * too rather than a fourth number.
 */
export const SURFACE_MOTION = {
  /** A sheet travelling the height of itself. */
  sheet: V4_MOTION.enter,
  /** A dialog that only scales and fades — much less distance, less time. */
  dialog: V4_MOTION.standard,
  /** Settling a drag that was released short of the dismiss threshold. */
  settle: V4_MOTION.standard,
} as const;
