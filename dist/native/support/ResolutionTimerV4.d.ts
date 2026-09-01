import * as React from 'react';
import type { ResolutionTimerProps } from './ResolutionTimer';
/** Drop-in for {@link ResolutionTimerProps} — same props, the V4 "calm console" design. */
export type ResolutionTimerV4Props = ResolutionTimerProps;
/**
 * ResolutionTimer — **V4** "calm console" design (native twin, drop-in for
 * {@link ResolutionTimerProps}). A calm timer card: a big monospaced-feel
 * numeral (via `formatDuration`, `tabular-nums`) showing time left / overdue, a
 * soft-tint state pill (the V4 {@link SLABadgeV4}), and — when a target is
 * derivable — a subtle token progress hint that fills toward the deadline. State
 * is derived exactly as the base — `breached` once time is up, `at-risk` under
 * the configurable threshold, else `on-track` — and surfaced by glyph + color
 * (never color-only). Same props/behavior as the base; token-only colors via
 * `useXenitionTheme()` — no literal hex. Presentational (no internal ticking).
 */
export declare function ResolutionTimerV4({ remainingSeconds, dueAt, now, atRiskThresholdSeconds, label, state, style, }: ResolutionTimerV4Props): React.ReactElement;
//# sourceMappingURL=ResolutionTimerV4.d.ts.map