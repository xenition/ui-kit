/**
 * The `calendar` module's own V4 vocabulary: the grid metrics, and the event
 * tone resolved to the pieces a block needs.
 *
 * The pure layout — clustering, column packing, localized names — lives in
 * `calendar/layout-v4.ts`, shared by both twins. The tone-to-ink table lives
 * in `primitives/internal/tone-v4`. What is here is the part that needs a
 * resolved native theme.
 *
 * Nothing here is exported from the package.
 */

import type { XenitionNativeTheme } from '../../theme';
import { mixToken } from '../../../primitives/internal/v4-depth';
import {
  metaLine,
  onPair,
  skeletonFill,
  toneFill,
  toneInk,
  type ToneV4,
} from '../../primitives/internal/tone-v4';
import type { EventTone } from '../../../calendar/types';

export { metaLine, onPair, skeletonFill, toneFill, toneInk };
export type { ToneV4 };

/** An `EventTone` is a `ToneV4` — the two vocabularies already agree. */
export function eventTone(tone: EventTone | undefined): ToneV4 {
  return (tone ?? 'primary') as ToneV4;
}

/**
 * The grid's vertical scale, off the spacing scale rather than pinned at 56.
 *
 * `TimeGrid` and `WeekView` both hard-coded `hourHeight = 56` and a `GUTTER`
 * of 48, so on a seed with tighter spacing the hour rules and the event blocks
 * disagreed by a few pixels per hour — which compounds down a 16-hour day.
 */
export function gridMetrics(theme: XenitionNativeTheme): {
  hour: number;
  gutter: number;
  minBlock: number;
} {
  const { spacing } = theme.tokens;
  return {
    hour: spacing['2xl'] + spacing.sm,
    gutter: spacing['2xl'],
    // A block shorter than this cannot show its own title.
    minBlock: spacing.lg + spacing.sm,
  };
}

/** How far an event block's soft fill travels from the surface toward its tone. */
export const BLOCK_TINT = 0.16;

/** The soft ground an event block paints, for a tone. */
export function blockGround(theme: XenitionNativeTheme, tone: ToneV4): string {
  return mixToken(theme.colors.card, toneFill(theme, tone), BLOCK_TINT);
}
