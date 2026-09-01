import * as React from 'react';
import type { WeightTrackerProps } from './WeightTracker';
/** Drop-in for {@link WeightTrackerProps} — same props, the V4 "companion" design. */
export type WeightTrackerV4Props = WeightTrackerProps;
/**
 * WeightTracker — **V4** "companion" design (web parity of the native V4). The
 * warm, friendly take on a pet weight tracker: an elevated rounded card with a
 * soft shadow, a big legible current reading with its unit, a change delta (tone
 * follows the ideal range, not the sign — vets track both directions), a status
 * carried in a soft-tinted labelled chip with a glyph (never color alone), and the
 * charts {@link Sparkline} of recent history (kept token-fed and unchanged from
 * the base). Same props/behavior as {@link WeightTrackerProps}: `status` (ideal /
 * under / over) resolves from `idealRange` when omitted; renders a shared empty
 * state when there is no reading. All colors from `--xen-*` token classes.
 */
export declare const WeightTrackerV4: React.ForwardRefExoticComponent<WeightTrackerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=WeightTrackerV4.d.ts.map