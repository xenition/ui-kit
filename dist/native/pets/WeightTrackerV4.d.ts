import * as React from 'react';
import type { WeightTrackerProps } from './WeightTracker';
/** Drop-in for {@link WeightTrackerProps} — same props, the V4 "companion" design. */
export type WeightTrackerV4Props = WeightTrackerProps;
/**
 * WeightTracker — **V4** "companion" design (native parity of the web V4). The
 * warm, friendly take on a pet weight tracker: an elevated rounded card with a
 * soft shadow, a big legible current reading with its unit, a change delta (tone
 * follows the ideal range, not the sign — vets track both directions), a status
 * carried in a soft-tinted labelled chip with a glyph (never color alone), and the
 * charts {@link Sparkline} of recent history (kept token-fed and unchanged from
 * the base). Same props/behavior as {@link WeightTrackerProps}: `status` (ideal /
 * under / over) resolves from `idealRange` when omitted; renders an empty state
 * when there is no reading. Token-only colors via `useXenitionTheme()`.
 */
export declare function WeightTrackerV4({ current, unit, delta, history, idealRange, status, emptyLabel, style, }: WeightTrackerV4Props): React.ReactElement;
//# sourceMappingURL=WeightTrackerV4.d.ts.map