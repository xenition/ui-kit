import * as React from 'react';
import type { TimeTrackerProps } from './TimeTracker';
/** Drop-in for {@link TimeTrackerProps} — same props, the V4 "flow" design. */
export type TimeTrackerV4Props = TimeTrackerProps;
/**
 * TimeTracker — **V4** "flow" design. The focused-workspace take on a stopwatch:
 * a **big, monospaced-feel elapsed numeral** with the context label beneath, and
 * a large (≥44px) round start/stop control that reads **primary** when idle and
 * flips to **danger "stop"** while running. A live session lifts the whole card
 * into a soft-primary running glow so the timer reads as alive without shouting.
 * Keeps the running/elapsed contract of {@link TimeTrackerProps}; token-only
 * colors via `useXenitionTheme()` + `withAlpha`.
 */
export declare function TimeTrackerV4({ elapsedLabel, running, onToggle, label, style, }: TimeTrackerV4Props): React.ReactElement;
//# sourceMappingURL=TimeTrackerV4.d.ts.map